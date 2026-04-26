
"use client";
import { useState, useEffect, useRef } from "react";
import { Play, Zap, Gamepad2 } from "lucide-react";
import { TopBar } from "./TopBar";
import { BottomNavBar } from "./BottomNavBar";
import { useLanguage } from "./context/LanguageContext";
import { useAppDispatch } from "@/app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { fetchGamesData } from "@/features/games/gamesSlice";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { BACKEND_URL, OTHER_API_URL } from "@/config/config";
import { useNavigate } from "react-router-dom";

const FEATURED_GAMES = [
  { id: 1, name: "Head Shot", image: "https://igpl.pro/uploads/games/124.jpg" },
  { id: 2, name: "Air Warfare", image: "https://igpl.pro/uploads/games/6.jpg" },
  {
    id: 3,
    name: "Fruit Samurai",
    image: "https://igpl.pro/uploads/games/123.jpg",
  },
  {
    id: 7,
    name: "Jumper Frog",
    image: "https://igpl.pro/uploads/games/160.jpg",
  },
  {
    id: 13,
    name: "2 Cars",
    image: "https://api.atomspinzone.com/uploads/games/26.jpg",
  },
  {
    id: 19,
    name: "5 Fruit",
    image: "https://api.atomspinzone.com/uploads/games/1.jpg",
  },
];

const gradients = [
  "gradient-casino",
  "gradient-dark",
  "gradient-purple",
  "gradient-green-dark",
  "gradient-pink-dark",
  "gradient-blue",
];

