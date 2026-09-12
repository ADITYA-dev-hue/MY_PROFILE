import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  originalX: number;
  originalY: number;
  originalZ: number;
  pulsePhase: number;
}

interface SignalPacket {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  life: number;
}

export const NeuralParticleCanvas: React.FC = () => {
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [interactiveMode, setInteractiveMode] = useState<boolean>(true);
  const [pulseCount, setPulseCount] = useState<number>(0);

  const mousePosRef = useRef<{ x: number; y: number; isHovering: boolean; targetRotX: number; targetRotY: number }>({
    x: 0,
    y: 0,
    isHovering: false,
    targetRotX: 0,
    targetRotY: 0,
  });

  const shockwavesRef = useRef<Shockwave[]>([]);
  const particlesRef = useRef<Particle3D[]>([]);

  // Update existing particle colors when theme changes
  useEffect(() => {
    if (particlesRef.current.length > 0) {
      const newColors = theme.particleColors;
      particlesRef.current.forEach((p, idx) => {
        p.color = newColors[idx % newColors.length];
      });
    }
  }, [theme]);

  // Trigger shockwave on user click
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left - rect.width / 2;
    const clickY = e.clientY - rect.top - rect.height / 2;

    shockwavesRef.current.push({
      x: clickX,
      y: clickY,
      radius: 5,
      maxRadius: Math.max(rect.width, rect.height) * 0.7,
      strength: 32,
      life: 1.0,
    });

    setPulseCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Dimensions
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Performance visibility check
    const intersectionObserver = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    intersectionObserver.observe(container);

    // Track mouse
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (clientX >= 0 && clientX <= rect.width && clientY >= 0 && clientY <= rect.height) {
        mousePosRef.current.isHovering = true;
        mousePosRef.current.x = clientX - rect.width / 2;
        mousePosRef.current.y = clientY - rect.height / 2;
        mousePosRef.current.targetRotY = (mousePosRef.current.x / rect.width) * 0.75;
        mousePosRef.current.targetRotX = -(mousePosRef.current.y / rect.height) * 0.75;
      } else {
        mousePosRef.current.isHovering = false;
        mousePosRef.current.targetRotX = 0;
        mousePosRef.current.targetRotY = 0;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Initialize 3D particles
    const particleCount = window.innerWidth < 768 ? 42 : 72;
    const maxConnectionDistance = window.innerWidth < 768 ? 140 : 180;
    const fieldRadius = Math.min(window.innerWidth, 1200) * 0.45;
    const depthRange = 380;

    const colors = themeRef.current.particleColors;

    const particles: Particle3D[] = [];
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.cbrt(Math.random()) * fieldRadius;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = (r * Math.sin(phi) * Math.sin(theta)) * 0.65; // Flatten slightly into disc
      const z = (Math.random() - 0.5) * depthRange * 2;

      particles.push({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        originalX: x,
        originalY: y,
        originalZ: z,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;

    // Active AI signal pulses traversing nodes
    const signalPackets: SignalPacket[] = [];
    for (let i = 0; i < 6; i++) {
      signalPackets.push({
        fromIndex: Math.floor(Math.random() * particleCount),
        toIndex: Math.floor(Math.random() * particleCount),
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.012,
      });
    }

    // Camera 3D variables
    let rotX = 0;
    let rotY = 0;
    const focalLength = 480;
    let time = 0;

    // Render loop (4th dimension: time + dynamic physics)
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.012;

      // Smooth camera interpolation towards mouse target
      rotX += (mousePosRef.current.targetRotX - rotX) * 0.05;
      rotY += (mousePosRef.current.targetRotY - rotY) * 0.05;

      // Autonomous gentle idle rotation
      const currentRotY = rotY + Math.sin(time * 0.4) * 0.08;
      const currentRotX = rotX + Math.cos(time * 0.3) * 0.05;

      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);
      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Update and project particles
      const projectedParticles: {
        p: Particle3D;
        projX: number;
        projY: number;
        projScale: number;
        alpha: number;
      }[] = [];

      // Update shockwaves
      const activeShockwaves = shockwavesRef.current;
      for (let s = activeShockwaves.length - 1; s >= 0; s--) {
        const sw = activeShockwaves[s];
        sw.radius += 8;
        sw.life *= 0.94;
        if (sw.radius > sw.maxRadius || sw.life < 0.02) {
          activeShockwaves.splice(s, 1);
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic oscillation
        p.x += p.vx + Math.sin(time + p.pulsePhase) * 0.2;
        p.y += p.vy + Math.cos(time + p.pulsePhase) * 0.2;
        p.z += p.vz;

        // Bounding box bounce back
        if (Math.abs(p.x) > fieldRadius * 1.3) p.vx *= -1;
        if (Math.abs(p.y) > fieldRadius * 0.8) p.vy *= -1;
        if (Math.abs(p.z) > depthRange) p.vz *= -1;

        // Apply shockwave physics (force expansion)
        for (let s = 0; s < activeShockwaves.length; s++) {
          const sw = activeShockwaves[s];
          const dx = p.x - sw.x;
          const dy = p.y - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const diff = Math.abs(dist - sw.radius);

          if (diff < 40) {
            const force = ((40 - diff) / 40) * sw.strength * sw.life;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force;
            p.y += Math.sin(angle) * force;
          }
        }

        // Return towards anchor orbit slowly
        p.x += (p.originalX - p.x) * 0.005;
        p.y += (p.originalY - p.y) * 0.005;
        p.z += (p.originalZ - p.z) * 0.005;

        // 3D Rotation Math
        // Rotate around Y axis
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        // Rotate around X axis
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Perspective projection calculation
        const perspectiveZ = z2 + 550;
        if (perspectiveZ <= 20) continue; // Behind camera plane

        const scale = focalLength / perspectiveZ;
        const projX = x1 * scale + centerX;
        const projY = y2 * scale + centerY;

        // Depth fog factor
        const depthAlpha = Math.max(0.1, Math.min(1.0, (z2 + depthRange) / (depthRange * 1.8)));

        projectedParticles.push({
          p,
          projX,
          projY,
          projScale: scale,
          alpha: depthAlpha,
        });
      }

      // Draw 3D connecting neural filaments
      for (let i = 0; i < projectedParticles.length; i++) {
        const p1 = projectedParticles[i];
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p2 = projectedParticles[j];

          // True 3D Euclidean distance
          const dx = p1.p.x - p2.p.x;
          const dy = p1.p.y - p2.p.y;
          const dz = p1.p.z - p2.p.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < maxConnectionDistance) {
            const connectionAlpha = (1 - dist3D / maxConnectionDistance) * 0.28 * Math.min(p1.alpha, p2.alpha);

            ctx.beginPath();
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p2.projX, p2.projY);
            ctx.strokeStyle = `rgba(${themeRef.current.rgb}, ${connectionAlpha})`;
            ctx.lineWidth = Math.max(0.4, 0.9 * ((p1.projScale + p2.projScale) / 2));
            ctx.stroke();
          }
        }
      }

      // Update & render neural AI signal packets flowing through graph
      for (let s = 0; s < signalPackets.length; s++) {
        const packet = signalPackets[s];
        packet.progress += packet.speed;

        if (packet.progress >= 1.0) {
          packet.progress = 0;
          packet.fromIndex = packet.toIndex;
          packet.toIndex = Math.floor(Math.random() * projectedParticles.length);
        }

        const pStart = projectedParticles[packet.fromIndex % projectedParticles.length];
        const pEnd = projectedParticles[packet.toIndex % projectedParticles.length];

        if (pStart && pEnd) {
          const sigX = pStart.projX + (pEnd.projX - pStart.projX) * packet.progress;
          const sigY = pStart.projY + (pEnd.projY - pStart.projY) * packet.progress;
          const sigScale = (pStart.projScale + pEnd.projScale) / 2;

          ctx.beginPath();
          ctx.arc(sigX, sigY, 2.2 * sigScale, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = themeRef.current.primary;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      // Draw particle nodes with depth sorting
      projectedParticles.sort((a, b) => b.p.z - a.p.z);

      for (let i = 0; i < projectedParticles.length; i++) {
        const { p, projX, projY, projScale, alpha } = projectedParticles[i];
        const radius = Math.max(0.8, p.size * projScale);

        // Core dot
        ctx.beginPath();
        ctx.arc(projX, projY, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Subtle glowing halo for foreground nodes
        if (alpha > 0.55) {
          ctx.beginPath();
          ctx.arc(projX, projY, radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color === '#ffffff' ? `rgba(${themeRef.current.rgb}, 0.25)` : `rgba(${themeRef.current.rgb}, 0.18)`;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      // Draw active shockwaves
      for (let s = 0; s < activeShockwaves.length; s++) {
        const sw = activeShockwaves[s];
        ctx.beginPath();
        ctx.arc(sw.x + centerX, sw.y + centerY, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${themeRef.current.rgb}, ${sw.life * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleCanvasClick}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair overflow-hidden select-none z-0"
      title="Click anywhere to trigger a 4D gravitational shockwave"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75 dark:opacity-85 transition-opacity"
      />
    </div>
  );
};
