'use client';

import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    // Matrix characters - BEDUSEC themed
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const charArray = chars.split("");
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    
    // Gradient colors for BEDUSEC theme
    const colors = [
      '#00ff9d', // neon-green
      '#00d4ff', // neon-blue  
      '#9d4edd', // neon-purple
      '#ffd60a', // neon-yellow
      '#ff2e63'  // neon-pink
    ];

    function draw() {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Random color from BEDUSEC palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Draw character
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Randomly reset drop
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    }

    // Adjust canvas on resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationId;
    const animate = () => {
      draw();
      // Slower speed for better visibility
      animationId = setTimeout(animate, 80);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-20 z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
