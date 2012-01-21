
// The width and height of the canvas we're drawing into
var screenWidth = 500;
var screenHeight = 500;

// Get a reference to the canvas element from the html
var canvas = document.getElementById('canv');

// Get a reference to the context, which is what we draw into
var ctx = canvas.getContext('2d');

canvas.width = screenWidth;
canvas.height = screenHeight;

// Create the cursor object
var cursor = new Cursor();

// Declare the timer that controls the game loop
var timeout;

var boardOutline = new Shape();
boardOutline.strokeColor = '#fff';
boardOutline.isClosed = true;
var bOPoints = new Array(new Point(30, 30), 
                                new Point(screenWidth-30, 30),
                                new Point(screenWidth-30, screenHeight-30),
                                new Point(30, screenHeight-30));
var i = 0;
for(i = 0; i < bOPoints.length; i++)
{
    boardOutline.addPoint(bOPoints[i]);
}

// Here's where we'll keep all our completed shapes
var shapes = new Array();

$(window).bind("keydown", function(e){
    
    // If the key that was pressed is one of the 4 arrow keys, send the event to the cursor
    if(e.which >= 37 && e.which <= 40)
    {
        e.preventDefault();
        //console.log(e.which);
        cursor.handleArrowPress(e.which);
    }
});

// Wipe the screen by filling it with the background color
var drawBackground = function(){
    ctx.fillStyle = '#666';
    ctx.beginPath();
    ctx.rect(0, 0, screenWidth, screenHeight);
    ctx.closePath();
    ctx.fill();
    
    // Draw the outline of the board
    boardOutline.draw();
    
    
}

// The update function
var runLogic = function(){

}

// The draw function - where we tell everything to draw itself to the screen
var draw = function(){
    // Draw all our shapes
    var i = shapes.length-1;
    for(; i >= 0; i--)
    {
        shapes[i].draw();
    }
    
    // Draw our cursor
    cursor.draw();
}
    
// The game loop: clear the screen, run the logic, paint the objects
var gameLoop = function(){
    drawBackground();
    runLogic();
    draw();
    
    timeout = setTimeout(gameLoop, 20);
}

