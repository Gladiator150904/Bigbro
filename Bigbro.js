//board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

// dino
let dinoWidth = 500/3.5;
let dinoHeight = 407/3.5;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x: dinoX,
    y: dinoY,
    width : dinoWidth,
    height: dinoHeight
}

//cactus
let cactusArray = [];

let cactus1Width = 985/15;
let cactus1Height = 1600/15;
let cactus2Width = 1055/15;
let cactus2Height = 1751/15;
let cactus3Width = 963/15;
let cactus3Height = 856/15;
let cactus4Width = 1100/15;
let cactus4Height = 1600/15;
let cactus5Width = 986/15;
let cactus5Height = 1604/15;

let cactusX = 700;
let cactus1Y = boardHeight - cactus1Height;
let cactus2Y = boardHeight - cactus2Height;
let cactus3Y = boardHeight - cactus3Height;
let cactus4Y = boardHeight - cactus4Height;
let cactus5Y = boardHeight - cactus5Height;


let cactus1Img;
let cactus2Img;
let cactus3Img;
let cactus4Img;
let cactus5Img;

//physics
let cactusVelocity = -9;
let jumpVelocity = 0;
let gravity = 0.8;

let gameOver = false;
let score = 0;
window.onload = function()
{
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext('2d');

    dinoImg = new Image();
    dinoImg.src = "./green_bigbro-removebg-preview.png";
    dinoImg.onload = function(){
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = './cactus1.png';

    cactus2Img = new Image();
    cactus2Img.src = './cactus2.png';

    cactus3Img = new Image();
    cactus3Img.src = './cactus3.png';

    cactus4Img = new Image();
    cactus4Img.src = './cactus4.png';

    cactus5Img = new Image();
    cactus5Img.src = './cactus5.png';

    requestAnimationFrame(update);
    setInterval(generateCactus, 1000);
    document.addEventListener("keydown", moveDino);
    document.addEventListener("keydown", restart);                 
                 
}

function update()
{
    requestAnimationFrame(update);
    if(gameOver){
        context.fillStyle = "black";
        context.font = '50px Tan_Nimbus';
        context.fillText("Game Over",215,125);
        return;
    }  
    context.clearRect(0, 0, board.width, board.height);

    //dino
    jumpVelocity += gravity;
    dino.y = Math.min(dino.y + jumpVelocity, dinoY);
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    //cactus
    for(let i =0; i<cactusArray.length;i++){
        let cactus = cactusArray[i];
        cactus.x += cactusVelocity;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
        
        if(collisionDetect(dino, cactus) == 1)
        {
            gameOver = true;
        }
    }

    //score
    context.fillStyle = "black"
    context.font = "20px Courier";
    score ++;
    context.fillText(score, 5, 20);
}

function generateCactus()
{
    if(gameOver){
        return;
    }


    let cactus = {
        img: null,
        x: cactusX,
        y: null,
        width: null,
        height: null
    }

    let cactusChance = Math.random();

    if(cactusChance>.90){
        cactus.img = cactus1Img;
        cactus.y = cactus1Y;
        cactus.height = cactus1Height;
        cactus.width = cactus1Width;    
        cactusArray.push(cactus);
    }

    else if(cactusChance>.90){
        cactus.img = cactus2Img
        cactus.y = cactus2Y;
        cactus.height = cactus2Height;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }

    else if(cactusChance>.70){
        cactus.img = cactus3Img;
        cactus.y = cactus3Y;
        cactus.height = cactus3Height;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }

    else if(cactusChance>.60){
        cactus.img = cactus4Img;
        cactus.y = cactus4Y;
        cactus.height = cactus4Height;
        cactus.width = cactus4Width;
        cactusArray.push(cactus);
    }

    else if(cactusChance>.50){
        cactus.img = cactus5Img;
        cactus.y = cactus5Y;
        cactus.height = cactus5Height;
        cactus.width = cactus5Width;
        cactusArray.push(cactus);
    }

    if(cactusArray.length>6){
        cactusArray.shift();
    }

    
}

function moveDino(e){
    if(gameOver){
        return;
    }
    if((e.code == "Space"||e.code == "ArrowUp")&& dino.y == dinoY )
    {
        jumpVelocity = -20; 
    }

}

function collisionDetect(a,b){
    return (a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y + a.height > b.y &&
            a.y < b.y + b.height);

}

function restart(e){
    if(gameOver == true && e.code == "Space")
    {
        location.reload();
    }
}

