import React, { useEffect, useRef, useState } from 'react';

// 1. Mouse Parallax Hook
const useMouseParallax = (strength = 15) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return offset;
};

// 2. Animated Particle Canvas
const CyberParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth / 15); // Density
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedY: Math.random() * 0.5 + 0.1,
          speedX: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.5 + 0.1,
          color: Math.random() > 0.8 ? '#5b5bfc' : '#ffffff' // Red accents
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // Update position
        p.y -= p.speedY; // Float Up
        p.x += p.speedX;

        // Reset if out of bounds
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

// 3. Main Exported Background Component
const Background = () => {
  const parallaxBg = useMouseParallax(30);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#081414] pointer-events-none">
      
      {/* Canvas Layer */}
      <CyberParticles />

      {/* Gradient Blobs with Parallax */}
      <div 
        className="absolute inset-0 transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: `translate(${parallaxBg.x}px, ${parallaxBg.y}px)` }}
      >
        <div className="absolute top-0 left-0 w-full h-[600px] bg-linear-to-b from-green-900/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-green-600/5 rounded-full blur-[150px]"></div>
      </div>
      
      {/* Noise Texture (Optional for grittier look) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
    </div>
  );
};

export default Background;