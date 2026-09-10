import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  depth3D?: boolean;
  viewportAmount?: number;
  id?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.65,
  direction = 'up',
  distance = 32,
  depth3D = true,
  viewportAmount = 0.12,
  id,
}) => {
  const getInitialOffsets = () => {
    switch (direction) {
      case 'up':
        return { x: 0, y: distance, rotateX: depth3D ? 4 : 0 };
      case 'down':
        return { x: 0, y: -distance, rotateX: depth3D ? -4 : 0 };
      case 'left':
        return { x: distance, y: 0, rotateY: depth3D ? -4 : 0 };
      case 'right':
        return { x: -distance, y: 0, rotateY: depth3D ? 4 : 0 };
      case 'none':
      default:
        return { x: 0, y: 0, rotateX: 0, rotateY: 0 };
    }
  };

  const initial = {
    opacity: 0,
    scale: depth3D ? 0.985 : 1,
    ...getInitialOffsets(),
  };

  return (
    <motion.div
      id={id}
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      }}
      viewport={{ once: true, amount: viewportAmount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a refined, responsive spring-like ease
      }}
      className={className}
      style={{
        transformStyle: depth3D ? 'preserve-3d' : undefined,
      }}
    >
      {children}
    </motion.div>
  );
};
