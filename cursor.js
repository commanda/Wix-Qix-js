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
    
    this.lastPoint = new Point(this.x, this.y);
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

    // Work out a proposed next position so we can ask the Game if it's ok to travel there
    var proposed = new Point(this.x, this.y);

    if(isDownPressed)
        proposed.y += MOVE_AMOUNT;
    else if(isUpPressed)
        proposed.y -= MOVE_AMOUNT;        
    else if(isLeftPressed)
        proposed.x -= MOVE_AMOUNT;
    else if(isRightPressed)
        proposed.x += MOVE_AMOUNT;
    
    // If the proposed point and our current point are the same, then we're not moving, 
    // so no need to do anything
    if(proposed.x == this.x && proposed.y == this.y)
    {
        return;
    }
    
    // Find out if it's ok to to travel to this proposed place, and also
    // if we should be closing the shape we're on
    var values = isOkToTravel(new Point(this.x, this.y), proposed);
    var okToTravel = values[0];
    var shouldCloseShape = values[1];
    var isOnSide = values[2];
    
    // It's cool if we go ahead and position the cursor at this proposed location
    if(okToTravel)
    {
        this.x = proposed.x;
        this.y = proposed.y;
    }
    
    
    // Prevent the cursor from going outside the bounds of the canvas
    
    if(this.y <= boardOutline.top) 
    {
        this.y = boardOutline.top;
    }
    if(this.y >= boardOutline.bottom)
    {
        this.y = boardOutline.bottom;
    }
    if(this.x <= boardOutline.left)
    {
        this.x = boardOutline.left;
    }
    if(this.x >= boardOutline.right)
    {
        this.x = boardOutline.right;
    }
    // If we're not on a side, then we're in the middle of making a shape.
    if(!isOnSide)
    {
        // Create our current shape if we don't yet have one
        if(!this.currentShape)
        {
            this.currentShape = new Shape();
            // Put this shape into the game's shapes array
            console.log("pushing shape: "+this.currentShape);
            shapes.push(this.currentShape);
            this.currentShape.strokeColor = '#0f6d6c';
            
            // Add the wall we were just on to the shape to be its starting point
            // so that shapes don't look like they're disconnected from the wall
            this.currentShape.addPoint(this.lastPoint);
        }
        
        
        // Add a point to our shape
        this.currentShape.addPoint(new Point(this.x, this.y)); 
           
    }
    // Otherwise, if we just arrived at a side (we weren't before, and now we are on a side)
    // or if the okToTravel told us that we hit an existing line, 
    // then we've finished our last shape
    if((!this.isOnSide && isOnSide) || shouldCloseShape)
    {
        if(this.currentShape)
        {
            console.log("closing out shape: "+this.currentShape);
            this.closeOutShape(this.currentShape);
        }
    }
    
    // Keep this point because we might need it the next time we press a button to know where we just were
    this.lastPoint = new Point(this.x, this.y);
    this.isOnSide = isOnSide;
    
}


