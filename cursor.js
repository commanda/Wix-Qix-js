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
    
    this.lastPoint = new Point(this.pos.x, this.pos.y);
}


// What the Cursor DOES
Cursor.prototype.draw = function(){

    
    // Draw the cursor itself
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    // Draw a diamond
    ctx.beginPath();
    ctx.moveTo(this.pos.x - (this.size/2), this.pos.y);
    ctx.lineTo(this.pos.x, this.pos.y - (this.size/2));
    ctx.lineTo(this.pos.x + (this.size/2), this.pos.y);
    ctx.lineTo(this.pos.x, this.pos.y + (this.size/2));
    ctx.lineTo(this.pos.x - (this.size/2), this.pos.y);
    ctx.stroke();
    ctx.closePath();
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
        
    this.lastPoint = new Point(this.pos.x, this.pos.y);
}