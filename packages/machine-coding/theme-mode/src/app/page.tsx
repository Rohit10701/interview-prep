'use client'
import { ThemeContext } from '@/components/theme-provider'
import Image from 'next/image'
import { useContext } from 'react'

export default function Home() {
	const themeContext = useContext(ThemeContext)

	if (!themeContext) return null

	console.log(themeContext)
	return (
		<main
			className={`${themeContext.theme} dark:bg-red-500 dark:text-white flex min-h-screen flex-col items-center justify-between p-24`}>
			<button
				type='button'
				onClick={themeContext.toggleTheme}>
				change theme
			</button>
			<span>theme is {themeContext.theme}</span>
		</main>
	)
}
