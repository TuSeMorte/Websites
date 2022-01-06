var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}
let maxRadius = 40;

var colorArray = [
    "#FF791C",
    "#EB0A02",
    "#E92EFF",
    "#451EE8",
    "#218FFF"
];
var circleArray = [];
window.addEventListener('mousemove',
    function(event){
        
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse);
});

window.addEventListener('resize',
    function(event){
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        init();
});

window.addEventListener('touchmove',
    function(event){
        
        mouse.x = event.touches[0].pageX;
        mouse.y = event.touches[0].pageY;
        console.log(mouse);
});


function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    //RandomColor code
    //this.color = '#'+Math.random().toString(16).substr(-6);
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function (){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //c.strokeStyle = this.color;
        //c.stroke();
        c.fillStyle = this.color;

        c.fill();
    };
    this.update = function (){
        if(this.x + this.radius > innerWidth || this.x - this.radius  <  0){
            this.dx = -this.dx;
        } 
        
        if(this.y + this.radius > innerHeight || this.y - this.radius  <  0){
            this.dy = -this.dy;
        } 
        this.x += this.dx;
        this.y += this.dy;
        
        // interaction mouse
        if(mouse.x - this.x < 50 && mouse.x -this.x > -50
          && mouse.y - this.y < 50 && mouse.y - this.y >-50) {
            if (this.radius < maxRadius) {
                this.radius +=1;
            }
        } else if (this.radius > this.minRadius){
            this.radius -=1;
        }
        
        this.draw();
    }
}
   

console.log(circleArray)

function init(){
    circleArray = [];
    for (let i = 0; i < 800 ; i++){
        var radius = Math.random() * 3 + 1,
            x = Math.random() * (innerWidth - radius * 2) + radius,
            y = Math.random() * (innerHeight - radius * 2)+ radius,
            dx = (Math.random() - 0.5),
            dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x,y,dx,dy,radius));
    }
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for ( let j = 0; j < circleArray.length; j++){
        circleArray[j].update();
    }
    
    
}
init();
animate();


    //c.fillStyle = '#'+Math.random().toString(16).substr(-6);;
    //c.fill();

