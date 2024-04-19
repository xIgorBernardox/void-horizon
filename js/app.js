const btnIniciar = document.querySelector("#iniciar");

const arena = document.querySelector('.arena');
const nave = document.querySelector('.nave');

const vida = document.querySelector('.vida');
const pontos = document.querySelector('.pontos');

const musicGame = new Audio("audios/music-game-1.mp3");

// Pegando Altura e Largura da nave e da arena
const arenaWidth = arena.offsetWidth;
const arenaHeight = arena.offsetHeight;

const naveWidth = nave.offsetWidth;
const naveHeight = nave.offsetHeight;

// Status do jogador
let vidaPlayer = 100;

// Pontos
let currentPoints = 0;

// Nave
let checkMoveNave;
let checkShoot;
let checkDesShot;

// Naves Inimigas
const velEnemy = 4;
let checkGenEnemy;
let checkGenEnemy2;
let checkGenEnemy3;
let checkDesEnemy;

// Definindo posicionamento, direção e velocidade inicial da nave
const velNave = 18;
let posX = arenaWidth / 2 - 60;
let posY = arenaHeight - naveHeight;
let dirX = 0;
let dirY = 0;

// Tiros da nave
const speedShot = 30;
let currentShoot = false;
let currentShot = 0;

// Colisão
let checkColisao;

// Teclas pressionadas
const teclaPress = (tecla) => {
  if (tecla.key === "ArrowRight"){
    dirX = 1;
  } else if (tecla.key === "ArrowLeft") {
    dirX = -1;
  } else if (tecla.key === "ArrowDown") {
    dirY = 1;
  } else if (tecla.key === "ArrowUp") {
    dirY = -1;
  }
};

// Teclas soltas
const teclaSol = (tecla) => {
  if (tecla.key === "ArrowRight" || tecla.key === "ArrowLeft"){
    dirX = 0;
  } else if (tecla.key === "ArrowDown"  || tecla.key === "ArrowUp") {
    dirY = 0;
  } 
};

// Mover a nave
const moveNave = () => {
  posX += dirX * velNave;
  posY += dirY * velNave;

  if (posX < 0) {
    posX = 0;
  } else if (posX + naveWidth > arenaWidth) {
    posX = arenaWidth - naveWidth;
  }

  if (posY < 0) {
    posY = 0;
  } else if (posY + naveHeight > arenaHeight) {
    posY = arenaHeight - naveHeight;
  }

  nave.style.left = posX + "px";
  nave.style.top = posY + "px";
};

// Função para atirar
const createShoot = () => {
  const delayShot = Date.now();
  const atrasoShot = delayShot - currentShot;
  if (currentShoot && atrasoShot >= 100) {
    currentShot = Date.now();
    gerarShot(posX + 42, posY);
  }
};

document.addEventListener("keydown", (tecla) => {
  if (tecla.key === " ") {
    currentShoot = true;
  }
});

document.addEventListener("keyup", (tecla) => {
  if (tecla.key === " ") {
    currentShoot = false;
  }
});

// Criar Tiros da nave 
const gerarShot = (posLeftShot, posTopShot) => {
  const shot = document.createElement("div");
  shot.className = "shot";
  shot.style.position = "absolute";
  shot.style.width = "6px";
  shot.style.height = "6px";
  shot.style.backgroundColor = "#00fffb";
  shot.style.left = posLeftShot + "px";
  shot.style.top = posTopShot + "px";
  arena.appendChild(shot);
  audioShots();
};

// Som dos tiros
const audioShots = () => {
  shotSound = document.createElement("audio");
  shotSound.className = "shotSound";
  shotSound.setAttribute("src", "audios/shot-1.mp3");
  shotSound.play();
  arena.appendChild(shotSound);
  shotSound.addEventListener("ended", () => {
    shotSound.remove();
  });
};

// Deslocamento do Tiro
const desShot = () => {
  const shots = document.querySelectorAll(".shot");
  for (let i = 0; i < shots.length; i++){
    if (shots[i]){
      let topShotPos = shots[i].offsetTop;
      topShotPos -= speedShot;
      shots[i].style.top = topShotPos + "px";
      if (topShotPos < -10) {
        shots[i].remove();
      }
    }
  }
};

