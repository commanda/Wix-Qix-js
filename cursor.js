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
    this.pos = new Point(30, 30);
    
    this.lastPos = new Point(this.pos.x, this.pos.y);
}


// What the Cursor DOES
Cursor.prototype.draw = function(){

    
    // Draw the cursor itself
    ctx2.fillStyle = this.color;
    ctx2.strokeStyle = this.color;
    ctx2.lineWidth = 3;
    // Draw a diamond
    ctx2.beginPath();
    ctx2.moveTo(this.pos.x - (this.size/2), this.pos.y);
    ctx2.lineTo(this.pos.x, this.pos.y - (this.size/2));
    ctx2.lineTo(this.pos.x + (this.size/2), this.pos.y);
    ctx2.lineTo(this.pos.x, this.pos.y + (this.size/2));
    ctx2.lineTo(this.pos.x - (this.size/2), this.pos.y);
    ctx2.stroke();
    ctx2.closePath();
}


var isVertical = function(pointA, pointB)
{
    if(pointA.x == pointB.x)
        return true;
    return false;
}
var isHorizontal = function(pointA, pointB)
{
    return !isVertical(pointA, pointB);
}

Cursor.prototype.tick = function()
{
    
    // Move if there's a key being pressed currently
    if(isLeftPressed)
        this.pos.x -= MOVE_AMOUNT;
    else if(isRightPressed)
        this.pos.x += MOVE_AMOUNT;
    else if(isUpPressed)
        this.pos.y -= MOVE_AMOUNT;
    else if(isDownPressed)
        this.pos.y += MOVE_AMOUNT;

    // If we haven't moved, no need to do anything else
    if(this.pos.x == this.lastPos.x && this.pos.y == this.lastPos.y)
    {
        return;
    }

    // Find out if we just hit or crossed an existing line
    // Save out the ctx into our buffer for reference in the next tick
    buffer = ctx.getImageData(0, 0, screenWidth, screenHeight);
    pix = buffer.data;
    
    
    var hitLine = false;
    
    // Check the pix array for any pixels that are white between our last pos and our current pos
    if(isVertical(this.lastPos, this.pos))
    {
        // going up?
        if(this.lastPos.y < this.pos.y)
        {

        }
        else
        {
            for(var y = this.lastPos.y; y < this.pos.y; y++)
            {
                var index = (screenWidth * 4 * this.lastPos.x) + (this.lastPos.y + y) * 4;
                var red = pix[index];
                var green = pix[index + 1];
                var blue = pix[index + 2];
                var alpha = pix[index + 3];
                
                // Just for debug, paint these pixels green
                pix[index] = 0;
                pix[index+1] = 255;
                pix[index+2] = 0;
                pix[index+3] = 255;
                
                if(red == 255 && green == 255 && blue == 255 && alpha == 255)
                {
                    hitLine = true;
                    break;
                }
            }
        }
//         var red0 = pix[(screenWidth * 4 * this.lastPos.x) + this.lastPos.y * 4];
//         var red1 = pix[(screenWidth * 4 * this.lastPos.x) + (this.lastPos.y + 1) * 4];
//         var red2 = pix[(screenWidth * 4 * this.lastPos.x) + (this.lastPos.y + 2) * 4];
//         var red3 = pix[(screenWidth * 4 * this.lastPos.x) + (this.lastPos.y + 3) * 4];
    }
    else 
    {
    
    }

    // Add this chunk of movement as a line into the back buffer
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.lineCap = "square";
    ctx.beginPath();
    ctx.moveTo(this.lastPos.x, this.lastPos.y);
    ctx.lineTo(this.pos.x, this.pos.y);
    ctx.stroke();
    ctx.closePath();


    
    this.lastPos = new Point(this.pos.x, this.pos.y);
}