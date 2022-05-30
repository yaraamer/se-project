var myGamePiece;
var canvaWidth=500
var canvaHeight=500


let img; //yy

function preload() {
  img = loadImage('cat.png');
}

function startGame() {
    // myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece = new component(40, 40, "cat.png", 10, 120,"image");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvaWidth;
        this.canvas.height = canvaHeight;
        // this.canvas.style.right="100px";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y,type) {
    this.type = type;
    if(type=="image"){
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y; 
    this.angle = 0;
    this.moveAngle = 1;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y); 
        ctx.rotate(this.angle);
        if (type == "image") {
            ctx.translate(this.width/2,this.height/2);
            ctx.drawImage(this.image,
            (this.width/2)*-1,
            (this.height/2)*-1,
            this.width, this.height);
        }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);        
          
        }
        ctx.restore(); 
    }
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);   
        
        // yy
        // handling not going out of borders
        if(this.x > (canvaWidth-this.width/2))
        {
            // console.log("myGamePiece width"+this.width)
            console.log("X"+ this.x);
            this.x= (canvaWidth-(this.width/2));
        }
        if(this.x < (this.width/2))
        {
            // console.log("myGamePiece width"+this.width)
            console.log("X"+ this.x);
            this.x= (this.width/2);
        }
        if(this.y > (canvaHeight-this.height/2))
        {
            // console.log("myGamePiece height"+this.height)
            console.log("Y"+ this.y);
            this.y= (canvaHeight-(this.height/2));
        }
        if(this.y < (this.height/2))
        {
            // console.log("myGamePiece height"+this.height)
            console.log("Y"+ this.y);
            this.y= (this.height/2);
        }
    }    
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.moveAngle = 0;
    myGamePiece.speed = 0;
    myGamePiece.newPos();    
    myGamePiece.update();
}

// i/p from txtfile program 

function moveup(moves) {
    for(let i=0;i<moves;i++){

        myGamePiece.y -= 1; 
    }

}

function movedown(moves) {
     for(let i=0;i<moves;i++){
    myGamePiece.y += 1;
     } 
}

function moveleft(moves) {
     for(let i=0;i<moves;i++){
    myGamePiece.x -= 1; 
     }
}

function moveright(moves) {
     for(let i=0;i<moves;i++){
    myGamePiece.x += 1; 
     }

    }
async function goToXY(x,y)
    {
        myGamePiece.x =x; 
        myGamePiece.y =y; 
    }
async function setX(x)
{
    myGamePiece.x =x; 
}
async function setY(y)
{
    myGamePiece.y =y; 
}
async function incX(x)
{
    myGamePiece.x +=x; 
}
async function incY(y)
{
    myGamePiece.y +=y; 
}

function rotate(angle){

    console.log("before:"+ myGamePiece.angle)
    myGamePiece.angle +=angle;

    console.log("after:"+ myGamePiece.angle)

}

function stopMoving() {
  // cancel requestAnimationFrame function to stop moving.
  window.cancelAnimationFrame(reqID);
}
// function moveUp(moves){

// }

