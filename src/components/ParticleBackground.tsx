import { useEffect, useRef } from 'react';
import { HERO_LOGO_SRC } from '../constants/assets';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  swirlOffset: number;
  swirlSpeed: number;
}

interface Fleck {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  opacity: number;
  tint: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const flecksRef = useRef<Fleck[]>([]);
  const burstsRef = useRef<BurstParticle[]>([]);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const lastExplosionTimeRef = useRef(0);
  const hoverStartTimesRef = useRef<number[]>([]);
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
    img.src = HERO_LOGO_SRC;
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
          speedX: (Math.random() - 0.5) * 0.1125,
          speedY: (Math.random() - 0.5) * 0.1125,
          opacity: Math.random() * 0.075 + 0.015, // Reduced 25%: 0.015-0.09
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.0045,
          swirlOffset: Math.random() * Math.PI * 2,
          swirlSpeed: Math.random() * 0.005 + 0.002,
        });
      }
      particlesRef.current = particles;
      hoverStartTimesRef.current = new Array(particles.length).fill(0);

      // Create white flecks (more numerous, smaller)
      const flecks: Fleck[] = [];
      const fleckCount = Math.floor((canvas.width * canvas.height) / 15000); // More flecks

      for (let i = 0; i < fleckCount; i++) {
        flecks.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5, // 0.5-2.5px tiny flecks
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: (Math.random() - 0.5) * 0.25,
          opacity: Math.random() * 0.225 + 0.075, // Reduced 25%: 0.075-0.3
        });
      }
      flecksRef.current = flecks;
      burstsRef.current = [];
    };
    createParticles();

    const createExplosion = (x: number, y: number, intensity: 'mini' | 'major' = 'mini') => {
      const burstCount = intensity === 'major' ? 36 : 12;
      const newBursts: BurstParticle[] = [];

      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.5;
        const speed = intensity === 'major' ? Math.random() * 2 + 1.2 : Math.random() * 0.8 + 0.4;
        newBursts.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: intensity === 'major' ? Math.random() * 3 + 1.6 : Math.random() * 2.5 + 1,
          life: 0,
          maxLife: intensity === 'major' ? Math.random() * 38 + 28 : Math.random() * 28 + 22,
          opacity: Math.random() * 0.55 + 0.35,
          tint: Math.random(),
        });
      }

      burstsRef.current = [...burstsRef.current, ...newBursts].slice(-250);
    };

    // Mouse move handler for subtle interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = performance.now() * 0.001;
      const now = performance.now();
      const isFestivalTheme = document.body.classList.contains('festival-theme');
      const centerX = canvas.width * 0.5;
      const centerY = canvas.height * 0.5;

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
        ctx.fillStyle = isFestivalTheme ? 'rgba(170, 220, 255, 0.95)' : '#ffffff';
        ctx.beginPath();
        ctx.arc(fleck.x, fleck.y, fleck.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw symbol particles
      particlesRef.current.forEach((particle, index) => {
        // Add stronger swirling motion around the screen center.
        const toCenterX = particle.x - centerX;
        const toCenterY = particle.y - centerY;
        const centerDistance = Math.max(Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY), 1);
        const swirlStrength = (0.09 + Math.sin(time * particle.swirlSpeed + particle.swirlOffset) * 0.05) * 0.05;
        particle.speedX += (-toCenterY / centerDistance) * swirlStrength;
        particle.speedY += (toCenterX / centerDistance) * swirlStrength;

        // Reduce visual clumping with a gentle outward spread from the center.
        const spreadRadius = Math.min(canvas.width, canvas.height) * 0.35;
        if (centerDistance < spreadRadius) {
          const spreadForce = ((spreadRadius - centerDistance) / spreadRadius) * 0.02;
          particle.speedX += (toCenterX / centerDistance) * spreadForce;
          particle.speedY += (toCenterY / centerDistance) * spreadForce;
        }

        // Tiny random drift keeps symbols from settling into dense packs.
        particle.speedX += (Math.random() - 0.5) * 0.0015;
        particle.speedY += (Math.random() - 0.5) * 0.0015;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDistance = 150;
        const proximityExplosionDistance = Math.max(18, particle.size * 0.45);
        const hoverExplosionDistance = Math.max(36, particle.size * 0.7);

        if (distance < forceDistance && mouseRef.current.active && distance > 0.001) {
          const force = (forceDistance - distance) / forceDistance;
          particle.x -= (dx / distance) * force * 2;
          particle.y -= (dy / distance) * force * 2;

          // Cursor-near symbol mini explosion with global cooldown.
          if (distance < proximityExplosionDistance && now - lastExplosionTimeRef.current > 90) {
            createExplosion(particle.x, particle.y);
            lastExplosionTimeRef.current = now;
          }

          // Hover dwell trigger for larger symbol explosion.
          if (distance < hoverExplosionDistance) {
            if (!hoverStartTimesRef.current[index]) {
              hoverStartTimesRef.current[index] = now;
            } else if (now - hoverStartTimesRef.current[index] > 700 && now - lastExplosionTimeRef.current > 140) {
              createExplosion(particle.x, particle.y, 'major');
              lastExplosionTimeRef.current = now;
              hoverStartTimesRef.current[index] = 0;
            }
          } else {
            hoverStartTimesRef.current[index] = 0;
          }
        } else {
          hoverStartTimesRef.current[index] = 0;
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;
        particle.speedX *= 0.992;
        particle.speedY *= 0.992;

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
          if (isFestivalTheme) {
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillStyle = 'rgba(90, 170, 255, 0.45)';
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
            ctx.globalCompositeOperation = 'source-over';
          }
          ctx.restore();
        }
      });

      // Draw and update burst particles.
      burstsRef.current = burstsRef.current.filter((burst) => {
        burst.x += burst.vx;
        burst.y += burst.vy;
        burst.vx *= 0.97;
        burst.vy *= 0.97;
        burst.life += 1;

        const lifeRatio = 1 - burst.life / burst.maxLife;
        if (lifeRatio <= 0) return false;

        const red = isFestivalTheme ? Math.floor(30 + burst.tint * 50) : 255;
        const green = isFestivalTheme ? Math.floor(120 + burst.tint * 100) : Math.floor(25 + burst.tint * 80);
        const blue = isFestivalTheme ? Math.floor(220 + burst.tint * 35) : Math.floor(10 + burst.tint * 30);
        ctx.save();
        ctx.globalAlpha = burst.opacity * lifeRatio;
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.beginPath();
        ctx.arc(burst.x, burst.y, burst.size * lifeRatio, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
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
