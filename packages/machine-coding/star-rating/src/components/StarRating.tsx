"use client";

import React, { useState } from "react";

type Props = {
  totalStars?: number;
  defaultRating?: number;
  allowDecimal?: "full" | "half" | "any";
  onChange?: (rating: number) => void;
  size?: number;
  color?: string;
  hoverColor?: string;
};

const StarRating: React.FC<Props> = ({
  totalStars = 5,
  defaultRating = 0,
  allowDecimal = "full",
  onChange,
  size = 30,
  color = "#FFD700",
  hoverColor = "#FFA500",
}) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState(defaultRating);

  const handleRatingSelection = (starIndex: number, event: React.MouseEvent) => {
    let newRating = starIndex + 1;

    if (allowDecimal === "half") {
      // left half of the star → X.5, Right half → X.0
      const starRect = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - starRect.left;
      newRating = clickX < starRect.width / 2 ? starIndex + 0.5 : starIndex + 1;
    }

    if (allowDecimal === "any") {
      // calculate precise decimal rating
      const starRect = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - starRect.left;
      newRating = starIndex + clickX / starRect.width;
    }

    setSelectedRating(newRating);
    onChange && onChange(newRating);
  };

  const handleHoverRating = (starIndex: number, event : React.MouseEvent) => {
    let newRating = starIndex + 1;
    const starRect = (event.target as HTMLElement).getBoundingClientRect();
    const hoverX = event.clientX - starRect.left;
  
    if (allowDecimal === "half") {
      newRating = hoverX < starRect.width / 2 ? starIndex + 0.5 : starIndex + 1;
    } else if (allowDecimal === "any") {
      newRating = starIndex + hoverX / starRect.width;
    }
  
    setHoveredRating(newRating);
  };
  
  return (
    <div className="flex gap-1">
      {Array.from({ length: totalStars }, (_, i) => {
        const fillPercentage = Math.min(1, Math.max(0, (hoveredRating ?? selectedRating) - i)) * 100;

        return (
          <Star
            key={i}
            size={size}
            color={color}
            hoverColor={hoverColor}
            fillPercentage={fillPercentage}
            onHover={(e) => handleHoverRating(i, e)}
            onLeave={() => setHoveredRating(null)}
            onClick={(e) => handleRatingSelection(i, e)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;

const Star = ({
  size,
  color,
  hoverColor,
  fillPercentage,
  onHover,
  onLeave,
  onClick,
}: {
  size: number;
  color: string;
  hoverColor: string;
  fillPercentage: number;
  onHover: (e : React.MouseEvent) => void;
  onLeave: () => void;
  onClick: (e: React.MouseEvent) => void;
}) => {
  return (
    <div
      className="relative w-[24px] h-[24px] cursor-pointer"
      onMouseMove={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Background (Empty Star) */}
      <svg viewBox="0 0 24 24" width={size} height={size} fill="#ddd">
        <path d="M12 2l3.1 6.3 7 1-5 4.8 1.2 6.9-6.3-3.3-6.3 3.3 1.2-6.9-5-4.8 7-1z" />
      </svg>

      {/* Foreground (Colored Star) with Clipping */}
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={hoverColor || color}
        className="absolute top-0 left-0"
        style={{
          clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
        }}
      >
        <path d="M12 2l3.1 6.3 7 1-5 4.8 1.2 6.9-6.3-3.3-6.3 3.3 1.2-6.9-5-4.8 7-1z" />
      </svg>
    </div>
  );
};
