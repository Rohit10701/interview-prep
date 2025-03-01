import React from 'react'

type HexColor = `#${string}`

type Props = {
    totalStars : number
    defaultRating : number
    onChange : (rating : number) => void
    onHover : (rating : number) => void
    size : number
    color: HexColor
    hoverColor : HexColor
}

const StarRating = (props: Props) => {
  return (
    <div>StarRating</div>
  )
}

export default StarRating