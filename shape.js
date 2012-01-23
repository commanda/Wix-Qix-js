function Shape () {
    this.points = new Array();
    this.strokeColor = '#fff';
    this.fillColor = null;
    this.isClosed = false;
    
    // Read-only for outsiders (by convention, not enforced, i guess)
    this.top = this.bottom = this.left = this.right = 0;
}

Shape.prototype.draw = function() {
    // Traverse the points array and stroke the line of them
    ctx.strokeStyle = this.strokeColor;

    // Turn on the fill color only if it's something other than null
    if(this.fillColor)
    {
        ctx.fillStyle = this.fillColor;
    }
    
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
    
    if(this.fillColor)
    {
        ctx.fill();
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
    
    if(point.x < this.left){ this.left = point.x; }
    if(point.x > this.right){ this.right = point.x; }
    if(point.y < this.top){ this.top = point.y; }
    if(point.y > this.bottom){ this.bottom = point.y; }
    
}

Shape.prototype.intersectsShape = function(other) {
    // This just returns true if the bounding box for this shape intersects the bounding box
    // of the other shape. Not getting tricky here.
    console.log("----------------------------------");
    if(this.left > other.right) { console.log("this.left > other.right" + this.left +", "+ other.right);}
    if(this.right < other.left) {  console.log("this.right < other.left" + this.right +", "+ other.left);}
    if(this.top > other.bottom) {  console.log("this.top > other.bottom" + this.top +", "+ other.bottom);}
     //   || this.bottom < other.top)
     
    if(this.bottom < other.top) {  console.log("this.bottom < other.top" + this.bottom +", "+ other.top);}
    
    
    
    if(    this.left > other.right
        || this.right < other.left
        || this.top > other.bottom
        || this.bottom < other.top)
    {
        console.log("they dont intersect");
        return false;    
    }
    console.log("they do intersect");
    return true;
}


Shape.prototype.toString = function() {
    return this.points.toString();
}
