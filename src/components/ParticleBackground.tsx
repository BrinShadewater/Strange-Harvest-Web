import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

interface Fleck {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const flecksRef = useRef<Fleck[]>([]);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Load symbol image
    const img = new Image();
    img.src = '/images/strange-harvest-occult-symbol-horror-icon.webp';
    img.onload = () => {
      imageRef.current = img;
    };

    // Create particles
    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 50000); // Responsive count

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 40 + 20, // 20-60px
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.1 + 0.02, // Very subtle: 0.02-0.12
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
        });
      }
      particlesRef.current = particles;

      // Create white flecks (more numerous, smaller)
      const flecks: Fleck[] = [];
      const fleckCount = Math.floor((canvas.width * canvas.height) / 15000); // More flecks

      for (let i = 0; i < fleckCount; i++) {
        flecks.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5, // 0.5-2.5px tiny flecks
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4 opacity
        });
      }
      flecksRef.current = flecks;
    };
    createParticles();

    // Mouse move handler for subtle interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw white flecks first (behind symbols)
      flecksRef.current.forEach((fleck) => {
        // Subtle mouse repulsion for flecks
        const dx = mouseRef.current.x - fleck.x;
        const dy = mouseRef.current.y - fleck.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDistance = 100;

        if (distance < forceDistance) {
          const force = (forceDistance - distance) / forceDistance;
          fleck.x -= (dx / distance) * force * 1.5;
          fleck.y -= (dy / distance) * force * 1.5;
        }

        // Update position
        fleck.x += fleck.speedX;
        fleck.y += fleck.speedY;

        // Wrap around edges
        if (fleck.x < 0) fleck.x = canvas.width;
        if (fleck.x > canvas.width) fleck.x = 0;
        if (fleck.y < 0) fleck.y = canvas.height;
        if (fleck.y > canvas.height) fleck.y = 0;

        // Draw white fleck
        ctx.save();
        ctx.globalAlpha = fleck.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(fleck.x, fleck.y, fleck.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw symbol particles
      particlesRef.current.forEach((particle) => {
        // Subtle mouse repulsion
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDistance = 150;

        if (distance < forceDistance) {
          const force = (forceDistance - distance) / forceDistance;
          particle.x -= (dx / distance) * force * 2;
          particle.y -= (dy / distance) * force * 2;
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        // Wrap around edges
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;

        // Draw particle
        if (imageRef.current) {
          ctx.save();
          ctx.globalAlpha = particle.opacity;
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);
          ctx.drawImage(
            imageRef.current,
            -particle.size / 2,
            -particle.size / 2,
            particle.size,
            particle.size
          );
          ctx.restore();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
