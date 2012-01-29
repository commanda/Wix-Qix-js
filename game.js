
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
shapes.push(boardOutline);

// What key(s) are being pressed right now
var isSlowPressed = false;
var isFastPressed = false;
var isLeftPressed = false;
var isUpPressed = false;
var isRightPressed = false;
var isDownPressed = false;



var isOkToTravel = function(start, end)
{
    var okToTravel = false;
    var shouldCloseShape = false;
    var isOnSide = false;
    
    // If the user is holding down one of the "go" keys (fast or slow),
    // then they can leave the safety of their existing lines.
    // Otherwise, if theyr'e not holding down the "go" key, they have to be on a line.
    
    
    // Either the fast or slow key needs to be pressed, not both (xor)
    if((isSlowPressed && !isFastPressed) || (!isSlowPressed && isFastPressed))
    {
        okToTravel = true;
    
        var array = doesLineHitExistingShape(start, end);
        shouldCloseShape = array[0];
        isOnSide = array[1];
    }
    console.log("okToTravel: "+okToTravel+ ", shouldCloseShape: "+shouldCloseShape);
    return new Array(okToTravel, shouldCloseShape, isOnSide);
}

var isVerticalLine = function(start, end)
{
    if(start.x == end.x)
    {
        return true;
    }
    return false;
}

var isHorizontalLine = function(start, end)
{
    if(start.y == end.y)
    {
        return true;
    }
    
    return false;
}

var doesLineHitExistingShape = function(start, end)
{
    var seShape = new Shape();
    
    // Ignore the start point because we already checked it the last time the cursor moved
    // Instead, start one point closer to the end point
    var advancedStart = new Point(start.x, start.y);
    
    // Vertical line
    if(isVerticalLine(start, end))
    {
        // Figure out whether to go up or down toward the end point
        if(end.y > start.y)
        {
            // Down
            advancedStart.y ++;
        }
        else
        {
            // Up
            advancedStart.y --;
        }
    }
    // Horizontal line
    else
    {
        // Figure out whether to go left or right toward the end point
        if(end.x < start.x)
        {
            // Left
            advancedStart.x --;
        }
        else
        {
            // Right
            advancedStart.x ++;
        }
    }
    
    seShape.addPoint(advancedStart);
    seShape.addPoint(end);
    
    

    var retVal = false;
    var isOnSide = false;
    
    // Check if this point is on one of the lines of the shapes we know about
    var i = 0;
    var j = 0;
    // Don't check the final shape in the array - it's the shape we're currently making
    console.log("starting shapes");
    for(i = 0; i < shapes.length -1; i++)
    {
        var shape = shapes[i];
        console.log("SHAPE["+i+"]");
        var points = shape.points;
        
        var pointA = null;
        var pointB = null;
        
        for(j = 0; j < points.length; j++)
        {
            pointA = points[j];
            // If pointA was the last point in the array, pointB loops around to the front of the array
            // if the shape is closed
            if(j < points.length -1)
            {
                pointB = points[j+1];
            }
            else
            {
                if(shape.isClosed)
                {
                    pointB = points[0];
                }
                // If this isn't a closed shape, we're done checking this shape
                else break;
            }
            
            //console.log("pointA: " + pointA + ", point: " + point + ", pointB: " + pointB);
            
            // We now have points A and B, make a mini shape out of them so we can do left, right, top, and bottom
            var abShape = new Shape();
            abShape.addPoint(pointA);
            abShape.addPoint(pointB);
            
            if(abShape.intersectsShape(seShape))
            {
                retVal = true;
                console.log("abShape: "+abShape+", seShape: "+seShape);
                
                // Check if these two lines are co-incident
                // If they're both horizontal, or both vertical, at this point we already know they intersect
                // thus we know they are co-incident
                if((isVerticalLine(pointA, pointB) && isVerticalLine(advancedStart, end))
                || (isHorizontalLine(pointA, pointB) && isHorizontalLine(advancedStart, end)))
                {
                    isOnSide = true;
                }
                
                break;
            }
            /*
            // If this is a vertical line
            if(pointA.x == pointB.x && pointB.x == point.x)
            {
                
                // If our point is between pointA and pointB
                if((pointB.y <= point.y && point.y <= pointA.y)
                || (pointA.y <= point.y && point.y <= pointB.y))
                {
                    retVal = true;
                    break;
                }
            }
            
            // If this is a horizontal line
            if(pointA.y == pointB.y && pointB.y == point.y)
            {
                // If our point is between pointA and pointB
                if((pointB.x <= point.x && point.x <= pointA.x)
                || (pointA.x <= point.x && point.x <= pointB.x))
                {
                    retVal = true;
                    break;
                }
            }
            */
        }
        // We found a good line, let's return early
        if(retVal)
        {
            break;
        }
        
    }
    
    return new Array(retVal, isOnSide);
    
}

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
var drawBackground = function(){
    ctx.fillStyle = '#666';
    ctx.beginPath();
    ctx.rect(0, 0, screenWidth, screenHeight);
    ctx.closePath();
    ctx.fill();
}

// The update function
var runLogic = function(){
    
    cursor.handleArrowPress();
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

