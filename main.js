// Click Detect Challenge

//Canvas Setup
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let mouseIsPressed = false;
let mouseX, mouseY;

// Green Circles Array
let circles = [];
for (let n = 1; n <= 5; n++) {
    circles.push(randomCircle());
}

// Red Rectangles Array
let rectangles = [];
for (let n = 1; n <= 5; n++) {
    rectangles.push(randomRectangle());
}

window.addEventListener("load", draw);

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

   for (let i = 0; i < circles.length; i++) {
       moveCircle(circles[i]);
       drawCircle(circles[i]);
    }
  
    for (let i = 0; i < rectangles.length; i++) {
        moveRectangle(rectangles[i]);
        drawRectangle(rectangles[i]);
     }
 requestAnimationFrame(draw);
}

//Circle Stuff

function drawCircle(aCircle) {
 ctx.lineWidth = 3;   
 ctx.strokeStyle = "green";
 ctx.beginPath();
 ctx.arc(aCircle.x, aCircle.y, aCircle.r, 0, 2 * Math.PI)
 ctx.stroke();
}

function moveCircle(aCircle) {
    aCircle.y += aCircle.ys;
    aCircle.x += aCircle.xs;

    //Check for collisions with canvas boundaries
    if (aCircle.x - aCircle.r < 0 || aCircle.x + aCircle.r > cnv.width) {
        aCircle.xs = -aCircle.xs;
    }

    if (aCircle.y - aCircle.r < 0 || aCircle.y + aCircle.r > cnv.height) {
        aCircle.ys = -aCircle.ys;
    }
}

function randomCircle() {
   return {
        x: randomInt(0, cnv.width),
        y: randomInt(0, cnv.height),
        r: randomInt(30, 60),
        xs: randomInt(1, 3),
        ys: randomInt(1, 3)
    }
}

//Rectangle Stuff

function drawRectangle(aRectangle) { 
    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    ctx.strokeRect(aRectangle.x, aRectangle.y, aRectangle.sx, aRectangle.sy);
}
   
function moveRectangle(aRectangle) {
    aRectangle.y += aRectangle.ys;
    aRectangle.x += aRectangle.xs;
   
    //Check for collisions with canvas boundaries
    if (aRectangle.y > cnv.height || aRectangle.y < 0) {
        aRectangle.y -= aRectangle.y;
    }

    if (aRectangle.x > cnv.width || aRectangle.x < 0) {
        aRectangle.x -= aRectangle.x;
    }
}

function randomRectangle() {
    return {
        x: randomInt(0, cnv.width),
        y: randomInt(0, cnv.height),
        r: randomInt(10, 50),
        xs: randomInt(1, 3),
        ys: randomInt(1, 3),
        sx: randomInt(20, 60),
        sy: randomInt(20, 60)
    }
}

// Event Listeners & Handlers
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

requestAnimationFrame(draw);

function mousedownHandler(event) {
    window.addEventListener("load", draw);
    mouseIsPressed = true;
    let cnvRect = cnv.getBoundingClientRect();
    mouseX = event.x - cnvRect.x;
    mouseY = event.y - cnvRect.y;

    // Check for Clicked Circle
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        let distance = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2);
    
        if (mouseIsPressed && distance <= circle.r) {
            circles.splice(i, 1);
        }

        if (circles.length === 0) {
            return location.reload(alert("Game Over - You WIN"));
        } 
    }  

   
    // Check for Cliked Rectangle
    for (let i = 0; i < rectangles.length; i++) {
        let rectangle = rectangles[i];
        if (mouseX >= rectangle.x &&
            mouseX <= rectangle.x + rectangle.sx &&
            mouseY >= rectangle.y &&
            mouseY <= rectangle.y + rectangle.sy) {
            return location.reload(alert("Game Over - You LOSE!"));
        }
    } 
    
}

function mouseupHandler() {
    mouseIsPressed = false;
}