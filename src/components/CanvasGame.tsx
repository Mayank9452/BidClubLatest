import React, { useEffect, useRef } from "react";

const CanvasGame = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef(0);
  const gameLoopRef = useRef<number>();
  const player = useRef({
    x: 30,
    y: 60,
    width: 20,
    height: 20,
    dy: 0,
    jumpForce: 8,
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

  const frameCount = useRef(0);
  const framesSinceLastObstacle = useRef(0);
  const nextObstacleDelay = useRef(60 + Math.floor(Math.random() * 61));
  const streakRef = useRef(10 + Math.floor(Math.random() * 26));
  const isGamePaused = useRef(false);
  const restartTimeoutRef = useRef<number>();

  const resetGame = () => {
    obstacles.current = [];
    player.current.y = 60;
    player.current.dy = 0;
    player.current.grounded = false;
    frameCount.current = 0;
    framesSinceLastObstacle.current = 0;
    nextObstacleDelay.current = 60 + Math.floor(Math.random() * 61);
    scoreRef.current = 0;
    streakRef.current = 10 + Math.floor(Math.random() * 26);
  };

  const handleCollision = () => {
    isGamePaused.current = true;
    if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
    restartTimeoutRef.current = window.setTimeout(() => {
      resetGame();
      isGamePaused.current = false;
    }, 1000);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      if (canvas.offsetWidth) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const update = () => {
      frameCount.current++;
      framesSinceLastObstacle.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isGamePaused.current) {
        player.current.dy += 0.45;
        player.current.y += player.current.dy;
        const groundY = canvas.height - 10;
        if (player.current.y + player.current.height > groundY) {
          player.current.y = groundY - player.current.height;
          player.current.dy = 0;
          player.current.grounded = true;
        }
      }

      const groundY = canvas.height - 10;
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      // @ts-ignore
      if (ctx.roundRect) {
         // @ts-ignore
        ctx.roundRect(player.current.x, player.current.y, player.current.width, player.current.height, 5);
      } else {
        ctx.rect(player.current.x, player.current.y, player.current.width, player.current.height);
      }
      ctx.fill();

      if (!isGamePaused.current && framesSinceLastObstacle.current >= nextObstacleDelay.current) {
        const height = 14 + Math.random() * 18;
        obstacles.current.push({
          x: canvas.width,
          y: groundY - height,
          width: 14,
          height,
          passed: false,
          isBig: height > 24,
        });
        framesSinceLastObstacle.current = 0;
        nextObstacleDelay.current = 60 + Math.floor(Math.random() * 61);
      }

      const speed = isGamePaused.current ? 0 : 3.5 + scoreRef.current * 0.08;

      for (let i = obstacles.current.length - 1; i >= 0; i--) {
        const obs = obstacles.current[i];
        obs.x -= speed;
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

        if (player.current.x < obs.x + obs.width && player.current.x + player.current.width > obs.x &&
          player.current.y < obs.y + obs.height && player.current.y + player.current.height > obs.y) {
          if (obs.isBig) {
            handleCollision();
            break;
          }
        }

        if (!obs.passed && obs.x + obs.width < player.current.x) {
          obs.passed = true;
          scoreRef.current++;
          if (scoreRef.current >= streakRef.current) {
            handleCollision();
          }
        }
        if (obs.x + obs.width < 0) obstacles.current.splice(i, 1);
      }

      // Auto Jump AI
      if (player.current.grounded && !isGamePaused.current) {
        const nextObs = obstacles.current.find(o => o.x > player.current.x && o.x - player.current.x < 55);
        if (nextObs) {
          player.current.dy = -8;
          player.current.grounded = false;
        }
      }

      gameLoopRef.current = requestAnimationFrame(update);
    };

    gameLoopRef.current = requestAnimationFrame(update);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
});

export default CanvasGame;