// Criar Naves inimigas 
const genEnemy = () => {
  const enemy = document.createElement("div");
  enemy.setAttribute("data-vida", 8);
  enemy.className = "enemy";
  enemy.style.position = "absolute";
  enemy.style.width = "100px";
  enemy.style.height = "100px";
  enemy.style.backgroundImage = "url(assets/enemy-1.png)";
  enemy.style.backgroundPosition = "center";
  enemy.style.backgroundRepeat = "no-repeat";
  enemy.style.backgroundSize = "contain";
  enemy.style.left = Math.floor(Math.random() * arenaWidth - naveWidth) + "px";
  enemy.style.top = "-100px";
  arena.appendChild(enemy);
};

const genEnemy2 = () => {
  const enemy2 = document.createElement("div");
  enemy2.setAttribute("data-vida", 8);
  enemy2.className = "enemy";
  enemy2.style.position = "absolute";
  enemy2.style.width = "100px";
  enemy2.style.height = "100px";
  enemy2.style.backgroundImage = "url(assets/enemy-2.png)";
  enemy2.style.backgroundPosition = "center";
  enemy2.style.backgroundRepeat = "no-repeat";
  enemy2.style.backgroundSize = "contain";
  enemy2.style.left = Math.floor(Math.random() * arenaWidth - naveWidth) + "px";
  enemy2.style.top = "-100px";
  arena.appendChild(enemy2);
};

const genEnemy3 = () => {
  const enemy3 = document.createElement("div");
  enemy3.setAttribute("data-vida", 8);
  enemy3.className = "enemy";
  enemy3.style.position = "absolute";
  enemy3.style.width = "100px";
  enemy3.style.height = "100px";
  enemy3.style.backgroundImage = "url(assets/enemy-3.png)";
  enemy3.style.backgroundPosition = "center";
  enemy3.style.backgroundRepeat = "no-repeat";
  enemy3.style.backgroundSize = "contain";
  enemy3.style.left = Math.floor(Math.random() * arenaWidth - naveWidth) + "px";
  enemy3.style.top = "-100px";
  arena.appendChild(enemy3);
};

// Deslocamento do inimigo do top para o bot
const desEnemy = () => {
  const enemyShips = document.querySelectorAll(".enemy");
  for (let i = 0; i < enemyShips.length; i++){
    if (enemyShips[i]){
      let topEnemyPos = enemyShips[i].offsetTop;
      let leftEnemyPos = enemyShips[i].offsetLeft;
      topEnemyPos += velEnemy;
      enemyShips[i].style.top = topEnemyPos + "px";
      if (topEnemyPos > arenaHeight) {
        vidaPlayer -= 5;
        vida.textContent = `Vida: ${vidaPlayer}`;
        explosionEnemy(leftEnemyPos);
        if (vidaPlayer <= 0) {
          gameOver();
        }
        enemyShips[i].remove();
      }
    }
  }
};

// Colisão dos tiros com as naves inimigas
const colisao = () => {
  const allEnemyShips = document.querySelectorAll(".enemy");
  const allshot = document.querySelectorAll(".shot");
  allEnemyShips.forEach((enemyShip) => {
    allshot.forEach((shot) => {
      const colisaoEnemyShip = enemyShip.getBoundingClientRect();
      const colisaoShot = shot.getBoundingClientRect();
      const posLeftEnemy = enemyShip.offsetLeft;
      const posTopEnemy = enemyShip.offsetTop;
      let currentHealthEnemy = parseInt(enemyShip.getAttribute("data-vida"));
      if (
        colisaoEnemyShip.left < colisaoShot.right &&
        colisaoEnemyShip.right > colisaoShot.left &&
        colisaoEnemyShip.top < colisaoShot.bottom &&
        colisaoEnemyShip.bottom > colisaoShot.top
      ) {
        currentHealthEnemy--;
        shot.remove();
        if(currentHealthEnemy === 0) {
          currentPoints += 100;
          pontos.textContent = `Pontos: ${currentPoints}`;
          enemyShip.remove();
          destroyEnemy(posLeftEnemy, posTopEnemy);
        } else {
          enemyShip.setAttribute("data-vida", currentHealthEnemy);
        }
      }
    });
  });
};

