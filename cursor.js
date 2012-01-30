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
        
        
        
    // Add this chunk of movement as a line into the back buffer
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(this.lastPos.x, this.lastPos.y);
    ctx.lineTo(this.pos.x, this.pos.y);
    ctx.stroke();
    ctx.closePath();

    
    this.lastPos = new Point(this.pos.x, this.pos.y);
}