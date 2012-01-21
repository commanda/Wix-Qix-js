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
}


// What the Cursor DOES
Cursor.prototype.draw = function(){
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    // Draw a diamond
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + (this.size/2), this.y - (this.size/2));
    ctx.lineTo(this.x + this.size, this.y);
    ctx.lineTo(this.x + (this.size/2), this.y + (this.size/2));
    ctx.lineTo(this.x, this.y);
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
    
    // Prevent the cursor from going outside the bounds of the canvas
    if(this.y <= 0)
        this.y = 0;
    if(this.y >= screenHeight - this.size)
        this.y = screenHeight - this.size;
    if(this.x <= 0)
        this.x = 0;
    if(this.x >= screenWidth - this.size)
        this.x = screenWidth - this.size;
}