// Explosão da destruição de uma nave inimiga com os tiros
const destroyEnemy = (posLeftEnemy, posTopEnemy) => {
  const destroyEnemy = document.createElement("div");
  destroyEnemy.className = "destroyEnemy";
  destroyEnemy.style.position = "absolute";
  destroyEnemy.style.width = "100px";
  destroyEnemy.style.height = "100px";
  destroyEnemy.style.backgroundImage = "url(assets/explosion-1.gif)";
  destroyEnemy.style.backgroundPosition = "center";
  destroyEnemy.style.backgroundRepeat = "no-repeat";
  destroyEnemy.style.backgroundSize = "contain";
  destroyEnemy.style.left = posLeftEnemy + "px";
  destroyEnemy.style.top = posTopEnemy + "px";
  arena.appendChild(destroyEnemy);
  setTimeout(() => {arena.removeChild(destroyEnemy);}, 1300);
  audioExplosion();
};

// Explosão da destruição de uma nave inimiga ao chegar no bottom
const explosionEnemy = (posLeftEnemy) => {
  const explosionEnemy = document.createElement("div");
  explosionEnemy.className = "explosionEnemy";
  explosionEnemy.style.position = "absolute";
  explosionEnemy.style.width = "100px";
  explosionEnemy.style.height = "100px";
  explosionEnemy.style.backgroundImage = "url(assets/explosion-1.gif)";
  explosionEnemy.style.backgroundPosition = "center";
  explosionEnemy.style.backgroundRepeat = "no-repeat";
  explosionEnemy.style.backgroundSize = "contain";
  explosionEnemy.style.left = posLeftEnemy + "px";
  explosionEnemy.style.top = (arenaHeight - 100) + "px";
  arena.appendChild(explosionEnemy);
  setTimeout(() => {arena.removeChild(explosionEnemy);}, 1300);
  audioExplosion();
};

// audio Explosão
const audioExplosion = () => {
  explosionSound = document.createElement("audio");
  explosionSound.className = "explosionSound";
  explosionSound.setAttribute("src", "audios/explosao-1.mp3");
  explosionSound.play();
  arena.appendChild(explosionSound);
  explosionSound.addEventListener("ended", () => {
    explosionSound.remove();
  });
};

// Game Over
const gameOver = () => {
  document.removeEventListener("keydown", teclaPress);
  document.removeEventListener("keyup", teclaSol);
  clearInterval(checkMoveNave);
  clearInterval(checkShoot);
  clearInterval(checkDesShot);
  clearInterval(checkGenEnemy);
  clearInterval(checkGenEnemy2);
  clearInterval(checkGenEnemy3);
  clearInterval(checkDesEnemy);
  clearInterval(checkColisao);

  const youLose = document.createElement("div");
  youLose.innerHTML = "GAME OVER!";
  youLose.style.fontFamily = "var(--title)";
  youLose.style.fontSize = "68px";
  youLose.style.fontWeight = "600";
  youLose.style.letterSpacing = "2px";
  youLose.style.textShadow = "4px 4px 10px rgba(255,0,0,1)";
  youLose.style.color = "red";
  youLose.style.position = "absolute";
  youLose.style.left = "50%";
  youLose.style.top = "50%";
  youLose.style.transform = "translate(-50%, -50%)";
  arena.appendChild(youLose);

  arena.removeChild(nave);

  const enemyShips = document.querySelectorAll(".enemy");
  enemyShips.forEach((enemy) => {
    enemy.remove();
  })

  const allshots = document.querySelectorAll(".shot");
  allshots.forEach((shot) => {
    shot.remove();
  })
};

// iniciar game
const iniciarGame = () => {
  document.addEventListener("keydown", teclaPress);
  document.addEventListener("keyup", teclaSol);
  checkMoveNave = setInterval(moveNave, 20);
  checkShoot = setInterval(createShoot, 10);
  checkDesShot = setInterval(desShot, 30);
  checkGenEnemy = setInterval(genEnemy, 4000);
  checkGenEnemy2 = setInterval(genEnemy2, 5400);
  checkGenEnemy3 = setInterval(genEnemy3, 6800);
  checkDesEnemy = setInterval(desEnemy, 20);
  checkColisao = setInterval(colisao, 10);
  btnIniciar.style.display = "none";
  musicGame.loop = true;
  musicGame.play();
};
