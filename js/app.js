var bugYPos = [60, 143, 226];
var bugSpeed = 300;
var collisionProx = 80;
var Enemy = function() {                            //enemy/bugfunction
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = bugYPos[Math.floor(Math.random() * 3)];
    this.speed = Math.floor((50 + Math.random() * bugSpeed));
}
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
    if (this.x > 550) {
        this.x = -100
        this.y = this.y + 83;
        this.speed = Math.floor(100 + (Math.random() * bugSpeed));
        if (this.y > 226) {
            this.y = 60;
        }
    }

    if (player.y >= this.y - collisionProx && player.y <= this.y + collisionProx) {
        if (player.x >= this.x - collisionProx && player.x <= this.x + collisionProx) {
        player.reset();
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function() {               //player function
  this.x = 200;
  this.y = 400;
  this.image = 'images/char-boy.png';
}
var score=0;
Player.prototype.update = function() {
    if (this.ctlKey === 'left' && this.x > 0){ 
        this.x = this.x - 100;
    } else if (this.ctlKey === 'right' && this.x != 400){
        this.x = this.x + 100;
    } else if (this.ctlKey === 'up'){
        this.y = this.y - 83;
    } else if (this.ctlKey === 'down' && this.y != 400){
        this.y = this.y + 83;
    }
    this.ctlKey = null;
    if (this.y < 60){
        this.reset();   
        score++;
    document.getElementById('score').innerHTML = 'score:'+ score;
    }
}

Player.prototype.render = function() {
 ctx.drawImage(Resources.get(this.image), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
  this.ctlKey = key;
}

Player.prototype.reset = function() {
  player.x = 200;
  player.y = 400;
  }
var allEnemies =[];
for(i=1; i<=5; i++){
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
function endGame(){
    document.getElementById('score').innerHTML = 'GAME OVER!!! Your score is '+ score;
}

var myTime=setInterval(function(){myTimer()},1000);
var x=60;
function myTimer() {
document.getElementById('timer').innerHTML = 'Timer :'+ x;
 if(x==0){
    endGame();
    clearInterval(myTime);
    }
    --x;
}


