// Variáveis da bolinha
let xBolinha, yBolinha, diametro = 20, raio = diametro / 2;
let velXBolinha = 5, velYBolinha = 5;

// Variáveis das raquetes
let raqueteComprimento = 10, raqueteAltura = 100;
let xRaquete, yRaquete, velRaquete = 10;
let xRaqueteOponente, yRaqueteOponente, velOponente = 5;

function setup() {
    // Configuração do canvas com 80% da largura da tela e 60% da altura
    createCanvas(windowWidth * 0.8, windowHeight * 0.6);
    xBolinha = width / 2;
    yBolinha = height / 2;
    xRaquete = 10;
    yRaquete = height / 2 - raqueteAltura / 2;
    xRaqueteOponente = width - raqueteComprimento - 10;
    yRaqueteOponente = height / 2 - raqueteAltura / 2;

    // Controle de clique para os botões de movimentação
    document.getElementById('upButton').addEventListener('click', moveUp);
    document.getElementById('downButton').addEventListener('click', moveDown);
}

function draw() {
    background(0);
    desenhaBolinha();
    movimentaBolinha();
    verificaColisaoBorda();

    desenhaRaquete(xRaquete, yRaquete);
    desenhaRaquete(xRaqueteOponente, yRaqueteOponente);

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
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velXBolinha *= -1;
    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velYBolinha *= -1;
    }
}

function desenhaRaquete(x, y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaRaqueteOponente() {
    if (yBolinha > yRaqueteOponente + raqueteAltura / 2) {
        yRaqueteOponente += velOponente;
    }
    if (yBolinha < yRaqueteOponente + raqueteAltura / 2) {
        yRaqueteOponente -= velOponente;
    }
}

function verificaColisaoRaquete(x, y) {
    if (xBolinha - raio < x + raqueteComprimento && xBolinha + raio > x &&
        yBolinha + raio > y && yBolinha - raio < y + raqueteAltura) {
        velXBolinha *= -1;
    }
}

// Funções para mover a raquete do jogador
function moveUp() {
    yRaquete -= velRaquete;
    if (yRaquete < 0) {
        yRaquete = 0;
    }
}

function moveDown() {
    yRaquete += velRaquete;
    if (yRaquete + raqueteAltura > height) {
        yRaquete = height - raqueteAltura;
    }
}

function windowResized() {
    resizeCanvas(windowWidth * 0.8, windowHeight * 0.6);
}
