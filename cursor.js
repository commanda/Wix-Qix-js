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
    
    // Prevent the cursor from going outside the bounds of the canvas
    
    if(this.y <= boardOutline.top) 
    {
        this.y = boardOutline.top;
        console.log("bo.top: " + boardOutline.top);
    }
    if(this.y >= boardOutline.bottom)
    {
        this.y = boardOutline.bottom;
        console.log("bo.bot: " + boardOutline.bottom);
    }
    if(this.x <= boardOutline.left)
    {
        this.x = boardOutline.left;
        console.log("bo.left: " + boardOutline.left);
    }
    if(this.x >= boardOutline.right)
    {
        this.x = boardOutline.right;
        console.log("bo.right: " + boardOutline.right);
    }
}
