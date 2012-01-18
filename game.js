
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

// Handling keyboard input - this function gets called whenever a key is pressed
//window.onkeyup = function(e) {
//    console.log("e: ", e.charCode);
//}

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
var clear = function(){
    ctx.fillStyle = '#d0e7f9';
    ctx.beginPath();
    ctx.rect(0, 0, screenWidth, screenHeight);
    ctx.closePath();
    ctx.fill();
    
}

// The update function
var runLogic = function(){

}

// The draw function - where we tell everything to draw itself to the screen
var draw = function(){
    cursor.draw();
}
    
// The game loop: clear the screen, run the logic, paint the objects
var gameLoop = function(){
    clear();
    runLogic();
    draw();
    
    timeout = setTimeout(gameLoop, 20);
}

