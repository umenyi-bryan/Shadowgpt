'use client';
import { useEffect } from 'react';

export default function MatrixRain() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*';
    const charArray = chars.split('');
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}
