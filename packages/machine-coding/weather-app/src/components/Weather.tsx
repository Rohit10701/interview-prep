'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { fetchWeatherApi } from 'openmeteo'
const url = 'https://api.open-meteo.com/v1/forecast'
const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)
type paramsType = {
	latitude: number
	longitude: number
	hourly: string
}

const Weather = () => {
	const [currentWeather, setCurrentWeather] = useState<{
		hourly: {
			time: Date[]
			temperature2m: number[]
		}
	}>()
	const handleFetchWeather = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const weatherParams: paramsType = {
			latitude: Number(e.currentTarget.lat.value),
			longitude: Number(e.currentTarget.long.value),
			hourly: 'temperature_2m'
		}
		const responses = await fetchWeatherApi(url, weatherParams)
		const response = responses[0]
		const hourly = response.hourly()!

		const utcOffsetSeconds = response.utcOffsetSeconds()

		const weatherData = {
			hourly: {
				time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
					(t) => new Date((t + utcOffsetSeconds) * 1000)
				),
				temperature2m: Array.from(hourly.variables(0)!.valuesArray() || [])
			}
		}

		console.log({ weatherData })

		setCurrentWeather(weatherData)
	}

	return (
		<>
			<form onSubmit={handleFetchWeather}>
				<input
					name={'lat'}
					placeholder={'latitude'}
				/>
				<input
					name={'long'}
					placeholder={'longitude'}
				/>
				<button type='submit'>Fetch Weather</button>
			</form>
			<div>
				{currentWeather?.hourly.temperature2m.map((temp, i) => (
					<div key={i}>Temperature: {temp}°C</div>
				))}
			</div>
		</>
	)
}

export default Weather
