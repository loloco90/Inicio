// Variáveis da bolinha
let xBolinha = 300, yBolinha = 200, diametro = 20, raio = diametro / 2;
let velXBolinha = 5, velYBolinha = 5;

// Variáveis das raquetes
let raqueteComprimento = 4, raqueteAltura = 100;
let xRaquete = 10, yRaquete = 150, velRaquete = 10;
let xRaqueteOponente = 510, yRaqueteOponente = 150, velOponente = 5;

let upPressed = false, downPressed = false;

function setup() {
    createCanvas(520, 520);

  canvas.parent('gameContainer');  // Insere o canvas no div 'gameContainer'
}

function draw() {
  background(0);
  desenhaBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  
  desenhaRaquete(xRaquete, yRaquete);
  desenhaRaquete(xRaqueteOponente, yRaqueteOponente);
  
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
}

function desenhaBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velXBolinha;
  yBolinha += velYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) velXBolinha *= -1;
  if (yBolinha + raio > height || yBolinha - raio < 0) velYBolinha *= -1;
}

function desenhaRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW) || upPressed) yRaquete -= velRaquete;
  if (keyIsDown(DOWN_ARROW) || downPressed) yRaquete += velRaquete;
}

function movimentaRaqueteOponente() {
  if (yBolinha > yRaqueteOponente + raqueteAltura / 2) yRaqueteOponente += velOponente;
  if (yBolinha < yRaqueteOponente + raqueteAltura / 2) yRaqueteOponente -= velOponente;
}

function verificaColisaoRaquete(x, y) {
  if (
    xBolinha - raio < x + raqueteComprimento &&
    xBolinha + raio > x &&
    yBolinha + raio > y &&
    yBolinha - raio < y + raqueteAltura
  ) {
    velXBolinha *= -1;
  }
}

// Controles para dispositivos móveis
document.getElementById('upBtn').addEventListener('mousedown', () => upPressed = true);
document.getElementById('upBtn').addEventListener('mouseup', () => upPressed = false);
document.getElementById('downBtn').addEventListener('mousedown', () => downPressed = true);
document.getElementById('downBtn').addEventListener('mouseup', () => downPressed = false);

// Para toque em dispositivos móveis
document.getElementById('upBtn').addEventListener('touchstart', () => upPressed = true);
document.getElementById('upBtn').addEventListener('touchend', () => upPressed = false);
document.getElementById('downBtn').addEventListener('touchstart', () => downPressed = true);
document.getElementById('downBtn').addEventListener('touchend', () => downPressed = false);
