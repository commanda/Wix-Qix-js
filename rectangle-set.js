function RectangleSet(){
    this.rectangles = new Array();
}

RectangleSet.prototype.addRectangle = function(rect)
{
    this.rectangles.push(rect);
}

RectangleSet.prototype.getArea = function()
{
    
    var sum = 0;
    for(var i = 0; i < this.rectangles.length; i++)
    {
        sum += this.rectangles[i].getArea();
    }
    
    return sum;
}

///////////////////////////////////////
function Rectangle(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Rectangle.prototype.getArea = function(){
    return this.w * this.h;
}

