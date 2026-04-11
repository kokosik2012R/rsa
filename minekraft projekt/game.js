let fnHP = 100;
let fnMats = 30;
let gameActive = false;
let spawnTimers = [];

function toggleGame(show) {
    const overlay = document.getElementById('game-overlay');
    gameActive = show;
    
    if (show) {
        overlay.classList.add('active');
        resetGame();
        startLoops();
    } else {
        overlay.classList.remove('active');
        stopLoops();
    }
}

function resetGame() {
    fnHP = 100;
    fnMats = 30;
    document.getElementById('spawn-area').innerHTML = '';
    updateHUD();
}

function startLoops() {
    spawnTimers.push(setInterval(spawnEnemy, 2500));
    spawnTimers.push(setInterval(spawnLoot, 7000));
}

function stopLoops() {
    spawnTimers.forEach(t => clearInterval(t));
    spawnTimers = [];
}

const spawnArea = document.getElementById('spawn-area');

// Строительство
spawnArea.addEventListener('mousedown', (e) => {
    if (e.target.id !== 'spawn-area') return;
    
    if (fnMats >= 10) {
        const rect = spawnArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const wall = document.createElement('div');
        wall.className = 'wall';
        wall.style.left = (x - 40) + 'px';
        wall.style.top = (y - 40) + 'px';
        
        spawnArea.appendChild(wall);
        fnMats -= 10;
        updateHUD();
        setTimeout(() => wall.remove(), 4000);
    }
});

function spawnEnemy() {
    if (!gameActive) return;
    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.innerText = '👺';
    enemy.style.left = Math.random() * 85 + '%';
    enemy.style.top = Math.random() * 50 + 10 + '%';
    
    enemy.onclick = () => {
        enemy.remove();
        fnMats += 15;
        updateHUD();
    };

    spawnArea.appendChild(enemy);
    setTimeout(() => {
        if (enemy.parentElement) {
            takeDamage(20);
            enemy.remove();
        }
    }, 2000);
}

function spawnLoot() {
    if (!gameActive) return;
    const drop = document.createElement('div');
    drop.className = 'enemy'; // Используем тот же стиль анимации
    drop.innerText = '📦';
    drop.style.left = Math.random() * 85 + '%';
    drop.style.top = '-50px';
    
    // Анимация падения
    drop.animate([{ top: '-50px' }, { top: '70%' }], { duration: 4000, fill: 'forwards' });

    drop.onclick = () => {
        fnHP = Math.min(100, fnHP + 20);
        fnMats += 40;
        drop.remove();
        updateHUD();
    };

    spawnArea.appendChild(drop);
}

function takeDamage(val) {
    const walls = document.querySelectorAll('.wall');
    if (walls.length > 0) {
        walls[0].style.border = "3px solid white";
        setTimeout(() => walls[0].remove(), 100);
    } else {
        fnHP -= val;
        document.getElementById('fn-world').animate([
            { filter: 'brightness(1)' }, { filter: 'brightness(0.5) sepia(1)' }, { filter: 'brightness(1)' }
        ], 200);
    }
    updateHUD();
}

function updateHUD() {
    document.getElementById('hp-bar').style.width = fnHP + '%';
    document.getElementById('mats-count').innerText = fnMats;
    if (fnHP <= 0) {
        alert("GAME OVER! Твой результат сохранен.");
        toggleGame(false);
    }
}

function playEmote() {
    const status = document.getElementById('game-status');
    status.innerText = "🕺 SQUAD EMOTE ACTIVE!";
    status.style.color = "#facc15";
    setTimeout(() => {
        status.innerText = "PROTECT YOUR BASE!";
        status.style.color = "white";
    }, 2000);
}