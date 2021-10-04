var oggy, oggyImg;
var bg, bgImg;
var play=1;
var end=0;
var gameState=play;
var ground, ground1;
var obstacle, obstacleImg;
var coin, coinImg;
var obstacleGroup;
var coinGroup;
var enemy, enemyImg;
var coinScore=0;
var restart, restartImg;
var gameEnd, gameEndImg;
var sound;

function preload() {
 oggyImg=loadImage("sprites/oggy.png");
 bgImg=loadImage("sprites/bg.jpg");
 obstacleImg=loadImage("sprites/obstacle.png")
 coinImg=loadImage("sprites/coin.png")
 enemyImg=loadImage("sprites/game.png")
 restartImg=loadImage("sprites/restart.png")
 gameEndImg=loadImage("sprites/gameOver.png")

  

}

function setup() {
 createCanvas(800,700);

  bg=createSprite(600,350);
  bg.addImage(bgImg);
  bg.scale=0.6;
  
  oggy=createSprite(90,600,20,20);
  oggy.addImage(oggyImg);
  oggy.scale=0.5;

  enemy=createSprite(700,200,20,20);
  enemy.addImage(enemyImg);
  enemy.scale=0.3;
  
  ground1=createSprite(700,265,180,5);
  ground1.shapeColor="red"
  
  ground1.visible=true;

  ground=createSprite(600,696,1200,5);
  ground.visible=false;

  restart=createSprite(400,230,10,15);
  restart.addImage(restartImg);
  restart.visible=false;

  gameEnd=createSprite(400,350,10,15);
  gameEnd.addImage(gameEndImg);
  gameEnd.visible=false;

  oggy.setCollider("rectangle",0,0,100,oggy.height)
  oggy.debug=false;

 
  
  obstacleGroup=createGroup()
  coinGroup=createGroup()
}

function draw() {
  background("white");  

 if(gameState===play){
   bg.velocityX=-4;
   
   if(bg.x<0){
     bg.x=bg.width/4
 }

 console.log(oggy.y)

if(keyDown("space")&& oggy.y>=400){
  oggy.velocityY=-12;
}



spawnObstacle();
 spawnCoin();

if(coinGroup.isTouching(oggy)){
  coinGroup.destroyEach();
  coinScore=coinScore+10;


  }

  if(obstacleGroup.isTouching(oggy)){
    obstacleGroup.destroyEach();
    coinGroup.destroyEach();
    bg.velocityX=0;
    gameState=end;
  }
 }



 if(gameState===end){

  gameEnd.visible=true;
  restart.visible=true;

  if(mousePressedOver(restart)){
    reset();
  }
 }
 
 oggy.velocityY=oggy.velocityY+0.8
oggy.collide(ground)

  drawSprites();

  fill("black")
  textSize(30)
  text("Coins:"+coinScore,100,60)
}

function  spawnObstacle(){
if(frameCount%150===0){
var obstacle=createSprite(900,640,20,20)
obstacle.debug=false;
obstacle.velocityX=-7-coinScore/150;
obstacle.setCollider("circle",0,0,100)
var rand=Math.round(random(1,2));
switch(rand) {
  case 1: obstacle.addImage(obstacleImg);
          break;
  case 2: obstacle.addImage(obstacleImg);
          break;

  default: break;

}

obstacle.scale=0.5
obstacle.lifetime=180

obstacleGroup.add(obstacle);
}
}

function spawnCoin(){
  
if(frameCount%190===0){
  var coin=createSprite(900,430,20,20)
  coin.debug=false;
  coin.velocityX=-8-coinScore/100;
  coin.setCollider("circle",0,0,100)
  
  var rand1=Math.round(random(1,2));
  switch(rand1) {
    case 1: coin.addImage(coinImg);
            break;
    case 2: coin.addImage(coinImg);
            break;
  
    default: break;
  
  }
  coin.lifetime=180
  coin.scale=0.5
  coinGroup.add(coin);
}

}

function reset(){
  gameState=play;
  coinScore=0;
  gameEnd.visible=false;
  restart.visible=false;
}