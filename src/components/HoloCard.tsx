import React, { useRef, useState, useCallback } from 'react';

interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  depthPop?: boolean;
  glareColor?: string;
  onClick?: () => void;
  id?: string;
}

export const HoloCard: React.FC<HoloCardProps> = ({
  children,
  className = '',
  maxTilt = 12,
  depthPop = true,
  glareColor = 'rgba(239, 68, 68, 0.25)',
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalization from -0.5 to +0.5
      const xPct = clientX / rect.width - 0.5;
      const yPct = clientY / rect.height - 0.5;

      const rotX = -yPct * (maxTilt * 2);
      const rotY = xPct * (maxTilt * 2);

      setRotateX(rotX);
      setRotateY(rotY);

      setGlarePos({
        x: (clientX / rect.width) * 100,
        y: (clientY / rect.height) * 100,
        opacity: 0.85,
      });
    },
    [maxTilt]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl select-none transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        perspective: '1100px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="w-full h-full relative rounded-xl transition-all duration-300 ease-out"
        style={{
          transform: `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) ${
            isHovered && depthPop ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'
          }`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Child Content */}
        <div
          className="w-full h-full relative rounded-xl"
          style={{
            transform: isHovered && depthPop ? 'translateZ(18px)' : 'translateZ(0px)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.25s ease-out',
          }}
        >
          {children}
        </div>

        {/* Dynamic Specular Holographic Glare */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 z-30 overflow-hidden mix-blend-screen"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, ${glareColor}, rgba(255, 255, 255, 0.12) 40%, transparent 80%)`,
          }}
        />

        {/* Subtle Edge Prism Flare */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl pointer-events-none border border-red-500/0 transition-all duration-300 z-20"
          style={{
            borderColor: isHovered ? 'rgba(239, 68, 68, 0.4)' : 'transparent',
            boxShadow: isHovered
              ? `0 14px 28px -10px rgba(220, 38, 38, 0.35), 0 0 16px -2px rgba(239, 68, 68, 0.2)`
              : 'none',
          }}
        />
      </div>
    </div>
  );
};
