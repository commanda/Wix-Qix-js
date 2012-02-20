
// The width and height of the canvas we're drawing into
var screenWidth = 500;
var screenHeight = 500;

// Create the cursor object
var cursor = new Cursor();

// Declare the timer that controls the game loop
var timeout;

// What key(s) are being pressed right now
var isSlowPressed = false;
var isFastPressed = false;
var isLeftPressed = false;
var isUpPressed = false;
var isRightPressed = false;
var isDownPressed = false;

// Get a reference to the canvas element from the html
var canvas = document.getElementById('canv');
var canvas2 = document.getElementById('canv2');


// Get a reference to the context, which is what we draw into
var ctx = canvas.getContext('2d');
var ctx2 = canvas2.getContext('2d');

canvas.width = canvas2.width = screenWidth;
canvas.height = canvas2.height = screenHeight;



// Create an ImageData object.
var buffer;
var pix;


// Fill the background with a color
ctx.fillStyle = '#666';
ctx.fillRect(0, 0, screenWidth, screenHeight);

// Draw the bounding rectangle into the canvas  
ctx.strokeStyle = '#fff';
ctx.lineWidth = 3;
ctx.lineCap = "square";
ctx.beginPath();
ctx.moveTo(30, 30);
ctx.lineTo(screenWidth - 30, 30);
ctx.lineTo(screenWidth - 30, screenHeight - 30);
ctx.lineTo(30, screenHeight - 30);
ctx.lineTo(30, 30);
ctx.stroke();
ctx.closePath();


// Fill the buffer with gray for now, black for realz later
// var n = 0;
// for (var i = 0, n = pix.length; i < n; i += 4) {
//   pix[i  ] = 100; // red channel
//   pix[i+1] = 100; // green channel
//   pix[i+2] = 100; // blue channel
//   pix[i+3] = 255; // alpha channel
// }

// Add the edge of the board
// for(x = 30*4; x < (screenWidth - 30)*4; x += 4)
// {
//     var y = 30 * 4;
//     var p = (screenWidth * y) + x;
//     // White
//     pix[p ] = pix[p+1] = pix[p+2] = pix[p+3] = 255;
// 
// }








$(window).bind("keydown", function(e)
{
   
    // If the key that was pressed is one of the 4 arrow keys, send the event to the cursor
    if(e.which >= 37 && e.which <= 40)
    {
        e.preventDefault();
        
        switch(e.which)
        {
            case DOWN:
                isDownPressed = true;
                break;
            case UP:
                isUpPressed = true;
                break;
            case LEFT:
                isLeftPressed = true;
                break;
            case RIGHT:
                isRightPressed = true;
                break;
            default:
                // do nothing - the key pressed wasn't one of the arrow keys
                break;
        }
        
    }
    // Pressed the z
    else if(e.which == 90)
    {
        isSlowPressed = true;
    }
    // Pressed the x
    else if(e.which == 88)
    {
        isFastPressed = true;
    }
});

$(window).bind("keyup", function(e)
{
    switch(e.which)
    {
        case DOWN:
            isDownPressed = false;
            break;
        case UP:
            isUpPressed = false;
            break;
        case LEFT:
            isLeftPressed = false;
            break;
        case RIGHT:
            isRightPressed = false;
            break;
        case 88:
            isFastPressed = false;
            break;
        case 90:
            isSlowPressed = false;
            break;
        default:
            break;
    }
});

// Wipe the screen by filling it with the background color
var drawBackground = function()
{    
    // Clear the front canvas
    ctx2.clearRect(0, 0, screenWidth, screenHeight);
}

// The update function
var runLogic = function()
{
    cursor.tick();
}

// The draw function - where we tell everything to draw itself to the screen
var draw = function()
{
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