export default function GamesPage() {
  const dispatch = useAppDispatch();
  const { data, status } = useSelector((state: RootState) => state.games);
  console.log("data:", data);
  const games = data?.data?.freeGames || [];
  console.log("Fetched games data:", games);
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [score, setScore] = useState(0);
  const { t } = useLanguage();

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
  const gravity = 0.45;

  // NEW: Track frames since last obstacle spawn for uneven spacing
  const framesSinceLastObstacle = useRef(0);
  const nextObstacleDelay = useRef(getRandomObstacleDelay());

  // Random "win streak" threshold before failure
  const streakRef = useRef(generateNextStreak());

  // Game state management
  const isGamePaused = useRef(false);
  const restartTimeoutRef = useRef<number>();
  const collisionFlashRef = useRef(false);

  function generateNextStreak() {
    // Random score between 10–35
    return 10 + Math.floor(Math.random() * 26);
  }

  function getRandomObstacleDelay() {
    // Random delay between 60-120 frames (uneven spacing)
    return 60 + Math.floor(Math.random() * 61);
  }

  // Auto jump AI
  const autoJump = () => {
    if (!player.current.grounded || isGamePaused.current) return;

    const nextObstacle = obstacles.current.find(
      (obs) => obs.x > player.current.x && obs.x - player.current.x < 55,
    );

    if (nextObstacle) {
      player.current.dy = -player.current.jumpForce;
      player.current.grounded = false;
    }
  };

  const resetGame = () => {
    obstacles.current = [];
    player.current.y = 60;
    player.current.dy = 0;
    player.current.grounded = false;
    frameCount.current = 0;
    framesSinceLastObstacle.current = 0;
    nextObstacleDelay.current = getRandomObstacleDelay();
    setScore(0);
    streakRef.current = generateNextStreak();
  };

  const handleCollision = () => {
    // Pause the game
    isGamePaused.current = true;
    collisionFlashRef.current = true;

    // Clear any existing timeout
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }

    // Restart after 1 second
    restartTimeoutRef.current = window.setTimeout(() => {
      resetGame();
      isGamePaused.current = false;
      collisionFlashRef.current = false;
    }, 1000);
  };

  useEffect(() => {
    if (!data) {
      dispatch(fetchGamesData());
    }
  }, [dispatch, data]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const update = () => {
      frameCount.current++;
      framesSinceLastObstacle.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Don't update physics if game is paused
      if (!isGamePaused.current) {
        // Physics
        player.current.dy += gravity;
        player.current.y += player.current.dy;

        const groundY = canvas.height - 10;
        if (player.current.y + player.current.height > groundY) {
          player.current.y = groundY - player.current.height;
          player.current.dy = 0;
          player.current.grounded = true;
        }
      }

      const groundY = canvas.height - 10;

      // Ground line
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();

      // Player
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(255,255,255,0.5)";
      ctx.beginPath();
      ctx.roundRect(
        player.current.x,
        player.current.y,
        player.current.width,
        player.current.height,
        5,
      );
      ctx.fill();
      ctx.shadowBlur = 0;

      // Spawn obstacles at UNEVEN distances
      if (
        !isGamePaused.current &&
        framesSinceLastObstacle.current >= nextObstacleDelay.current
      ) {
        const height = 14 + Math.random() * 18;
        const isBigObstacle = height > 24; // Obstacles taller than 24 are "big"
        obstacles.current.push({
          x: canvas.width,
          y: groundY - height,
          width: 14,
          height,
          passed: false,
          isBig: isBigObstacle, // Mark if it's a big obstacle
        });

        // Reset counter and get new random delay
        framesSinceLastObstacle.current = 0;
        nextObstacleDelay.current = getRandomObstacleDelay();
      }

      const speed = isGamePaused.current ? 0 : 3.5 + score * 0.08;

      for (let i = obstacles.current.length - 1; i >= 0; i--) {
        const obs = obstacles.current[i];
        obs.x -= speed;

        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.beginPath();
        ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 3);
        ctx.fill();

        // Collision detection → PAUSE & RESTART (only for big obstacles)
        if (
          player.current.x < obs.x + obs.width &&
          player.current.x + player.current.width > obs.x &&
          player.current.y < obs.y + obs.height &&
          player.current.y + player.current.height > obs.y
        ) {
          // Only stop game if it's a BIG obstacle
          if (obs.isBig) {
            handleCollision();
            break;
          }
          // Small obstacles: player just passes through or bumps slightly
        }

        // Score update
        if (!obs.passed && obs.x + obs.width < player.current.x) {
          obs.passed = true;
          setScore((s) => {
            const newScore = s + 1;
            // Check if streak reached → force failure
            if (newScore >= streakRef.current) {
              // Auto "fail" with delay
              handleCollision();
              return s; // Don't increment this frame
            }
            return newScore;
          });
        }

        // Remove off-screen
        if (obs.x + obs.width < 0) {
          obstacles.current.splice(i, 1);
        }
      }

      autoJump();
      gameLoopRef.current = requestAnimationFrame(update);
    };

    gameLoopRef.current = requestAnimationFrame(update);

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleGamePlay = (url) => {
    navigate(url);
  };

  return (
    <>
      <TopBar />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 pt-2 px-2">

        <div className="max-w-md mx-auto">
          {/* HEADER + AUTO GAME */}
          <div className="rounded-xl relative bg-gradient-to-r from-[#0a0f7ac4] to-pink-700 pt-3 pb-16 px-3 overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-black text-white">
                  {t.gamesTitle}
                </h1>
              </div>

              {/* AUTO PLAY GAME (VIDEO STYLE) */}
              <div className="rounded-xl bg-black/20 backdrop-blur-sm p-2 shadow-lg">
                <div className="relative w-full h-28 bg-black/10 rounded-xl overflow-hidden border border-white/20">
                  <canvas ref={canvasRef} className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>

          {/* TRENDING SECTION */}
          <div className="relative -mt-12 space-y-4 mx-1">
            <div className="w-[90%] mx-auto relative overflow-hidden rounded-2xl bg-white p-4 border-2 border-pink-200 shadow-xl flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black text-pink-500">
                  {t.trendingGames}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-2 px-2 ">
              {games.map((game: any, index: number) => {
                const bgClass = gradients[index % gradients.length];
                console.log(game);

                return (
                  <motion.div
                    key={game.game_id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true, amount: 0.15 }}
                    className={`rounded-2xl shadow-lg ${bgClass} overflow-hidden text-white`}
                    onClick={() => {
                      // handleGamePlay(`/games/${categorySlug}/${game.game_id_base64}`);
                      handleGamePlay(`/games/${btoa(String(game.game_id))}`);
                    }}
                  >
                    {/* Game Image */}
                    <div className="relative w-full aspect-[4/3]">
                      <img
                        src={`${OTHER_API_URL}uploads/games/${game.game_image}`}
                        alt={game.Name}
                        className="object-cover h-full w-full"
                        loading="lazy"
                      />
                      {game.isSuggested === "1" && (
                        <span className="absolute top-2 left-2 bg-pink-600 text-xs px-2 py-1 rounded-full">
                          Suggested
                        </span>
                      )}
                    </div>

                    {/* Game Info */}
                    <div className="p-2">
                      {/* <h3 className="text-base sm:text-sm font-semibold truncate">
                  {game.Name}
                </h3> */}
                      <Button
                        size="xs"
                        className="bg-white/20 mt-2 hover:bg-white/30 border w-full text-xs h-7 border-white/30 text-white backdrop-blur-sm transition-smooth"
                      >
                        <Play className="w-4 h-3.5" /> {t.playNow}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <BottomNavBar />
    </>
  );
}
