// Program name: Bug Eyes
// Developer: Vasu Goel
/* Theme: This is a basic project in which the eyes follow wherever the mouse goes, but 
		do not escape the eye sockets, can be a really cool and yet creepy addition to your page
*/
// Date: 18th November, 2017

const eyeSize = 80;
const eyeBallSize = 50;
function setup() { 
  //fullscreen();
 //createCanvas(500, 500);
  
  var canvas = createCanvas(600, 200);
  canvas.parent('abc');


  left = new eyes(width/2 - 70);
  right = new eyes(width/2 + 70);
} 

function draw() { 
  background(220);
  rectMode(CENTER);
  fill(245, 224, 80);
  rect(width/2, height/2, width, height); 
  noStroke();
  fill(30);
  ellipse(width/2 - 70, height/2, 110, 110);
  fill(245, 224, 80);
  ellipse(width/2 - 70, height/2, 90, 90);
  fill(30);
  ellipse(width/2 + 70, height/2, 110, 110);
  fill(245, 224, 80);
  ellipse(width/2 + 70, height/2, 90, 90);
  rectMode(CENTER);
  fill(30);
  rect(width/2, height/2, 40, 20);
  if (left.click == 1 && left.sizeY > 0) {
    left.sizeY -= 2;
    if (left.sizeY <= 0) left.click = 2;
  }
  if (left.click == 2 && left.sizeY <= eyeBallSize) {
    left.sizeY += 2;
  }
  if (left.click == 2 && left.sizeY >= eyeBallSize) 
  {
    left.sizeY = eyeBallSize;
    left.click = 0;
  }
  if (right.click == 1 && right.sizeY > 0) {
    right.sizeY -= 2;
    if (right.sizeY <= 0) right.click = 2;
  }
  if (right.click == 2 && right.sizeY <= eyeBallSize) {
    right.sizeY += 2;
  }
  if (right.click == 2 && right.sizeY >= eyeBallSize) 
  {
    right.sizeY = eyeBallSize;
    right.click = 0;
  }
  left.drawEyes();
  right.drawEyes();
  let a = atan2(mouseY-height/2, mouseX-width/2);
  let length = dist(mouseX, mouseY, width/2, height/2)/15;
  left.rotate(a, length);
  right.rotate(a, length);
}

function mouseClicked()
{
  left.blink();
  right.blink();
  //console.log("CLicked");
}

let eyes = function(x)
{
  this.click = 0;
  this.x = x;
  this.y = height/2;
  this.xb = x;
  this.yb = height/2;
  this.sizeX = eyeBallSize;
  this.sizeY = eyeBallSize;
  this.drawEyes = function() {
    fill(255);
  	ellipse(this.x, height/2, eyeSize, eyeSize);
    fill(0);
    ellipse(this.xb, this.yb, this.sizeX, this.sizeY);
  }
  this.rotate = function(angle, length)
  {
    //console.log(angle, " ", length);
    if (length < 20) this.xb = this.x + cos(angle)*length;
    else this.xb = this.x + cos(angle)*30;
    if (length < 20) this.yb = this.y + sin(angle)*length;
    else this.yb = this.y + sin(angle)*30;
    if (this.xb > this.x + 30 || this.xb < this.x - 30) this.xb = this.x + cos(angle)*30;
    if (this.yb > this.y + 30 || this.yb < this.y - 30) this.yb = this.y + sin(angle)*30;
  }
  this.blink = function() {
    this.click = 1;
  }
}