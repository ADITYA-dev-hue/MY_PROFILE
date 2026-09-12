import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Sparkles, RotateCw, Pause, Play, Compass, Orbit } from 'lucide-react';
import { RAW_SKILLS } from '../data/portfolioData';
import { SkillLogo } from './SkillLogo';
import { useTheme } from '../context/ThemeContext';

interface TechItem {
  name: string;
  category: 'core' | 'ai-data' | 'tools' | 'web';
  accent: string;
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
  scale: number;
  alpha: number;
}

interface TechSphereProps {
  className?: string;
  onSelectSkill?: (skillName: string) => void;
}

export const TechSphere3D: React.FC<TechSphereProps> = ({ className = '', onSelectSkill }) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>('Python');
  const [rotationSpeed, setRotationSpeed] = useState({ x: 0.003, y: 0.004 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Selected priority tech stack for the sphere
  const selectedTechs = useMemo(() => [
    { name: 'Python', category: 'core', accent: '#3776AB' },
    { name: 'SQL', category: 'ai-data', accent: '#0284C7' },
    { name: 'C++', category: 'core', accent: '#00599C' },
    { name: 'Java', category: 'core', accent: '#E76F00' },
    { name: 'Pandas', category: 'ai-data', accent: '#150458' },
    { name: 'NumPy', category: 'ai-data', accent: '#013243' },
    { name: 'Power BI', category: 'ai-data', accent: '#F2C811' },
    { name: 'Tableau', category: 'ai-data', accent: '#E97627' },
    { name: 'Scikit-learn', category: 'ai-data', accent: '#F7931E' },
    { name: 'Matplotlib', category: 'ai-data', accent: '#11557c' },
    { name: 'Machine Learning', category: 'ai-data', accent: '#EF4444' },
    { name: 'React', category: 'web', accent: '#61DAFB' },
    { name: 'TypeScript', category: 'web', accent: '#3178C6' },
    { name: 'Gemini API', category: 'ai-data', accent: '#9333EA' },
    { name: 'Git', category: 'tools', accent: '#F05032' },
    { name: 'GitHub', category: 'tools', accent: '#8B5CF6' },
    { name: 'Excel', category: 'ai-data', accent: '#107C41' },
    { name: 'Data Visualisation', category: 'ai-data', accent: '#EC4899' },
    { name: 'Data Cleaning', category: 'ai-data', accent: '#14B8A6' },
    { name: 'C', category: 'core', accent: '#A8B9CC' },
  ], []);

  // Compute uniform distribution on a sphere using Fibonacci lattice
  const initialNodes = useMemo(() => {
    const total = selectedTechs.length;
    const radius = 175; // Sphere virtual radius
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    return selectedTechs.map((tech, i) => {
      const y = 1 - (i / (total - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return {
        ...tech,
        x: x * radius,
        y: y * radius,
        z: z * radius,
        screenX: 0,
        screenY: 0,
        scale: 1,
        alpha: 1,
      } as TechItem;
    });
  }, [selectedTechs]);

  const [nodes, setNodes] = useState<TechItem[]>(initialNodes);
  const anglesRef = useRef({ x: 0.2, y: 0.4 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Animation Loop: 3D Matrix Rotation & Perspective Projection
  useEffect(() => {
    let animationFrameId: number;

    const updateSphere = () => {
      if (!isPaused && !isDraggingRef.current) {
        anglesRef.current.x += rotationSpeed.x;
        anglesRef.current.y += rotationSpeed.y;
      }

      const cosX = Math.cos(anglesRef.current.x);
      const sinX = Math.sin(anglesRef.current.x);
      const cosY = Math.cos(anglesRef.current.y);
      const sinY = Math.sin(anglesRef.current.y);

      const fov = 340; // Field of view depth
      const centerX = 200;
      const centerY = 190;

      const projected = initialNodes.map((node) => {
        // Rotate around Y axis
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;

        // Rotate around X axis
        const y1 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        // Perspective projection factor
        const distance = fov / (fov + z2);
        const screenX = centerX + x1 * distance;
        const screenY = centerY + y1 * distance;

        // Scale & opacity based on Z depth (-radius to +radius)
        // Closer nodes appear larger and crisp; distant nodes fade
        const scale = Math.max(0.65, Math.min(1.25, distance));
        const alpha = Math.max(0.28, Math.min(1.0, (z2 + 200) / 380));

        return {
          ...node,
          x: x1,
          y: y1,
          z: z2,
          screenX,
          screenY,
          scale,
          alpha,
        };
      });

      // Sort by Z index so foreground items render on top
      projected.sort((a, b) => a.z - b.z);

      setNodes(projected);
      animationFrameId = requestAnimationFrame(updateSphere);
    };

    animationFrameId = requestAnimationFrame(updateSphere);
    return () => cancelAnimationFrame(animationFrameId);
  }, [initialNodes, isPaused, rotationSpeed]);

  // Mouse drag handlers for direct 3D sphere rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;

    anglesRef.current.y += deltaX * 0.007;
    anglesRef.current.x += deltaY * 0.007;

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const resetRotation = () => {
    anglesRef.current = { x: 0.2, y: 0.4 };
    setRotationSpeed({ x: 0.003, y: 0.004 });
  };

  return (
    <div 
      className={`relative w-full rounded-xl bg-[#FFFCF7] border border-[#EADBCE] shadow-[0_4px_20px_rgba(43,33,27,0.05)] p-6 overflow-hidden select-none text-left ${className}`}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Subtle Warm Radial Lights */}
      <div 
        className="absolute -top-16 -left-16 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-25" 
        style={{ backgroundColor: 'rgba(232, 117, 36, 0.06)' }}
      />
      <div 
        className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: 'rgba(107, 63, 37, 0.05)' }}
      />

      {/* Header Controls Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EADBCE]">
        <div className="flex items-center gap-2.5">
          <div 
            className="p-2 rounded-lg border bg-[#FAF7F0] border-[#EADBCE] text-[#E87524]"
          >
            <Orbit className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider text-[#2B211B] flex items-center gap-2">
              <span>3D Orbiting Data &amp; Tech Cloud</span>
              <span 
                className="text-[9px] font-mono font-bold px-2 py-0.5 rounded text-white uppercase tracking-widest bg-[#E87524]"
              >
                3D SPATIAL
              </span>
            </h3>
            <p className="text-[11px] text-[#746A61] font-mono">
              Drag anywhere to orbit across 3D axes • Click any skill to focus
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 rounded-lg bg-[#FAF7F0] hover:bg-[#F3EDE2] text-[#6B3F25] hover:text-[#2B211B] border border-[#EADBCE] transition-colors text-xs flex items-center gap-1 cursor-pointer"
            title={isPaused ? "Resume rotation" : "Pause rotation"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span className="text-[11px] hidden sm:inline">{isPaused ? 'Play' : 'Pause'}</span>
          </button>

          <button
            onClick={resetRotation}
            className="p-1.5 rounded-lg bg-[#FAF7F0] hover:bg-[#F3EDE2] text-[#6B3F25] hover:text-[#2B211B] border border-[#EADBCE] transition-colors text-xs flex items-center gap-1 cursor-pointer"
            title="Reset sphere orientation"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Main 3D Sphere Canvas Area */}
      <div 
        className="relative w-full h-[380px] sm:h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
        style={{ perspective: '800px' }}
      >
        {/* Core Soft Orb in Center */}
        <div 
          className="absolute w-24 h-24 rounded-full blur-md pointer-events-none animate-pulse" 
          style={{
            backgroundColor: 'rgba(232, 117, 36, 0.08)',
            border: '1px solid rgba(232, 117, 36, 0.2)',
          }}
        />
        <div 
          className="absolute text-[10px] font-mono uppercase tracking-widest font-bold pointer-events-none select-none text-[#E87524]"
        >
          DATA CORE
        </div>

        {/* Orbit Rings Projection */}
        <div 
          className="absolute w-72 h-72 rounded-full pointer-events-none"
          style={{ 
            transform: 'rotateX(65deg) rotateY(15deg)',
            border: '1px solid rgba(107, 63, 37, 0.15)',
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full border border-[#EADBCE] pointer-events-none"
          style={{ transform: 'rotateX(-60deg) rotateZ(30deg)' }}
        />

        {/* 3D Floating Tech Nodes */}
        <div className="relative w-[400px] h-[380px] shrink-0">
          {nodes.map((node) => {
            const isHovered = hoveredSkill === node.name;
            const isSelected = activeSkill === node.name;
            const isForeground = node.z > 20;

            return (
              <button
                key={node.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSkill(node.name);
                  if (onSelectSkill) onSelectSkill(node.name);
                }}
                onMouseEnter={() => setHoveredSkill(node.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  position: 'absolute',
                  left: `${node.screenX}px`,
                  top: `${node.screenY}px`,
                  transform: `translate(-50%, -50%) scale(${isHovered ? node.scale * 1.2 : node.scale})`,
                  opacity: isHovered ? 1 : node.alpha,
                  zIndex: isHovered ? 100 : Math.round(node.z + 300),
                  transition: isDraggingRef.current ? 'none' : 'transform 0.1s ease-out, opacity 0.15s ease-out',
                  ...(isSelected ? {
                    backgroundColor: '#E87524',
                    borderColor: '#D06316',
                    boxShadow: '0 4px 12px rgba(232, 117, 36, 0.25)',
                  } : {}),
                }}
                className={`group cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border shadow-xs transition-colors ${
                  isSelected
                    ? 'text-white font-bold'
                    : isForeground
                    ? 'bg-[#FFFCF7] hover:bg-[#F3EDE2] text-[#2B211B] border-[#EADBCE] hover:border-[#E87524] font-semibold'
                    : 'bg-[#FAF7F0]/90 text-[#746A61] border-[#EADBCE] text-xs'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  <SkillLogo name={node.name} className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs whitespace-nowrap tracking-wide">
                  {node.name}
                </span>

                {/* Depth Indicator Pin */}
                {isForeground && (
                  <span 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ backgroundColor: node.accent }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Skill Quick Summary Banner */}
      <div className="relative z-20 pt-4 border-t border-[#EADBCE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 shrink-0 text-[#E87524]" />
          <span className="text-[#746A61]">Active Focus:</span>
          <span className="text-[#2B211B] font-bold px-2 py-0.5 rounded bg-[#FAF7F0] border border-[#EADBCE]">
            {activeSkill || 'Select a Node'}
          </span>
          <span className="text-[#746A61] text-[11px] hidden md:inline">
            Interactive real-time Fibonacci sphere projection
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-[#746A61]">
          <div className="flex items-center gap-1.5">
            <span 
              className="w-2 h-2 rounded-full animate-pulse bg-[#E87524]"
            />
            <span>20 Orbiting Nodes</span>
          </div>
          <span className="text-[#EADBCE]">•</span>
          <span>3D Depth Shading</span>
        </div>
      </div>
    </div>
  );
};
