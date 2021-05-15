var PLAY = 1;
var END = 0;
var gameState;
var backgroundImg1, backgroundImg2, ground;
var lives = 3, score = 0; 
var virus1, virus2, virus3, virus4, virus5;
var girl, girlImg;
var shield, shieldImg;
var support, supportImg, supportGroup;

function preload(){
 backgroundImg1 = loadImage("Images/bg.png");
 backgroundImg2 = loadImage("Images/bgnight.png");
 virus1 = loadImage("Images/black.png");
 virus2 = loadImage("Images/pink.png");
 virus3 = loadImage("Images/grey.png");
 virus4 = loadImage("Images/green.png");
 virus5 = loadImage("Images/blue.png");
 girly = loadAnimation("Images/s1.png","Images/s2.png","Images/s3.png","Images/s4.png","Images/s5.png","Images/s6.png","Images/s7.png","Images/s8.png");
 girlImg = loadAnimation("Images/g1.png","Images/g2.png","Images/g3.png","Images/g4.png","Images/g5.png","Images/g6.png","Images/g7.png","Images/g8.png");
 shieldImg = loadImage("Images/shield.png");
 dropImg = loadImage("Images/drop1.png")
 drop2Img = loadImage("Images/drop2.png")
 supportImg = loadImage("Images/support.png")
}

function setup(){
  createCanvas(displayWidth - (displayWidth/5), displayHeight/2);

  ground = createSprite(displayWidth/2 + 300 , displayHeight/4, 20, 20);
  ground.addImage("back", backgroundImg1);
  ground.debug = true;

  girl = createSprite(displayWidth/2 - 400, displayHeight/2 - 130, 20, 20);
  girl.addAnimation("standing", girly);
  girl.addAnimation("running", girlImg);
  girl.setCollider("circle", 0, 0, 40);
  girl.debug = true;

  shield = createSprite(girl.x, girl.y, 100);
  shield.addAnimation("protect", shieldImg);
  shield.setCollider("circle", 0, 0, 80);
  shield.debug = true;
  
  invisibleGround = createSprite(girl.x, displayHeight/2 -90 ,400,10);
  //invisibleGround.visible = false;
  invisibleGround.debug = true;

  virusGroup = new Group();
  supportGroup = new Group();
}
   
function draw(){
  background("black");

  if(gameState != PLAY && gameState != END){
    fill("red");
    textSize(22);
    text("Press space to start", displayWidth/3, 50);

    if(keyDown("space")){
      gameState = PLAY;
      girl.changeAnimation("running", girlImg);    
    }
  }

  if(gameState === PLAY){
    ground.velocityX = -(2 + Math.round(score/100));

    if(ground.x<displayWidth/16 - 100){
      ground.x = ground.x + ground.width/2;
    }

    if(keyDown("space") && girl.y>displayHeight/8){
      girl.velocityY = -10;
    }

    girl.velocityY = girl.velocityY + 0.8;

    score = score + Math.round(getFrameRate()/60);
    
    virusGroup.setRotationSpeedEach(5);
    spawnVirus();
    spawnSupport();

    if(keyDown('a')){
          
    }

    for (var i = 0; i < virusGroup.length; i++) {
      if (virusGroup.get(i).isTouching(shield)) {
        virusGroup.get(i).destroy();
        lives = lives - 1;
      }
    }    

  }

  girl.collide(invisibleGround);
  drawSprites();
  text("Score: " + score, girl.x, displayHeight/2)
  text("Lives: " + lives, girl.x + 100, displayHeight/2)
}

function spawnVirus(){
  if (frameCount % 320 === 0) {
    var rand = Math.round(random((displayHeight/4) - 100 , (displayHeight/4) + 100))
    var virus = createSprite(displayWidth, rand, 10, 10);
    virus.scale = 0.5;
    virus.velocityX = -3;
    virus.debug = true;
    virus.setCollider("circle", 0, 0, 30)
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: virus.addImage(virus1);
              break;
      case 2: virus.addImage(virus2);
              break;
      case 3: virus.addImage(virus3);
              break;
      case 4: virus.addImage(virus4);
              break;
      case 5: virus.addImage(virus5);
              break;
      default: break;
    }

    virus.lifetime = displayWidth/3;
    virusGroup.add(virus);
  } 
}

function spawnSupport(){
  if(frameCount % 600 === 0) {
    var support = createSprite(displayWidth, (displayHeight/4) + 80, 10, 10);
    support.addImage("supp", supportImg);
    support.scale = 0.2;
    support.velocityX = -3;
    support.debug = true;
    support.setCollider("circle", 0, 0, 30);
    support.lifetime = displayWidth/3;
    supportGroup.add(support);
  } 
}

/*  if(keyWentDown("space")){
      jumpSound.play();
    }
     camera.position.x = trex.x + 500;
      if (score>0 && score%100 === 0){
        checkSound.play();
      }

      if(obstaclesGroup.isTouching(trex)){
        dieSound.play();
        gameState = END;
      }  */