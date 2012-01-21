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
}


// What the Cursor DOES
Cursor.prototype.draw = function(){

    // Draw our current shape
    if(this.currentShape)
    {
        this.currentShape.draw();
    }
    
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
            this.currentShape.strokeColor = '#0f6d6c';
        }
        // Add a point to our shape
        this.currentShape.addPoint(new Point(this.x, this.y));    
    }
    // Otherwise, if we are on a side, then we've finished our last shape
    else
    {
        if(this.currentShape)
        {
            // Give our shape to the Game so it can keep track of it and do shit with it
            shapes.push(this.currentShape);
            this.currentShape = null;
        }
    }
    
}
