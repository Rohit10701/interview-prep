"use client"

export type HexColor = `#${string}`;

const Star = ({
    size,
    color,
    hoverColor,
    fillPercentage,

  }: {
    size: number;
    color: HexColor;
    hoverColor: HexColor;
    fillPercentage: number;
  }) => {
    console.log(fillPercentage);
    return (
      <div className="relative w-[24px] h-[24px]">
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
            // clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`, 
            clipPath: `polygon(0 0, ${fillPercentage}% 0, ${fillPercentage}% 100%, 0 100%)`,
          }}
        >
          <path d="M12 2l3.1 6.3 7 1-5 4.8 1.2 6.9-6.3-3.3-6.3 3.3 1.2-6.9-5-4.8 7-1z" />
        </svg>
      </div>
    );
  };

  export default  Star