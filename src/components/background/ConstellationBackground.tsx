import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext.tsx';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  orbitRadius?: number;
  orbitAngle?: number;
  orbitSpeed?: number;
}

export const ConstellationBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDark = resolvedTheme === 'dark';

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = isDark
      ? [
          'rgba(99, 102, 241, ', // Indigo
          'rgba(56, 189, 248, ', // Sky
          'rgba(168, 85, 247, ', // Purple
          'rgba(45, 212, 191, ', // Teal
        ]
      : [
          'rgba(79, 70, 229, ', // Indigo 600
          'rgba(2, 132, 199, ', // Sky 600
          'rgba(147, 51, 234, ', // Purple 600
          'rgba(13, 148, 136, ', // Teal 600
        ];

    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorBase = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.35),
        vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.35),
        radius: Math.random() * 1.8 + 0.8,
        baseRadius: Math.random() * 1.8 + 0.8,
        color: colorBase,
        alpha: isDark ? Math.random() * 0.5 + 0.25 : Math.random() * 0.4 + 0.2,
      });
    }

    // Add specialized orbital ring nodes for "ExamSphere" theme
    const orbitalNodes: Particle[] = [];
    const orbitalCount = 12;
    for (let i = 0; i < orbitalCount; i++) {
      orbitalNodes.push({
        x: width * 0.85,
        y: height * 0.25,
        vx: 0,
        vy: 0,
        radius: 2.2,
        baseRadius: 2.2,
        color: isDark ? 'rgba(99, 102, 241, ' : 'rgba(79, 70, 229, ',
        alpha: isDark ? 0.6 : 0.45,
        orbitRadius: 110 + (i % 3) * 45,
        orbitAngle: (i / orbitalCount) * Math.PI * 2,
        orbitSpeed: (0.002 + (i % 2) * 0.001) * (prefersReducedMotion ? 0.1 : 1),
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle background grid
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.015)' : 'rgba(15, 23, 42, 0.035)';
      ctx.lineWidth = 1;
      const gridSize = 64;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw faint orbital ring representing ExamSphere Knowledge nexus
      const centerX = width > 1024 ? width * 0.82 : width * 0.5;
      const centerY = height * 0.32;

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 190, 85, Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.06)' : 'rgba(99, 102, 241, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 270, 120, -Math.PI / 8, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.04)' : 'rgba(14, 165, 233, 0.06)';
      ctx.stroke();
      ctx.restore();

      // Update and draw orbital particles
      orbitalNodes.forEach((node) => {
        if (node.orbitAngle !== undefined && node.orbitRadius !== undefined && node.orbitSpeed !== undefined) {
          node.orbitAngle += node.orbitSpeed;
          node.x = centerX + Math.cos(node.orbitAngle) * node.orbitRadius;
          node.y = centerY + Math.sin(node.orbitAngle) * (node.orbitRadius * 0.45);

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${node.color}${node.alpha})`;
          if (isDark) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(99, 102, 241, 0.5)';
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Update regular particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle reaction to mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        if (distToMouse < 120) {
          p.radius = p.baseRadius + (1 - distToMouse / 120) * 1.5;
        } else {
          p.radius = p.baseRadius;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Connect nearby particles with subtle lines
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * (isDark ? 0.14 : 0.16);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(148, 163, 184, ${lineAlpha})`
              : `rgba(99, 102, 241, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Radial ambient glow gradients */}
      <div
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
          isDark ? 'bg-indigo-600/10' : 'bg-indigo-400/10'
        }`}
      />
      <div
        className={`absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
          isDark ? 'bg-cyan-600/10' : 'bg-sky-400/10'
        }`}
      />
      <div
        className={`absolute bottom-10 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
          isDark ? 'bg-violet-600/10' : 'bg-violet-400/10'
        }`}
      />
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full opacity-80" />
    </div>
  );
};
