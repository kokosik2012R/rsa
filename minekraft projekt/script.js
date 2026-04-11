
function handle() {
    alert('Форма отправлена!');
    
    let inputs = document.querySelectorAll("input");
    let input_values = [];
    
    for (let i = 0; i < inputs.length; i++) {
        input_values.push(inputs[i].value);
    }
}

let button = document.querySelector('.send-btn');
button.addEventListener('click', handle);

let links = document.querySelectorAll('.scroll');
let targetID;
links.forEach(function (element) {
  element.addEventListener('click', function (event) {
    event.preventDefault(); 
    targetID = element.getAttribute('href'); 
    document.querySelector(targetID).scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start'
    })
  })
})

// let fnHP = 100;
// let fnMats = 30;
// const world = document.getElementById('fn-world');
// const spawnArea = document.getElementById('spawn-area');

// // 1. Система строительства
// world.addEventListener('mousedown', (e) => {
//     // Если кликнули не по врагу/сундуку, а по небу - строим!
//     if (e.target.id === 'spawn-area' || e.target.id === 'fn-world') {
//         if (fnMats >= 10) {
//             const wall = document.createElement('div');
//             wall.className = 'wall';
//             wall.style.left = (e.offsetX - 30) + 'px';
//             wall.style.top = (e.offsetY - 30) + 'px';
//             spawnArea.appendChild(wall);
            
//             fnMats -= 10;
//             updateHUD();
            
//             // Стена исчезает через 4 секунды (как будто сломали)
//             setTimeout(() => wall.remove(), 4000);
//         }
//     }
// });

// // 2. Спавн врагов (Снайперов)
// function spawnEnemy() {
//     const enemy = document.createElement('div');
//     enemy.className = 'enemy';
//     enemy.innerText = '👺';
//     enemy.style.left = Math.random() * 90 + '%';
//     enemy.style.top = Math.random() * 50 + '%';
    
//     enemy.onclick = () => {
//         createParticles(enemy.offsetLeft, enemy.offsetTop, '💥');
//         enemy.remove();
//         fnMats += 15; // Даем маты за убийство
//         updateHUD();
//     };

//     spawnArea.appendChild(enemy);

//     // Враг стреляет через 2 секунды, если не убит
//     setTimeout(() => {
//         if (enemy.parentElement) {
//             takeDamage(20);
//             enemy.remove();
//         }
//     }, 2500);
// }

// // 3. Спавн Лута (Supply Drop)
// function spawnLoot() {
//     const drop = document.createElement('div');
//     drop.className = 'supply-drop';
//     drop.innerText = '📦';
//     drop.style.left = Math.random() * 80 + '%';
//     drop.style.animationDuration = '4s';
    
//     drop.onclick = () => {
//         fnHP = Math.min(100, fnHP + 30);
//         fnMats += 50;
//         createParticles(drop.offsetLeft, drop.offsetTop, '✨');
//         drop.remove();
//         updateHUD();
//     };

//     spawnArea.appendChild(drop);
//     setTimeout(() => drop.remove(), 4000);
// }

// function takeDamage(amount) {
//     // Если есть стены - они принимают урон (простое правило)
//     const walls = document.querySelectorAll('.wall');
//     if (walls.length > 0) {
//         walls[0].remove(); // Ломаем одну стену вместо HP
//     } else {
//         fnHP -= amount;
//         world.classList.add('hit-red');
//         setTimeout(() => world.classList.remove('hit-red'), 200);
//     }
//     updateHUD();
// }

// function updateHUD() {
//     document.getElementById('hp-bar').style.width = fnHP + '%';
//     document.getElementById('mats-count').innerText = fnMats;
    
//     if (fnHP <= 0) {
//         alert("Wasted! Попробуй снова!");
//         location.reload();
//     }
// }

// // Эффект взрыва частиц
// function createParticles(x, y, char) {
//     for (let i = 0; i < 5; i++) {
//         const p = document.createElement('div');
//         p.innerText = char;
//         p.style.position = 'absolute';
//         p.style.left = x + 'px';
//         p.style.top = y + 'px';
//         p.style.pointerEvents = 'none';
//         p.animate([
//             { transform: 'translate(0,0)', opacity: 1 },
//             { transform: XXXINLINECODEXXX3XXXINLINECODEXXX, opacity: 0 }
//         ], 500);
//         spawnArea.appendChild(p);
//         setTimeout(() => p.remove(), 500);
//     }
// }

// function playEmote() {
//     const msg = document.getElementById('game-msg');
//     msg.innerText = "DANCING... 🕺";
//     setTimeout(() => msg.innerText = "ЗАЩИЩАЙСЯ!", 2000);
// }

// // Запуск игровых циклов
// setInterval(spawnEnemy, 3000);
// setInterval(spawnLoot, 8000);

let condition = true;

function forward() {
    anime({
        targets: '.menu-small',
        translateX: ['-100%', '0'],
        easing: 'easeInOutQuad',
        direction: 'alternate',
        duration: 1000,
        loop: false
    });

    condition = false
}

function backward() {
    anime({
        targets: '.menu-small',
        translateX: ['0', '-100%'],
        easing: 'easeInOutQuad',
        direction: 'alternate',
        duration: 1000,
        loop: false
    });

    condition = true
}

$('.menu_small_icon').click(function () {
    if (condition) {
        forward();
    } else {
        backward();
    }
});