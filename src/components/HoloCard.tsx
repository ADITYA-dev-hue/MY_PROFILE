import React, { useRef, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

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
  glareColor,
  onClick,
  id,
}) => {
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const activeGlareColor = glareColor || `rgba(${theme.rgb}, 0.25)`;

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

        {/* Subtle Specular Glare */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 z-30 overflow-hidden"
          style={{
            opacity: glarePos.opacity * 0.7,
            background: `radial-gradient(circle 260px at ${glarePos.x}% ${glarePos.y}%, rgba(232, 117, 36, 0.07), transparent 70%)`,
          }}
        />

        {/* Subtle Warm Border & Shadow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl pointer-events-none border transition-all duration-300 z-20"
          style={{
            borderColor: isHovered ? 'rgba(232, 117, 36, 0.35)' : 'transparent',
            boxShadow: isHovered
              ? '0 12px 28px -6px rgba(43, 33, 27, 0.08), 0 4px 10px -2px rgba(43, 33, 27, 0.04)'
              : 'none',
          }}
        />
      </div>
    </div>
  );
};
