function Point(x, y)
{
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function() 
{
    return "(" + this.x + ", " + this.y + ")";
}

Point.prototype.floor = function() 
{
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
}

var multiply = function(pointA, scalar)
{
    return new Point(pointA.x * scalar, pointB.y * scalar);
}

var add = function(pointA, pointB)
{
    return new Point(pointA.x + pointB.x, pointA.y + pointB.y);
}

var interpolate = function(pointA, pointB, percent) 
{
    return add(multiply(pointA, 1.0 - percent, multiply(pointB, percent)));
}

var distance = function(pointA, pointB)
{
    var xsquared = (pointA.x-pointB.x) * (pointA.x-pointB.x);
    var ysquared = (pointA.y-pointB.y) * (pointA.y-pointB.y);
    return Math.sqrt(xsquared + ysquared);
}