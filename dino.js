let board
let boardWidth = 900;
let boardHeight = 200;

let dinoWidth = 40;
let dinoHeight = 60;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg1;
let dinoImg2;
let dinoImg3;

let trackImg;
let trackX = 0;
let trackHeight = 10;
let trackY = boardHeight - trackHeight;
let trackWidth = boardWidth;


let GameOverImg;
GameOverImg = new Image();
GameOverImg.src = "./img/reset.png";


let gravity = 0.55;
let velX = -8;
let velY = 0;

let gameOver = false;
let score = 0;
let prevScore = 0;

let dino = {
    x : dinoX,
    y : dinoY,
    width: dinoWidth,
    height : dinoHeight
};

let cactusArr = [];

let cactus1width = 30;
let cactus2width = 60;
let cactus3width = 90;

let cactusheight = 57; 

let cactusX = 800;
let cactusY = boardHeight - cactusheight;

let cactus1;
let cactus2;
let cactus3;    

let high_score = 0;

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    dinoImg1 = new Image();
    dinoImg1.src = "./img/dino.png";

    dinoImg2 = new Image();
    dinoImg2.src = "./img/dino-run1.png";

    dinoImg3 = new Image();
    dinoImg3.src = "./img/dino-run2.png";

    trackImg = new Image();
    trackImg.src = "./img/track.png";
    context.drawImage(trackImg,trackX,trackY,trackWidth,trackHeight);
    
    dinoImg1.onload = function(){
        context.drawImage(trackImg,trackX,trackY,trackWidth,trackHeight);
        context.drawImage(dinoImg1,dino.x,dino.y,dino.width,dino.height);
        
    }

    cactus1 = new Image();
    cactus1.src = "./img/cactus1.png";

    cactus2 = new Image();
    cactus2.src = "./img/cactus2.png";

    cactus3 = new Image();
    cactus3.src = "./img/cactus3.png";

    requestAnimationFrame(update);
    setInterval(cactus_placer,1500);
    document.addEventListener("keydown",moveDino);
    document.addEventListener("click",moveDino);
    document.addEventListener("touchstart",moveDino);

    
}

function update(){
    requestAnimationFrame(update);

    if(gameOver){
        context.fillstyle = "black";
        context.font = "40px courier";
        context.fillText("GAME OVER",330,50);
        context.drawImage(GameOverImg,420,70,40,40);
        document.addEventListener("keydown",restart_game);
        board.addEventListener("touchstart",restart_game);
        document.addEventListener("click",restart_game);
        document.getElementById("Restart_text").style.visibility='visible';
        if(high_score < score){
            high_score = score;
        }
        return;
    }

    document.getElementById("Restart_text").style.visibility='hidden';

    context.clearRect(0,0,board.width,board.height);

    context.fillstyle = "black";
    context.font = "20px courier";
    context.fillText("High Score:",650,20);

    
    velY += gravity;
    dino.y = Math.min(dino.y + velY,dinoY);
    if(score%10 < 5 && dino.y == dinoY){
        context.drawImage(dinoImg3,dino.x,dino.y,dino.width,dino.height);
    }
    else if(score%10 >= 5 && dino.y == dinoY){
        context.drawImage(dinoImg2,dino.x,dino.y,dino.width,dino.height);
    }

    else{
        context.drawImage(dinoImg1,dino.x,dino.y,dino.width,dino.height);
    }

    context.drawImage(trackImg,trackX,trackY,trackWidth,trackHeight);
    
    for(let i = 0;i< cactusArr.length;i++){
        let cac =  cactusArr[i];
        cac.x += velX;
        context.drawImage(cac.img,cac.x,cac.y,cac.width,cac.height);
        if(detectColision(dino,cac)){
            gameOver = true;
            dinoImg1.src = "./img/dino-dead.png";
            dinoImg1.onload = function(){
                context.drawImage(dinoImg1,dino.x,dino.y,dino.width,dino.height);
            }
        }
    }

    context.fillstyle="black";
    context.font = "20px courier";
    score++;
    context.fillText(score,5,20);

    context.fillstyle = "black";
    context.font = "20px courier";
    context.fillText(high_score,780,21);
    

    if(prevScore + 500 < score ){
        velX = -1 + velX;
        prevScore = score;
    }

    

}

function moveDino(event){
    if(gameOver){
        return;
    }

    if((event.code == "Space" || event.code == "ArrowUp"||event.type == "click" ||event.type =="touchstart") && (dino.y == dinoY)){
        velY = -12;
    }

}

function cactus_placer(){
    let cactus = {
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height : cactusheight
    };

    let chance = Math.random();

    if(chance > 0.85){
        cactus.img = cactus3;
        cactus.width = cactus3width;
        cactusArr.push(cactus);
    }

    else if(chance > 0.5){
        cactus.img = cactus2;
        cactus.width = cactus2width;
        cactusArr.push(cactus);

    }

    else{
        cactus.img = cactus1;
        cactus.width = cactus1width;
        cactusArr.push(cactus);
    }

    if(cactusArr.length > 5){
        cactusArr.shift();
    }
}   



function detectColision(a,b){
    return a.x < b.width + b.x &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height && 
            a.y + a.height > b.y;
}


function restart_game(event){
   if(gameOver){
    gameOver = false;
    context.clearRect(0,0,board.width,board.height);
    cactusArr = [];
    score = 0;
    velX = -8;
   }
   
}