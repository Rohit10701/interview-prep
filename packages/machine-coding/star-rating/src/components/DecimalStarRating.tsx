"use client"; // Ensures this runs as a Client Component

import React from 'react';
import Star, { HexColor } from './Star';


type Props = {
  totalStars: number;
  defaultRating: number; // e.g. 4.7
  onChange: (rating: number) => void;
  onHover: (rating: number) => void;
  size?: number;
  color?: HexColor;
  hoverColor?: HexColor;
};

const DecimalStarRating = ({
  totalStars,
  defaultRating,
  onChange,
  onHover,
  size = 24,
  color = '#ED8A19',
  hoverColor = '#FFA500',
}: Props) => {
  return (
    <div className="flex">
      {Array.from({ length: totalStars }, (_, i) => {
        const fillPercentage = Math.min(1, Math.max(0, defaultRating - i)) * 100;

        return (
          <Star
            key={i}
            size={size}
            color={color}
            hoverColor={hoverColor}
            fillPercentage={fillPercentage}
          />
        );
      })}
    </div>
  );
};

export default DecimalStarRating;


