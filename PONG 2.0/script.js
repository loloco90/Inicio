// Variáveis da bolinha
let xBolinha = 300, yBolinha = 200, diametro = 20, raio = diametro / 2;
let velXBolinha = 5, velYBolinha = 5;

// Variáveis das raquetes
let raqueteComprimento = 10, raqueteAltura = 100;
let xRaquete = 10, yRaquete = 150, velRaquete = 10;
let xRaqueteOponente = 510, yRaqueteOponente = 150, velOponente = 5;

// Estados de controle
let moveUp = false;
let moveDown = false;

function setup() {
  createCanvas(windowWidth * 0.6, windowHeight * 0.6);
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
  if (moveUp) yRaquete -= velRaquete;
  if (moveDown) yRaquete += velRaquete;

  // Limites da raquete
  yRaquete = constrain(yRaquete, 0, height - raqueteAltura);
}

function movimentaRaqueteOponente() {
  if (yBolinha > yRaqueteOponente + raqueteAltura / 2) yRaqueteOponente += velOponente;
  if (yBolinha < yRaqueteOponente + raqueteAltura / 2) yRaqueteOponente -= velOponente;

  // Limites da raquete oponente
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

// Lógica dos botões
const btnUp = document.getElementById('btnUp');
const btnDown = document.getElementById('btnDown');

btnUp.addEventListener('mousedown', () => moveUp = true);
btnUp.addEventListener('mouseup', () => moveUp = false);
btnDown.addEventListener('mousedown', () => moveDown = true);
btnDown.addEventListener('mouseup', () => moveDown = false);

// Também tratar o touch para mobile
btnUp.addEventListener('touchstart', () => moveUp = true);
btnUp.addEventListener('touchend', () => moveUp = false);
btnDown.addEventListener('touchstart', () => moveDown = true);
btnDown.addEventListener('touchend', () => moveDown = false);
