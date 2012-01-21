function Shape () {
    this.points = new Array();
    this.strokeColor = '#fff';
    this.fillColor = '#000';
    this.isClosed = false;
    
    // Read-only for outsiders (by convention, not enforced, i guess)
    this.top = this.bottom = this.left = this.right = 0;
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

Shape.prototype.addPoint = function(point) {
    
    // If there aren't any points already in this shape, then this new point becomes the top, bottom, left, and right of the shape.
    if(this.points.length == 0)
    {
        this.top = this.bottom = point.y;
        this.left = this.right = point.x;
    }
    
    this.points.push(point);
    console.log("pushing point to make " + this.points);
    
    if(point.x < this.left){ this.left = point.x; }
    if(point.x > this.right){ this.right = point.x; }
    if(point.y < this.top){ this.top = point.y; }
    if(point.y > this.bottom){ this.bottom = point.y; }
    
}
