const homeBtn = document.getElementById('homeButton');

const screen = document.querySelector('.content');
const screenContent = document.querySelector('main');
const home = document.getElementById('home');
const nav = document.querySelector('nav');
const aplications = document.getElementsByClassName('aplication');

const ticTacToeBoard = document.getElementById('ticTacToeBoard');
let board = ['', '', '', '', '', '', '', '', ''];
let zaznaczenie = 'X';

const memoryBoard = document.getElementById('memoryBoard');
const memorCard = document.getElementsByClassName('memor');

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let memory = [];
let losowa;
let otwarta = 0;
let otwarte = [];
let otwarteValue = [];
let odkryte = [];
let liczbaTur = 0;

let power = true;
let inGame = false;
let random;

Power();
Losowanie();


homeBtn.addEventListener('click', function(){

    if(!inGame){
        if(power){
            power = false;
        }else{
            power = true;
        }
    }else{
        power = true;
        inGame = false;
    }
    

    Power();

});

function Power(){
    if(power){
        Stop();
        random = Math.floor(Math.random() * 10) + 1;
        screen.style.backgroundImage =  'url(../images/background/' + random + '.jpg)';
        screenContent.style.display = 'block';
    }else{
        screen.style.backgroundImage =  'none';
        screenContent.style.display = 'none';
    }
}

function Start(){
    power = false;
    nav.style.display = 'none';
    home.style.display = 'none';
    memoryBoard.style.display = 'none';
}

function Stop(){
    nav.style.display = 'grid';
    home.style.display = 'block';
    ticTacToeBoard.style.display = 'none';
    wynik.style.display = 'none';
    info.style.display = 'none';
    memoryBoard.style.display = 'none';
    canvas.style.display = 'none';
}

aplications[0].addEventListener('click', function(){

    Start();
    restartGame();
    canvas.style.display = 'block';
    gameLoopInterval = setInterval(gameLoop, 10);
    setInterval(() => {
        wynikTrex++;
    }, 100);

});

function stopGame() {
    clearInterval(gameLoopInterval);
    wynik.innerHTML = 'Zachaczyłeś o kaktusa! <br> Twój wynik to: ' + wynikTrex;
    wynik.style.display = 'block';
    canvas.style.display = 'none';
    wynik.style.height = '100%';
}

const trex = {
    x: 50,
    y: canvas.height - 70,
    width: 25,
    height: 30,
    jumpSpeed: 2.2,
    isJumping: false,
};

let jump;
let blocking = false;
let wynikTrex = 0;
let anim;
let gameLoopInterval;

const kaktusArray = [
    {x: Math.floor(Math.random() * (151) + 150), y: canvas.height - 65, width: 20, height: 25, speed: 1.1},
    {x: Math.floor(Math.random() * (501) + 750), y: canvas.height - 65, width: 20, height: 25, speed: 1.1},
    {x: Math.floor(Math.random() * (1000) + 1200), y: canvas.height - 65, width: 20, height: 25, speed: 1.1},
    {x: Math.floor(Math.random() * (1500) + 3000), y: canvas.height - 65, width: 20, height: 25, speed: 1.1},
    {x: Math.floor(Math.random() * (1500) + 6000), y: canvas.height - 65, width: 20, height: 25, speed: 1.1},
    {x: Math.floor(Math.random() * (2000) + 10000), y: canvas.height - 65, width: 20, height: 25, speed: 1.1},
    {x: Math.floor(Math.random() * (5000) + 15000), y: canvas.height - 65, width: 20, height: 25, speed: 1.1},
];

const trexImage = new Image();
trexImage.src = '../images/trex/trex.png';

const kaktusImage = new Image();
kaktusImage.src = '../images/trex/kaktus.png';

function drawTrex(){

    ctx.drawImage(trexImage, trex.x, trex.y, trex.width, trex.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, canvas.height - 40, canvas.width, 1);

    for (const kaktus of kaktusArray) {
        ctx.drawImage(kaktusImage, kaktus.x, kaktus.y, kaktus.width, kaktus.height);
    }
}

function checkCollision() {
    for (const kaktus of kaktusArray) {
        if (trex.x + 10 < kaktus.x + kaktus.width && trex.x + trex.width - 10 > kaktus.x && trex.y + 10 < kaktus.y + kaktus.height && trex.y + trex.height - 10 > kaktus.y){
            stopGame();
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (trex.isJumping) {
        trex.y -= trex.jumpSpeed;
    } else {
        if(trex.y < canvas.height - 70){
            trex.y += trex.jumpSpeed/1.3;
        }
    }

    drawTrex();
    checkCollision();
    update();
    drawScore();
}

function jumpTrex(){
    if (!trex.isJumping && !blocking && trex.y > 70) {
        trex.isJumping = true;
        jump = setTimeout(() => {
            trex.isJumping = false;
            blocking = true;
        }, 400);
    }
}

canvas.addEventListener('touchstart', jumpTrex);

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        jumpTrex();
    }
});


document.addEventListener('keyup', function (event) {
    if (event.code === 'Space'){
        blocking = false;
        trex.isJumping = false;
        if (jump) {
            clearTimeout(jump);
        }
    }
});

function update() {
    for (const kaktus of kaktusArray) {
        kaktus.x -= kaktus.speed;
        if (kaktus.x < 0) {
            kaktus.x = canvas.width;
        }
    }
}

