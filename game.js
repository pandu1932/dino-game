const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dino = { x: 50, y: canvas.height - 150, width: 50, height: 50, isJumping: false, jumpSpeed: 0 };
let obstacles = [];
let gameOver = false;
let score = 0;

// Handle jump
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !dino.isJumping) {
        dino.isJumping = true;
        dino.jumpSpeed = -15;
    }
});

// Generate obstacles
function createObstacle() {
    if (Math.random() < 0.02) {
        obstacles.push({ x: canvas.width, y: canvas.height - 50, width: 50, height: 50 });
    }
}

// Update game
function update() {
    if (gameOver) return;

    // Dino jump logic
    if (dino.isJumping) {
        dino.y += dino.jumpSpeed;
        dino.jumpSpeed += 1;
        if (dino.y >= canvas.height - 150) {
            dino.y = canvas.height - 150;
            dino.isJumping = false;
        }
    }

    // Move obstacles
    for (let obs of obstacles) {
        obs.x -= 5;
        if (obs.x + obs.width < 0) {
            obstacles.shift();
            score++;
        }

        // Collision detection
        if (
            obs.x < dino.x + dino.width &&
            obs.x + obs.width > dino.x &&
            obs.y < dino.y + dino.height &&
            obs.y + obs.height > dino.y
        ) {
            gameOver = true;
            document.getElementById('gameOver').style.display = 'block';
        }
    }

    createObstacle();
}

// Draw game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Dino
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    // Draw obstacles
    ctx.fillStyle = 'red';
    for (let obs of obstacles) {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    }

    // Draw score
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 20, 30);
}

// Game loop
function gameLoop() {
    update();
    draw();
    if (!gameOver) requestAnimationFrame(gameLoop);
}

gameLoop();
