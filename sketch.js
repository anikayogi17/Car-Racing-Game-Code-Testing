var car1, car1Img
var car2, car2Img
var gameOver, gameOverImg
var bg, track
var heart1, heart2, heart3, heartImg
var opponentCarGroup
var powerup, powerupIMG
var powerUpGroup
var score = 0
var PLAY = 1
var END = 0
var gameState = 1

function preload(){
  car1Img = loadImage("car1.png")
  car2Img = loadImage("car2.png")
  bg = loadImage("track2.png")
  gameOverImg = loadImage("GameOver2.png")
  heartImg = loadImage("heartPowerupIMG.png")
  powerupIMG = loadImage("powerUp.png")
  
}
function setup() {
  
  createCanvas(displayWidth, displayHeight);
  // Moving background
  track=createSprite(displayWidth/2, displayHeight);
  track.addImage(bg);
  track.scale = 2.2
  track.velocityY = 4;

  car1 = createSprite(displayWidth/2 - 120, displayHeight- 200, 50, 50);
  car1.addImage("car1Img", car1Img)
  car1.scale = 0.25
  
  heart1 = createSprite(displayWidth/2 + 100, displayHeight - 850,35,35)
  heart1.addImage("heartImg", heartImg)
  heart1.scale = 0.15
  heart1.visible = true
 

  heart2 = createSprite(displayWidth/2 + 150, displayHeight - 850,35,35)
  heart2.addImage("heartImg", heartImg)
  heart2.scale = 0.15
  heart2.visible = true

  heart3 = createSprite(displayWidth/2 + 200, displayHeight - 850,35,35)
  heart3.addImage("heartImg", heartImg)
  heart3.scale = 0.15
  heart3.visible = true
  
  opponentCarGroup = new Group()
  powerUpGroup = new Group()



  

}

function draw() {
  background("white"); 
  opponentCar();
  spawnPowerUp()


  //image(bg, 0,-displayHeight*4,displayWidth, displayHeight*5);
  if(track.y > 400){
    track.y = 400/2
  }

  if(keyDown(LEFT_ARROW)){
    car1.x -= 5
  }
  if(keyDown(RIGHT_ARROW)){
    car1.x +=5
  }

  if(opponentCarGroup.isTouching(car1)){
    opponentCarGroup.destroyEach()
    score -= 50
    //heart1.remove()
    heart1.visible = false
    //heart1.style.visibility = "hidden"
    //gameState = END
    if(opponentCarGroup.isTouching(car1)){
      heart2.visible = false
    }
  }

  //CODE TO CHECK FOR REMOVAL OF HEARTS
  //if(heart1.visible = false && opponentCarGroup.isTouching(car1)){
  //  heart2.visible = false
  //}
  //if(heart1.remove() && heart2.remove() && opponentCarGroup.isTouching(car1)){
    //heart3.remove()
    //gameState = END
  //}
  
  if(powerUpGroup.isTouching(car1)){
    powerUpGroup.destroyEach()
    score += 100
    track.velocityY += 0.5
    car2.velocityY += 2
  }
  //if(opponentCarGroup.isTouching(car1) && score < 50){
  //  gameState = END
  //}

  if(gameState === END){
    gameOver = createSprite(displayWidth/2, displayHeight/2, 100,100)
    gameOver.addImage("gameOver", gameOverImg)
    gameOver.scale = 0.5
    car1.x = 100
    car1.y = 750
    opponentCarGroup.destroyEach();
    powerUpGroup.destroyEach();
    track.velocityY = 0

    textSize(20)
    fill("white")
    text("Press Up Arrow to Restart the game!",displayWidth/2, displayHeight/3)


  }
  
  if(keyDown("UP_ARROW")){
    reset()
  }

  drawSprites();
  textSize(20)
  fill("white")
  text("Score: " + score, 50,50)
}

function opponentCar(){
  if(frameCount % 220 === 0){
    score += 50
    car2 = createSprite(random(displayWidth-300, displayWidth-600), random(100,800), 50,50)
    car2.addImage("car2Img", car2Img)
    car2.scale = 0.25
    car2.velocityY = 2
    opponentCarGroup.add(car2)
  }

}

function spawnPowerUp(){
  if(frameCount % 255 === 0){
    powerup = createSprite(random(displayWidth-300, displayWidth-600), random(100,800), 50,50)
    powerup.addImage("powerUp", powerupIMG)
    powerup.scale = 0.15
    powerup.velocityY = 1
    powerUpGroup.add(powerup)
  }
}

function reset(){
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    track.velocityY = 4
}
}