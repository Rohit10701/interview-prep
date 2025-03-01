'use client'
import DecimalStarRating from '@/components/DecimalStarRating'
import StarRating from '@/components/StarRating'
import Image from 'next/image'

export default function Home() {
	return (
		<>
			<DecimalStarRating
				totalStars={5}
				defaultRating={4.7}
				onChange={(rating) => console.log(rating)}
				onHover={(rating) => console.log(rating)}
			/>
			<StarRating
				totalStars={5}
				defaultRating={4.7}
				onChange={(rating) => console.log(rating)}
        allowDecimal='any'
			/>
		</>
	)
}
