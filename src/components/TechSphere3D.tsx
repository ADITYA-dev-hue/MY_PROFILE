import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Sparkles, RotateCw, Pause, Play, Compass, Orbit } from 'lucide-react';
import { RAW_SKILLS } from '../data/portfolioData';
import { SkillLogo } from './SkillLogo';

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
      className={`relative w-full rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-2xl p-6 overflow-hidden select-none text-left ${className}`}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Ambient Radial Lights */}
      <div className="absolute -top-16 -left-16 w-56 h-56 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Controls Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-red-950/80 border border-red-900/60 text-red-400">
            <Orbit className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span>3D Orbiting Data &amp; Tech Cloud</span>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-600 text-white uppercase tracking-widest">
                3D SPATIAL
              </span>
            </h3>
            <p className="text-[11px] text-zinc-400 font-mono">
              Drag anywhere to orbit across 3D axes • Click any skill to focus
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors text-xs flex items-center gap-1 cursor-pointer"
            title={isPaused ? "Resume rotation" : "Pause rotation"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span className="text-[11px] hidden sm:inline">{isPaused ? 'Play' : 'Pause'}</span>
          </button>

          <button
            onClick={resetRotation}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors text-xs flex items-center gap-1 cursor-pointer"
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
        {/* Core Glowing Orb in Center */}
        <div className="absolute w-24 h-24 rounded-full bg-red-600/15 border border-red-500/30 blur-md pointer-events-none animate-pulse" />
        <div className="absolute w-12 h-12 rounded-full bg-red-500/30 blur-xs pointer-events-none" />
        <div className="absolute text-[10px] font-mono uppercase tracking-widest text-red-500/60 font-bold pointer-events-none select-none">
          DATA CORE
        </div>

        {/* Orbit Rings Projection */}
        <div 
          className="absolute w-72 h-72 rounded-full border border-red-900/20 pointer-events-none"
          style={{ transform: 'rotateX(65deg) rotateY(15deg)' }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full border border-zinc-800/40 pointer-events-none"
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
                  transform: `translate(-50%, -50%) scale(${isHovered ? node.scale * 1.25 : node.scale})`,
                  opacity: isHovered ? 1 : node.alpha,
                  zIndex: isHovered ? 100 : Math.round(node.z + 300),
                  transition: isDraggingRef.current ? 'none' : 'transform 0.1s ease-out, opacity 0.15s ease-out',
                }}
                className={`group cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border backdrop-blur-md shadow-lg transition-colors ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-400 ring-2 ring-red-500/40 font-bold'
                    : isForeground
                    ? 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 border-zinc-700 hover:border-red-500 font-semibold'
                    : 'bg-zinc-950/70 text-zinc-400 border-zinc-800/80 text-xs'
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
      <div className="relative z-20 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-red-500 shrink-0" />
          <span className="text-zinc-400">Active Focus:</span>
          <span className="text-white font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            {activeSkill || 'Select a Node'}
          </span>
          <span className="text-zinc-500 text-[11px] hidden md:inline">
            Interactive real-time Fibonacci sphere projection
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>20 Orbiting Nodes</span>
          </div>
          <span className="text-zinc-600">•</span>
          <span>3D Depth Shading</span>
        </div>
      </div>
    </div>
  );
};
