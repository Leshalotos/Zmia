const canvas = document.getElementById("zmia");
const ctx = canvas.getContext("2d");

const foodImg = new Image();
foodImg.src = "food.png"; 

let box = 32;

let score = 0;

let food = {
    x: Math.floor((Math.random() * 23 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let zmia = [];

zmia[0] = {
    x: 10 * box,
    y: 10 * box
};

document.addEventListener("keydown", traffic);

let tr;

function traffic(event) {
    event.preventDefault();
    if(event.keyCode == 37 && tr != "right")
    tr = "left";
    if(event.keyCode == 38 && tr != "down")
    tr = "up";
    if(event.keyCode == 39 && tr != "left")
    tr = "right";
    if(event.keyCode == 40 && tr != "up")
    tr = "down";
}

function eatSelf(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            document.getElementById("gameoverspan").innerHTML = "GAME OVER";
            document.getElementById("newgame").hidden = false;
            newgame.addEventListener("onclick", ng);
        }
    }
}

function drawGame() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(0,0, 800, 608);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.moveTo(0, 0);
    ctx.lineTo(800, 0);
    ctx.stroke();
    ctx.moveTo(0, 608);
    ctx.lineTo(800, 608);
    ctx.stroke();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 608);
    ctx.stroke();
    ctx.moveTo(800, 0);
    ctx.lineTo(800, 608);
    ctx.stroke();
    ctx.fillText("Zmia 2020", 10 * box, box);
    ctx.drawImage(foodImg, food.x, food.y);
    document.getElementById("newgame").hidden = true;
    for(let i = 0; i < zmia.length; i++) {
        ctx.fillRect(zmia[i].x, zmia[i].y, box, box);
    }

    let zmiaX = zmia[0].x;
    let zmiaY = zmia[0].y;
    
    if(zmiaX == food.x && zmiaY == food.y) {
        score++;
        food = {
        x: Math.floor((Math.random() * 23 + 1)) * box,
        y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else 
      zmia.pop();
    

    ctx.font = "40px serif";
    ctx.fillText("Score:" + score, box, box);

    if(tr == "left") zmiaX -= box;
    if(zmiaX < 0) zmiaX = box * 25;
    if(tr == "right") zmiaX += box;
    if(zmiaX > box * 25) zmiaX = box; 
    if(tr == "up") zmiaY -= box;
    if(zmiaY < box) zmiaY = box * 17;
    if(tr == "down") zmiaY += box;
    if(zmiaY > box * 17) zmiaY = box;

    let newHead = {
        x: zmiaX,
        y: zmiaY
    };

    eatSelf(newHead, zmia);

    zmia.unshift(newHead); 
}

let game = setInterval(drawGame, 100);