function Shape () {
    this.points = new Array();
    this.strokeColor = '#fff';
    this.fillColor = '#000';
    this.isClosed = false;
}

Shape.prototype.draw = function() {
    // Traverse the points array and stroke the line of them
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    var i = 1;
    for(i = 1; i < this.points.length; i++)
    {
        ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    // If this is a closed shape, add a line from the final point in the array back to the starting point
    if(this.isClosed)
    {
        ctx.lineTo(this.points[0].x, this.points[0].y);
    }
    
    ctx.stroke();
    ctx.closePath();
}