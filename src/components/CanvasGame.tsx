import React, { useEffect, useRef } from "react";

const CanvasGame = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef(0);
  const gameLoopRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  
  const player = useRef({
    x: 30,
    y: 60,
    width: 20,
    height: 20,
    dy: 0,
    jumpForce: 10,
    grounded: false,
  });

  const obstacles = useRef<
    {
      x: number;
      y: number;
      width: number;
      height: number;
      passed: boolean;
      isBig?: boolean;
    }[]
  >([]);

  const clouds = useRef<{ x: number; y: number; speed: number }[]>([]);
  const frameCount = useRef(0);
  const framesSinceLastObstacle = useRef(0);
  const nextObstacleDelay = useRef(60 + Math.floor(Math.random() * 61));
  const isGamePaused = useRef(false);
  const restartTimeoutRef = useRef<number>();
  const isVisible = useRef(true);

  const resetGame = () => {
    obstacles.current = [];
    clouds.current = [];
    player.current.y = 60;
    player.current.dy = 0;
    player.current.grounded = false;
    frameCount.current = 0;
    framesSinceLastObstacle.current = 0;
    nextObstacleDelay.current = 60 + Math.floor(Math.random() * 61);
    scoreRef.current = 0;
    lastTimeRef.current = 0;
  };

  const handleCollision = () => {
    isGamePaused.current = true;
    if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
    restartTimeoutRef.current = window.setTimeout(() => {
      resetGame();
      isGamePaused.current = false;
    }, 2000);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    // Intersection Observer to pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible.current;
        isVisible.current = entry.isIntersecting;
        if (isVisible.current && !wasVisible) {
          lastTimeRef.current = performance.now();
          gameLoopRef.current = requestAnimationFrame(update);
        } else if (!isVisible.current && gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const resize = () => {
      if (canvas.offsetWidth) {
        scaleCanvas();
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const update = (currentTime: number) => {
      if (!isVisible.current) return;

      // Delta time calculation for frame-rate independence
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const deltaTime = (currentTime - lastTimeRef.current) / 16.67; // normalized to 60fps
      lastTimeRef.current = currentTime;

      const effectiveDelta = isGamePaused.current ? 0 : deltaTime;

      frameCount.current += deltaTime;
      framesSinceLastObstacle.current += deltaTime;
      
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      if (!isGamePaused.current) {
        player.current.dy += 0.45 * deltaTime;
        player.current.y += player.current.dy * deltaTime;
        const groundY = height - 10;
        if (player.current.y + player.current.height > groundY) {
          player.current.y = groundY - player.current.height;
          player.current.dy = 0;
          player.current.grounded = true;
        }
      }

      // --- Clouds ---
      if (Math.floor(frameCount.current) % 120 === 0 && !isGamePaused.current) {
        clouds.current.push({ 
          x: width, 
          y: 10 + Math.random() * 30, 
          speed: 0.3 + Math.random() * 0.4 
        });
      }
      for (let i = clouds.current.length - 1; i >= 0; i--) {
        const cloud = clouds.current[i];
        if (!isGamePaused.current) cloud.x -= cloud.speed * deltaTime;
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fillRect(cloud.x, cloud.y, 20, 6);
        ctx.fillRect(cloud.x + 5, cloud.y - 3, 10, 3);
        if (cloud.x < -30) clouds.current.splice(i, 1);
      }

      const groundY = height - 10;
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      // Draw Player
      ctx.fillStyle = isGamePaused.current ? "#ff4444" : "#ffffff";
      ctx.beginPath();
      // @ts-ignore
      if (ctx.roundRect) {
        // @ts-ignore
        ctx.roundRect(player.current.x, player.current.y, player.current.width, player.current.height, 5);
      } else {
        ctx.rect(player.current.x, player.current.y, player.current.width, player.current.height);
      }
      ctx.fill();

      // Obstacle Generation
      if (!isGamePaused.current && framesSinceLastObstacle.current >= nextObstacleDelay.current) {
        const h = 14 + Math.random() * 18;
        obstacles.current.push({
          x: width,
          y: groundY - h,
          width: 14,
          height: h,
          passed: false,
          isBig: h > 24,
        });
        framesSinceLastObstacle.current = 0;
        nextObstacleDelay.current = 60 + Math.floor(Math.random() * 61);
      }

      const speed = isGamePaused.current ? 0 : 3.5 + scoreRef.current * 0.08;

      for (let i = obstacles.current.length - 1; i >= 0; i--) {
        const obs = obstacles.current[i];
        obs.x -= speed * deltaTime;
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.beginPath();
        // @ts-ignore
        if (ctx.roundRect) {
          // @ts-ignore
          ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 3);
        } else {
          ctx.rect(obs.x, obs.y, obs.width, obs.height);
        }
        ctx.fill();

        // Collision Check
        const p = player.current;
        const padding = 2;
        if (p.x + padding < obs.x + obs.width && p.x + p.width - padding > obs.x &&
          p.y + padding < obs.y + obs.height && p.y + p.height - padding > obs.y) {
          handleCollision();
          break;
        }

        // Score check
        if (!obs.passed && obs.x + obs.width < player.current.x) {
          obs.passed = true;
          scoreRef.current++;
        }
        if (obs.x + obs.width < -50) obstacles.current.splice(i, 1);
      }

      // Auto Jump AI
      if (player.current.grounded && !isGamePaused.current) {
        const nextObs = obstacles.current.find(o => o.x > player.current.x && o.x - player.current.x < 55);
        if (nextObs) {
          if (Math.random() > 0.25) {
            player.current.dy = -player.current.jumpForce;
            player.current.grounded = false;
          }
        }
      }

      // Draw Score
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`SCORE: ${scoreRef.current}`, width - 10, 20);

      // --- Game Over Overlay ---
      if (isGamePaused.current) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 14px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("GAME OVER", width / 2, height / 2 - 10);
        ctx.font = "10px sans-serif";
        ctx.fillText("RESTARTING...", width / 2, height / 2 + 10);
      }

      gameLoopRef.current = requestAnimationFrame(update);
    };

    gameLoopRef.current = requestAnimationFrame(update);
    return () => {
      observer.disconnect();
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ touchAction: 'none' }} />;
});

export default CanvasGame;