Cursor.prototype.closeOutShape = function(shape)
{

    // Add our current position on the wall to the shape
    this.currentShape.addPoint(new Point(this.x, this.y)); 

    // Turn the outline of the shape white, and turn the fill color of the shape to whatever the outline used to be
    this.currentShape.fillColor = this.currentShape.strokeColor;
    this.currentShape.strokeColor = '#fff';
    
    // It's now a closed shape
    this.currentShape.isClosed = true;
    
    if(this.currentShape)
    {
        console.log("boardOutline.bot: "+ boardOutline.bottom + ", curShape.bottom: "+this.currentShape.bottom);

        console.log("boardOutline.left: "+ boardOutline.left + ", curShape.left: "+this.currentShape.left);
        
    }
    
    // 1-corner case:
    // If it started on one wall and ended on another, it needs to add a few more points
    // in order to not make a triangle, so seek out the wall it started on
    if(this.currentShape.bottom == boardOutline.bottom)
    {
        if(this.currentShape.left == boardOutline.left)
        {
            // Add the lower left corner to the shape
            this.currentShape.addPoint(new Point(boardOutline.left, boardOutline.bottom));
        }
    }
    if(this.currentShape.left == boardOutline.left)
    {
        // This shape started on the left wall
        
        // Where did it end?
        if(this.currentShape.top == boardOutline.top)
        {
            // Add the upper left corner to the shape
            this.currentShape.addPoint(new Point(boardOutline.left, boardOutline.top));
        }
    }
    if(this.currentShape.top == boardOutline.top)
    {
        if(this.currentShape.right == boardOutline.right)
        {
            // Add the upper right corner to the shape
            this.currentShape.addPoint(new Point(boardOutline.right, boardOutline.top));
        }
    }
    if(this.currentShape.right == boardOutline.right)
    {
        if(this.currentShape.bottom == boardOutline.bottom)
        {
            // Add the lower right corner to the shape
            this.currentShape.addPoint(new Point(boardOutline.right, boardOutline.bottom));
        }
    }
    
    
    // 2-corner case: cutting across the board
    // If the line goes from bottom to top (or top to bottom)
    // decide which half of the screen we're going to make into our shape
    // (the lesser half)
    if(this.currentShape.top == boardOutline.top 
        &&
        this.currentShape.bottom == boardOutline.bottom)
    {
        var middleX = (boardOutline.right + boardOutline.left)/2;
        
        // Get the average x-value of the start and the end points
        var x1 = this.currentShape.points[0].x;
        var x2 = this.currentShape.points[this.currentShape.points.length-1].x;
        var avg = (x1 + x2)/2;
        
        
        
        // Find out where our x is and whether it's to the right of middle, or to the left
        if(this.currentShape.right <= middleX || avg <= middleX)
        {
            // Find out if we went from top to bottom, or bottom to top
            if(this.y == boardOutline.top)
            {
                // Bottom to top
                // Add the upper-left and lower-left corners to our shape
                this.currentShape.addPoint(new Point(boardOutline.left, boardOutline.top));
                this.currentShape.addPoint(new Point(boardOutline.left, boardOutline.bottom));
            }
            else
            {
                // Top to bottom
                this.currentShape.addPoint(new Point(boardOutline.left, boardOutline.bottom));
                this.currentShape.addPoint(new Point(boardOutline.left, boardOutline.top));
            }
        }
        else if(this.currentShape.left > middleX || avg > middleX)
        {
            // We cut across on the right hand side, so add the upper right and upper left corners
            // Find out if we went from top to bottom, or bottom to top
            if(this.y == boardOutline.top)
            {
                // Bottom to top
                // Add the upper-right and lower-right corners to our shape
                this.currentShape.addPoint(new Point(boardOutline.right, boardOutline.top));
                this.currentShape.addPoint(new Point(boardOutline.right, boardOutline.bottom));
            }
            else
            {
                // Top to bottom
                this.currentShape.addPoint(new Point(boardOutline.right, boardOutline.bottom));
                this.currentShape.addPoint(new Point(boardOutline.right, boardOutline.top));
            }
        
        }
        
        
        
        
    }
    else if(this.currentShape.left == boardOutline.left 
        &&
        this.currentShape.right == boardOutline.right)
    {
        var middleY = (boardOutline.bottom - boardOutline.top)/2;
        
        // Get the average y-value of the start and the end points
        var y1 = this.currentShape.points[0].y;
        var y2 = this.currentShape.points[this.currentShape.points.length-1].y;
        var avg = (y1 + y2)/2;
        
        // Find out where our y is and whether it's above or below the middle
        if(this.currentShape.bottom <= middleY || avg <= middleY)
        {
            // Find out if we went from left to right or right to left
            if(this.x == boardOutline.left)
            {
                // Right to left
                // Add the upper-left and upper right corners to our shape
                this.currentShape.addPoint(new Point(boardOutline.left, boardOutline.top));
                this.currentShape.addPoint(new Point(boardOutline.right, boardOutline.top));
            }
            else
            {
                // Left to right
                this.currentShape.addPoint(new Point(boardOutline.right, boardOutline.top));
                this.currentShape.addPoint(new Point(boardOutline.left, boardOutline.top));
            }
        }
        if(this.currentShape.top > middleY || avg > middleY)
        {
            // We cut across on the bottom, so add the upper right and upper left corners
            // Find out if we went from top to bottom, or bottom to top
            if(this.x == boardOutline.left)
            {
                // Right to left
                // Add the bottom left and bottom right corners
                this.currentShape.addPoint(new Point(boardOutline.left, boardOutline.bottom));
                this.currentShape.addPoint(new Point(boardOutline.right, boardOutline.bottom));
            }
            else
            {
                // Left to right
                this.currentShape.addPoint(new Point(boardOutline.right, boardOutline.bottom));
                this.currentShape.addPoint(new Point(boardOutline.left, boardOutline.bottom));
            }
        
        }
    }
    
    // Lose our reference to the old current shape because we're done with it now
    this.currentShape = null;
}

