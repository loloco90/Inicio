// Variáveis da bolinha
let xBolinha = 300, yBolinha = 200, diametro = 20, raio = diametro / 2;
let velXBolinha = 5, velYBolinha = 5;

// Variáveis das raquetes
let raqueteComprimento = 4, raqueteAltura = 100;
let xRaquete = 10, yRaquete = 150, velRaquete = 10;
let xRaqueteOponente = 510, yRaqueteOponente = 150, velOponente = 5;

function setup() {
  createCanvas(520, 520);
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
  if (keyIsDown(UP_ARROW)) yRaquete -= velRaquete;
  if (keyIsDown(DOWN_ARROW)) yRaquete += velRaquete;
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