function drawScore() {
    ctx.fillStyle = '#eee';
    ctx.font = '20px Comic Sans MS';
    ctx.fillText(wynikTrex, canvas.width - 40, 20);
}

function restartGame() {
    wynikTrex = 0;
    trex.y = canvas.height - 70;
    trex.isJumping = false;
    blocking = false;
    kaktusArray.forEach((kaktus, index) => {
        kaktus.x = Math.floor(Math.random() * (index * 500 + 150) + 150);
    });

    wynik.style.display = 'none';
    canvas.style.display = 'none';
}

aplications[1].addEventListener('click', function(){

    Start();
    resetTicTacToe();
    inGame = true;
    ticTacToeBoard.style.display = 'grid';

});

let squares = document.getElementsByClassName('square');
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function() {
        if (board[i] === '') {
            board[i] = zaznaczenie;
            renderBoard();
            checkWinner();
            togglePlayer();
        }
    });
}

function togglePlayer(){
    if(zaznaczenie == 'X'){
        zaznaczenie = 'O'
    }else{
        zaznaczenie = 'X'
    }
}

function checkWinner(){
    const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            if(zaznaczenie == 'X'){
                wynik.innerHTML = 'KRZYŻYK WYGRAŁ!<br><input type="submit" value="Zagraj jeszcze raz" onclick="resetTicTacToe()">';
            }else{
                wynik.innerHTML = 'KÓŁKO WYGRAŁO!<br><input type="submit" value="Zagraj jeszcze raz" onclick="resetTicTacToe()">';
            }
            wynik.style.display = 'block';
            ticTacToeBoard.style.display = 'none';
            wynik.style.height = '100%';
        }
    }

    if (!board.includes('')) {
        wynik.innerHTML = 'Remis<br><input type="submit" value="Zagraj jeszcze raz" onclick="resetTicTacToe()">';
        wynik.style.display = 'block';
        ticTacToeBoard.style.display = 'none';
        wynik.style.height = '100%';
    }
}

function renderBoard(){
    for (let index = 0; index < squares.length; index++) {
        squares[index].textContent = board[index];
    }
}

function resetTicTacToe(){
    board = ['', '', '', '', '', '', '', '', ''];
    zaznaczenie = 'X';
    wynik.style.display = 'none';
    ticTacToeBoard.style.display = 'grid';
    renderBoard();
}

aplications[2].addEventListener('click', function(){

    Start();
    inGame = true;
    memory = [];
    otwarta = 0;
    otwarte = [];
    otwarteValue = [];
    odkryte = [];
    liczbaTur = 0;
    memoryBoard.style.display = 'grid';
    Losowanie();
    for (let i = 0; i < memory.length; i++){
        memorCard[i].innerHTML = '<img src="../images/memory/logo.png" alt="Logo">';
    }

});

for (let i = 0; i < memory.length; i++) {
    memorCard[i].addEventListener('click', function() {
        if(i != otwarte[0]){
            if(otwarta != 2){
                memorCard[i].innerHTML = DodanieImg(memory[i]);
                otwarte.push(i);
                otwarteValue.push(memory[i]);
                otwarta++;
            }else{
                liczbaTur++;
                if(otwarteValue[0] != otwarteValue[1]){
                    memorCard[otwarte[0]].innerHTML = '<img src="../images/memory/logo.png" alt="Logo">';
                    memorCard[otwarte[1]].innerHTML = '<img src="../images/memory/logo.png" alt="Logo">';
                }else{
                    odkryte.push(otwarteValue[0]);
                }
                otwarte.splice(0, otwarte.length);
                otwarteValue.splice(0, otwarteValue.length);
                otwarta = 1;
                memorCard[i].innerHTML = DodanieImg(memory[i]);
                otwarte.push(i);
                otwarteValue.push(memory[i]);
            }
        }
        if(odkryte.length == 7 && otwarta == 2){
            liczbaTur++;
            wynik.innerHTML = 'Gratulacje! Ukończyłeś grę! <br> Liczba tur: ' + liczbaTur;
            wynik.style.display = 'block';
            memoryBoard.style.display = 'none';
            wynik.style.height = '100%';
        }
    });
}

function Losowanie(){
    memory.splice(0, otwarteValue.length);
    while (memory.length !== 16) {
        losowa = Math.floor(Math.random() * 8) + 1;
        if (ListaMemorow(memory, losowa) < 2) {
            memory.push(losowa);
        }
    }
    
}

function ListaMemorow(arr, target) {
    return arr.filter(element => element === target).length;
}

function DodanieImg(element){
    switch (element) {
        case 1:
            return '<img src="../images/memory/lub.png" alt="Lublin">';
        case 2:
            return '<img src="../images/memory/wro.png" alt="Wrocław">';
        case 3:
            return '<img src="../images/memory/tor.png" alt="Toruń">';
        case 4:
            return '<img src="../images/memory/cze.png" alt="Częstochowa">';
        case 5:
            return '<img src="../images/memory/gor.png" alt="Gorzów">';
        case 6:
            return '<img src="../images/memory/les.png" alt="Leszno">';
        case 7:
            return '<img src="../images/memory/gru.png" alt="Grudziądz">';
        case 8:
            return '<img src="../images/memory/zie.png" alt="Zielona Góra">';
    }
}

aplications[3].addEventListener('click', function(){

    Start();
    info.style.display = 'block';

});