// Variáveis da bolinha
let xBolinha, yBolinha, diametro = 20, raio = diametro / 2;
let velXBolinha = 5, velYBolinha = 5;

// Variáveis das raquetes
let raqueteComprimento = 10, raqueteAltura = 100;
let xRaquete = 10, yRaquete, velRaquete = 10;
let xRaqueteOponente, yRaqueteOponente, velOponente = 5;

let upPressed = false;
let downPressed = false;

function setup() {
  // Adaptação para diferentes telas
  let canvasWidth = windowWidth > 600 ? 520 : windowWidth * 0.9;
  let canvasHeight = windowHeight > 600 ? 400 : windowHeight * 0.6;

  createCanvas(canvasWidth, canvasHeight);

  // Iniciar posições da bolinha e raquetes
  xBolinha = width / 2;
  yBolinha = height / 2;
  yRaquete = height / 2 - raqueteAltura / 2;
  xRaqueteOponente = width - 20;
  yRaqueteOponente = height / 2 - raqueteAltura / 2;
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

  // Evitar que a raquete saia da tela
  yRaquete = constrain(yRaquete, 0, height - raqueteAltura);
}

function movimentaRaqueteOponente() {
  if (yBolinha > yRaqueteOponente + raqueteAltura / 2) yRaqueteOponente += velOponente;
  if (yBolinha < yRaqueteOponente + raqueteAltura / 2) yRaqueteOponente -= velOponente;

  // Evitar que a raquete do oponente saia da tela
  yRaqueteOponente = constrain(yRaqueteOponente, 0, height - raqueteAltura);
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

// Funções para detectar quando os botões são pressionados
document.getElementById('upBtn').addEventListener('mousedown', () => {
  upPressed = true;
});
document.getElementById('upBtn').addEventListener('mouseup', () => {
  upPressed = false;
});
document.getElementById('downBtn').addEventListener('mousedown', () => {
  downPressed = true;
});
document.getElementById('downBtn').addEventListener('mouseup', () => {
  downPressed = false;
});

// Suporte para dispositivos móveis (touch)
document.getElementById('upBtn').addEventListener('touchstart', (e) => {
  e.preventDefault(); // Prevenir comportamento de toque padrão
  upPressed = true;
});
document.getElementById('upBtn').addEventListener('touchend', () => {
  upPressed = false;
});
document.getElementById('downBtn').addEventListener('touchstart', (e) => {
  e.preventDefault();
  downPressed = true;
});
document.getElementById('downBtn').addEventListener('touchend', () => {
  downPressed = false;
});
