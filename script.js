const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const highScoreDisplay = document.getElementById("highScore");
const startBtn = document.getElementById("startBtn");
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let timeLeft = 15;
let gameInterval;
let timerInterval;
let confetti = [];

highScoreDisplay.textContent = highScore;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const emojis = ["🐱","🐰","🐻","🐼","🐣","🦊"];

startBtn.addEventListener("click", startGame);

function startGame() {
  score = 0;
  timeLeft = 15;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  startBtn.disabled = true;

  gameInterval = setInterval(createEmoji, 700);
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  timeDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    endGame();
  }
}

function createEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * (window.innerWidth - 40) + "px";
  emoji.style.animationDuration = (Math.random() * 3 + 3) + "s";

  emoji.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    emoji.remove();
  });

  gameArea.appendChild(emoji);

  setTimeout(() => {
    emoji.remove();
  }, 5000);
}

function endGame() {
  startBtn.disabled = false;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreDisplay.textContent = highScore;
    launchConfetti();
  }

  alert("Game selesai! Skor kamu: " + score);
}

function launchConfetti() {
  for (let i = 0; i < 120; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 6 + 4,
      speed: Math.random() * 3 + 2,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    });
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((c, index) => {
    ctx.fillStyle = c.color;
    ctx.fillRect(c.x, c.y, c.size, c.size);
    c.y += c.speed;

    if (c.y > canvas.height) {
      confetti.splice(index, 1);
    }
  });

  if (confetti.length > 0) {
    requestAnimationFrame(animateConfetti);
  }
}