let framesPerSecond = 60
let gameStartDelayTimeInSeconds = 0//8
let copDelayTimeInSeconds = 15
let framesToWaitBeforeAddingCop = framesPerSecond * copDelayTimeInSeconds
let funk
let mouseMoved = false // wtf do i have to do this?
let crowdCheer
let cops = []
let topOfField
let score
let gameOver

function preload() {
  loadSounds()
}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight)
  topOfField = height/6
  cnv.mouseMoved(triggerSounds)
  loadImages()
  mascot = new Mascot(width/2, height/2)
  butt = new Butt(width - 50, height - 50)
  score = 0
  gameOver = false
}

function draw() {
  if (!gameHasStarted()) {
    showInstructions()
  } else if (gameOver) {
    showGameOver()
  } else if (!gameOver) {
    handleTackle()
    handleArrest()
    funk.stop()
    addCop()
    drawField()
    image(crowdImage, 0, 0, width, topOfField)
    drawScoreBoard(score)
    mascot.display()
    mascot.update(butt.position)
    mascot.edges()
    butt.display()
    butt.update()
    butt.edges()
  }
  cops.forEach(cop => {
    cop.display()
    cop.update(butt.position)
    cop.edges()
  })
  streakinText()
}

function handleArrest() {
  cops.forEach(cop => {
    let distanceBetweenCopAndButt = p5.Vector.sub(cop.position, butt.position)
    if (distanceBetweenCopAndButt.mag() < 25) {
      gameOver = true
      cops = []
    }
  })
}

function drawScoreBoard(score) {
  push()
    fill(201)
    stroke(0)
    rect(width-350, 20, 300, 100, 25, 25, 25, 25)
  pop()
  push()
    textFont("VT323")
    textSize(45)
    textStyle(NORMAL)
    scoreText = `Score: ${score}`
    stroke(0)
    fill(0)
    strokeWeight(2)
    text(scoreText, width-330, 40, width)
  pop()
}

function handleTackle() {
  let distanceBetweenButtAndMascot = p5.Vector.sub(mascot.position, butt.position)
  if (distanceBetweenButtAndMascot.mag() < 25) {
    score += 100
    cowBell.play()
  }
}

function addCop() {
  if (frameCount % framesToWaitBeforeAddingCop === 0) {
    cops.push(new Cop(random([0, width]), random(topOfField, height)))
    if (cops.length === 1) {
      copWhistle.loop()
    }
  }
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      butt.velocity = createVector(-3, 0)
      butt.direction = "left"
      break
    case RIGHT_ARROW:
      butt.velocity = createVector(3, 0)
      butt.direction = "right"
      break
    case UP_ARROW:
      butt.velocity = createVector(0, -3)
      break
    case DOWN_ARROW:
      butt.velocity = createVector(0, 3)
      break
  }
}

function triggerSounds() {
  if (!mouseMoved) {

    getAudioContext().resume()
    funk.play()
    crowdCheer.setVolume(0.3)
    crowdCheer.loop(gameStartDelayTimeInSeconds)      
  }
  mouseMoved = true
}

function loadSounds() {
  crowdCheer = loadSound('./assets/crowdCheersTrimmed.mp3')
  funk = loadSound('./assets/funk.mp3')
  copWhistle = loadSound('./assets/cop-whistle.mp3')
  cowBell = loadSound('./assets/cowbell.mp3')
}

function loadImages() {
  leftButtImage = loadImage('./assets/left-butt.png')
  rightButtImage = loadImage('./assets/right-butt.png')
  copImage = loadImage('./assets/cop.png')
  leftMascotImage = loadImage('./assets/left-mascot.png')
  rightMascotImage = loadImage('./assets/right-mascot.png')
  crowdImage = loadImage('./assets/crowd.jpg')
}

function gameHasStarted() {
  return frameCount > (framesPerSecond * gameStartDelayTimeInSeconds)
}
  
function shouldShowCop() {
  return frameCount > (framesPerSecond * copDelayTimeInSeconds)
}

function showInstructions() {
  fill(250, 243, 220)
  rect(0, 0, width, height)
  instructionsText()
}
function showGameOver() {
  fill(250, 243, 220)
  rect(0, 0, width, height)
  gameOverText()
  if (!funk.isPlaying()) {
    funk.loop()
  }
  copWhistle.stop()
  crowdCheer.stop()
}

function gameOverText() {
  push()
  textFont("VT323")
  stroke(0)
  fill(0)
  strokeWeight(2)
  textSize(45)
  textAlign(CENTER, CENTER)
  text("Ouch!", 0, height/4, width)
  text("Creamed by the fuzz!", 0, height/4 + 200, width)
  text(`Score: ${score}`, 0, height/4 + 300, width)
  
  var highScore = getItem('streakinHighScore')
  if (score >= highScore) {
    text(`You got the highest score!`, 0, height/4 + 400, width)
    if (score > highScore) {
      storeItem('streakinHighScore', score)
    }
  } else {
    text(`You didn't beat the high score of ${highScore}`, 0, height/4 + 400, width)
  }
  pop()
}

function instructionsText() {
  push()
  textFont("VT323")
  stroke(0)
  fill(0)
  textSize(45)
  textAlign(CENTER, CENTER)
  text("HOW TO PLAY", 0, height/4, width)
  text("Use the arrow keys to move!", 0, height/4 + 200, width)
  text("Try to tackle the mascot!", 0, height/4 + 300, width)
  text("Don't get caught by the fuzz!", 0, height/4 + 400, width)
  pop()
}

function streakinText() {
  push()
  textFont("Monoton")
  stroke(245, 107, 8)
  fill(255, 219, 88)
  textSize(50)
  textStyle(ITALIC)
  textAlign(CENTER, CENTER)
  if (frameCount % 40 < 15) {
    text("Streakin'!", 0, height/12, width)
  }
  pop()
}

function drawField() {

  // field
  push()
    fill(76, 187, 23) // green
    noStroke()
    rect(0, topOfField, width, height - topOfField)
  pop()

  // baseball diamond
  beginShape()
    noFill()
    stroke(255)
    strokeWeight(4)
    vertex(width / 2, height/5)
    vertex(width/1.05, height/2)
    vertex(width / 2, height/1.05)
    vertex(width/16, height/2)
  endShape(CLOSE)
  
  // bases
  push()
    rectMode(CENTER)
    fill(255)
    rect(width / 2, height/5, 20, 20)
    rect(width/1.05, height/2, 20, 20)
    rect(width / 2, height/1.05, 20, 20)
    rect(width/16, height/2, 20, 20)
  pop()
}