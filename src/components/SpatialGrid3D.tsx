import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const SpatialGrid3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetX = 0;
    let currentX = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      targetX = xPct * 20; // 20px tilt
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let animId: number;
    const animate = () => {
      currentX += (targetX - currentX) * 0.05;
      if (container) {
        container.style.transform = `perspective(500px) rotateX(65deg) translateX(${currentX.toFixed(2)}px) translateZ(0px)`;
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`absolute bottom-0 left-0 right-0 h-44 overflow-hidden pointer-events-none select-none z-0 ${className}`}>
      {/* 3D Perspective Plane */}
      <div
        ref={containerRef}
        className="w-[140%] -left-[20%] h-[300px] absolute bottom-0 origin-bottom transition-transform will-change-transform opacity-30"
        style={{
          transform: 'perspective(500px) rotateX(65deg) translateZ(0px)',
          backgroundImage: `
            linear-gradient(to right, rgba(43, 33, 27, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(43, 33, 27, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, transparent 100%)',
        }}
      />

      {/* Subtle Warm Horizon Edge */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(232, 117, 36, 0.25), transparent)',
        }}
      />
    </div>
  );
};
