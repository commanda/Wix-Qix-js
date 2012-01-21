var DOWN = 40;
var UP = 38;
var LEFT = 37;
var RIGHT = 39;
var MOVE_AMOUNT = 3;

// What the Cursor IS
function Cursor () {
    // What color the cursor is
    this.color = '#ff0000'; // Red
    this.size = 10;
    
    // Where the cursor is on the screen (its upper left corner)
    this.x = 30;
    this.y = 30;
    
    // The cursor starts out at the upper left corner of the board, so it is on a side (it's actually on two sides, top and left)
    this.isOnSide = true;
    
    this.currentShape = null;
    
    this.lastPoint = null;
}


// What the Cursor DOES
Cursor.prototype.draw = function(){

    
    // Draw the cursor itself
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    // Draw a diamond
    ctx.beginPath();
    ctx.moveTo(this.x - (this.size/2), this.y);
    ctx.lineTo(this.x, this.y - (this.size/2));
    ctx.lineTo(this.x + (this.size/2), this.y);
    ctx.lineTo(this.x, this.y + (this.size/2));
    ctx.lineTo(this.x - (this.size/2), this.y);
    ctx.stroke();
    ctx.closePath();
}

Cursor.prototype.handleArrowPress = function(keyCode){
    switch(keyCode)
    {
        case DOWN:
            this.y += MOVE_AMOUNT;
            break;
        case UP:
            this.y -= MOVE_AMOUNT;
            break;
        case LEFT:
            this.x -= MOVE_AMOUNT;
            break;
        case RIGHT:
            this.x += MOVE_AMOUNT;
            break;
        default:
            // do nothing - the key pressed wasn't one of the arrow keys
            break;
    }
    
    // The cursor isn't on a side of the boardOutline unless we find out below that it is
    this.isOnSide = false;
    
    // Prevent the cursor from going outside the bounds of the canvas
    
    if(this.y <= boardOutline.top) 
    {
        this.y = boardOutline.top;
        console.log("top: " + boardOutline.top);
        this.isOnSide = true;
    }
    if(this.y >= boardOutline.bottom)
    {
        this.y = boardOutline.bottom;
        console.log("bot: " + boardOutline.bottom);
        this.isOnSide = true;
    }
    if(this.x <= boardOutline.left)
    {
        this.x = boardOutline.left;
        console.log("left: " + boardOutline.left);
        this.isOnSide = true;
    }
    if(this.x >= boardOutline.right)
    {
        this.x = boardOutline.right;
        console.log("right: " + boardOutline.right);
        this.isOnSide = true;
    }
    
    // If we're not on a side, then we're in the middle of making a shape.
    if(!this.isOnSide)
    {
        // Create our current shape if we don't yet have one
        if(!this.currentShape)
        {
            this.currentShape = new Shape();
            // Put this shape into the game's shapes array
            shapes.push(this.currentShape);
            this.currentShape.strokeColor = '#0f6d6c';
            
            // Add the wall we were just on to the shape to be its starting point
            // so that shapes don't look like they're disconnected from the wall
            this.currentShape.addPoint(this.lastPoint);
        }
        
        
        // Add a point to our shape
        this.currentShape.addPoint(new Point(this.x, this.y)); 
           
    }
    // Otherwise, if we are on a side, then we've finished our last shape
    else
    {
        if(this.currentShape)
        {
            
            this.closeOutShape(this.currentShape);
            
        }
    }
    
    // Keep this point because we might need it the next time we press a button to know where we just were
    this.lastPoint = new Point(this.x, this.y);
    
}


Cursor.prototype.closeOutShape = function(shape)
{

    // Add the final point to our shape
    this.currentShape.addPoint(new Point(this.x, this.y)); 

    // Turn the outline of the shape white, and turn the fill color of the shape to whatever the outline used to be
    this.currentShape.fillColor = this.currentShape.strokeColor;
    this.currentShape.strokeColor = '#fff';
    
    // It's now a closed shape
    this.currentShape.isClosed = true;
    
    // Lose our reference to the old current shape because we're done with it now
    this.currentShape = null;
}

