var mario , marioJump, marioRun ;
var marioSong , marioJumpSound , gameOverSound ,gameOver , gameOverImage ;
var plant , plantsImage;
var enemies , enemyImage ;
var coins , coinsImage , coinsSound;
var walls , wallsImage;
var backGround, backgroundImage ;
var invisibleGround1 , invisibleGround2;
var coinsGroup, plantsGroup , enemysGroup;
var score = 0
var gameState = 1
var PLAY = 1
var END = 0
var highScore = 0
var retry , retryImage;

function preload(){
 marioRun = loadAnimation("m1.jpg","m2.jpg","m3.jpg","m4.jpg","m5.jpg","m6.jpg","m7.jpg");
 marioJump = loadAnimation("mJ8.png");
 plantsImage = loadAnimation("p1.jpg","p2.jpg","p1.jpg");
 coinsImage = loadAnimation("c1.png","c2.png","c3.png","c4.png","c5.png","c6.png");
  enemyImage = loadAnimation("e1.jpg","e2.jpg","e3.jpg")
  backgroundImage = loadAnimation("mBG.png")
  wallsImage = loadImage("brick.jpg")
  coinsSound = loadSound("coinSound.mp3")
  marioJumpSound = loadSound("jumpSound.wav")
  gameOverSound = loadSound("gameover.wav")
  gameOverImage = loadImage("g1.jpg")
  retryImage = loadImage("r1.jpg")
}

function setup() {
 createCanvas(windowWidth,windowHeight)
  
  
  backGround = createSprite(width/2,height-440,width,600)
  backGround.addAnimation("background",backgroundImage)
  backGround.scale = 5
  backGround.velocityX = -5 
 
 

 
  mario = createSprite(100,height-100,3,3)
  mario.addAnimation("running",marioRun)
//  mario.debug = true
  mario.scale = 1

  
  invisibleGround1 = createSprite(300,height-50,600,20)
  invisibleGround1.velocityX = -5
  invisibleGround1.visible = false
  
    invisibleGround2 = createSprite(300,height-350,600,20)
  invisibleGround2.velocityX = -5
  invisibleGround2.visible = false
  
   gameOver = createSprite(width/2,height/2-80,3,3)
  gameOver.addImage(gameOverImage)
  gameOver.scale = 0.7
  gameOver.visible = false
  
  retry = createSprite(width/2,height/2+50,3,3)
  retry.addImage(retryImage)
  retry.scale = 0.5
  retry.visible = false
  
  coinsGroup = new Group()
  plantsGroup = new Group()
  enemysGroup = new Group()
  
  edges = createEdgeSprites()
  invisibleGround1.collide(mario);
  invisibleGround2.collide(mario);
}

function draw() {
  background("backgroundImage")
  
  if(backGround.x < 500){
    backGround.x = backGround.width + backGround.width/2 + 270
  }
  if(gameState===PLAY){
  if(mario.isTouching(coinsGroup)){
    coinsSound.play()
    score = score+2
    coinsGroup.destroyEach()
  }
   if(keyDown("space")&&mario.y===height-100||touches.length>0){
     marioJumpSound.play()
     mario.changeAnimation("jump",marioJump)
     mario.velocityY= -10
     touches = []
   }
  if(keyWentUp("space")||mario.isTouching(invisibleGround2)){
     mario.changeAnimation("running",marioRun)
     mario.velocityY= 10               
   }
 if(mario.isTouching(enemysGroup)){
   gameState = END
 }   
  }
  else if(gameState===END){
    gameOver.visible = true
    retry.visible = true
    
    coinsGroup.setLifetimeEach(-1)
   // plantsGroup.setLifetimeEach(-1)
    enemysGroup.setLifetimeEach(-1)
    
      coinsGroup.setVelocityXEach(0)
  //  plantsGroup.setVelocityX(0)
    enemysGroup.setVelocityXEach(0)
    
    backGround.velocityX = 0
    
    frameCount = 20
    
    gameOverSound.play()
    
    if(mousePressedOver(retry)||touches.length>0){
      gameState=PLAY
      reset();
      touches = []
    }
    
  }
  if(invisibleGround1.x<0){
    invisibleGround1.x = invisibleGround1.width/2
  }
  
  if(invisibleGround2.x<0){
    invisibleGround2.x = invisibleGround2.width/2
  }
 mario.collide(invisibleGround1) 
  mario.collide(invisibleGround2)
 // mario.velocityY = 10
 coins()
  enemy()
 
 drawSprites()
  
  fill(0)
  stroke(0)
  strokeWeight(1)
  textSize(30)
  text("Score = "+ score,width/2-50,60)
  
   fill(0)
  stroke(0)
  strokeWeight(1)
  textSize(30)
  text("HighScore = "+ highScore,width/2-70,30)
}
function coins(){
  if(frameCount%250===0){
  var coins 
  coins = createSprite(width,height-250,3,3)
  coins.addAnimation("coins", coinsImage)
    coins.scale = 0.5
   coins.velocityX = -(5 + score/2)
    coins.depth = mario.depth +1
    mario.depth = mario.depth + 1
    coinsGroup.add(coins)
    coins.lifetime = 500
 //   coins.debug = true
}
}
function enemy(){
  if(frameCount%300===0){
  var enemy 
  enemy = createSprite(width,height-90,3,3)
 // enemy.debug = true
    enemysGroup.add(enemy)
    var enemy1 = Math.round(random(1,2))
    enemy.depth = mario.depth +1
    mario.depth = mario.depth + 1
  switch(enemy1){
      case 1:
 enemy.addAnimation("plant",plantsImage)
       enemy.scale = 0.39
      enemy.velocityX = -(5 + score/2)
      enemy.depth = mario.depth -1
    mario.depth = mario.depth + 1
      enemy.lifetime = 500
      break;
      case 2:
    enemy.addAnimation("enemy",enemyImage)
      enemy.scale = 0.3
      enemy.velocityX = -(5 + score/2)
      enemy.depth = mario.depth -1
    mario.depth = mario.depth + 1
      enemy.lifetime = 500
        break;
        default:
        break;
    }
}
}
function reset(){
  gameState = PLAY
  
  gameOver.visible = false
  retry.visible = false
  
  if(highScore<score){
    highScore = score
  }
  score = 0;
  enemysGroup.destroyEach()
  coinsGroup.destroyEach()
  
  backGround.velocityX = -5
}
