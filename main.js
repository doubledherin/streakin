// constants
const copDelayTimeInSeconds = 15
const newCopDelay = 60 * copDelayTimeInSeconds
const CLICK_TO_BEGIN = "CLICK_TO_BEGIN"
const INSTRUCTIONS = "INSTRUCTIONS"
const PLAYING = "PLAYING"
const GAME_OVER = "GAME_OVER"

// initial state
let state = CLICK_TO_BEGIN
let score = 0
let cops = []
let buttStartPosition
let mascotStartPosition

function preload() {
  loadSounds()
}

function setup() {
  loadImages()
  createCanvas(windowWidth, windowHeight)
  mascotStartPosition = createVector(width/2, height/2)
  buttStartPosition = createVector(width-50, height-50)
  mascot = new Mascot(mascotStartPosition.x, mascotStartPosition.y)
  butt = new Butt(buttStartPosition.x, buttStartPosition.y)
  topOfField = windowHeight/6
}
function mousePressed() {
  console.log("PRESSED")
  userStartAudio()
  if (state === CLICK_TO_BEGIN) {
    state = INSTRUCTIONS
  }
}

function draw() {
  handleSounds()
  switch (state) {
    case CLICK_TO_BEGIN:
      showClickInstructions()
      break
    case INSTRUCTIONS:
      showInstructions()
      break
    case PLAYING:
      drawField()
      drawCrowd()
      drawScoreBoard(score)
      drawMascot(butt)
      drawButt()
      drawCops()
      handleTackles()
      handleArrest()
      break
    case GAME_OVER:
      showGameOver()
      break
    default:
      showInstructions()
      break
  }
  streakinText()
}
function drawMascot(butt) {
  mascot.display()
  mascot.update(butt.position)
  mascot.edges()
}

function drawButt() {
  butt.display()
  butt.update()
  butt.edges()
}

function drawCops() {
  addCop()
  cops.forEach(cop => {
    cop.display()
    cop.update(butt.position)
    cop.edges()
  })
}

function handleArrest() {
  cops.forEach(cop => {
    let distanceBetweenCopAndButt = p5.Vector.sub(cop.position, butt.position)
    if (distanceBetweenCopAndButt.mag() < 25) {
      state = GAME_OVER
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

function handleTackles() {
  let distanceBetweenButtAndMascot = p5.Vector.sub(mascot.position, butt.position)
  if (distanceBetweenButtAndMascot.mag() < 25) {
    score += 100
    cowBell.play()
  }
}

function addCop() {
  if (frameCount % newCopDelay === 0) {
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
    case 66: // 'b' or 'B'
      state = PLAYING
      break
    case 80: // 'p' or 'P'
      if (state == GAME_OVER) {
        score = 0
        cops = []
        butt.position = buttStartPosition
        butt.velocity = createVector(0,0)
        mascot.position = mascotStartPosition
        mascot.velocity = createVector(0,0)
        state = PLAYING
      }
      break
  }
}

function handleSounds() {
  switch (state) {
    case INSTRUCTIONS:
    case GAME_OVER:
      !funk.isPlaying() && funk.loop()
      crowdCheer.stop()
      copWhistle.stop()
      break
    case PLAYING: 
      !crowdCheer.isPlaying() && crowdCheer.loop()
      cops.length > 0 && !copWhistle.isPlaying() && copWhistle.loop()
      funk.stop()
      break    
  }
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

function showInstructions() {
  fill(250, 243, 220)
  rect(0, 0, width, height)
  instructionsText()
}

function showClickInstructions() {
  fill(250, 243, 220)
  rect(0, 0, width, height)
  clickInstructionsText()
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
  text("Creamed by the fuzz!", 0, height/4 + 100, width)
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
  text("Press 'P' to play again!", width/2, height/5 +600)
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
  text("Press 'b' to begin!", 0, height/4 + 500, width)
  pop()
}

function clickInstructionsText() {
  push()
  textFont("VT323")
  stroke(0)
  fill(0)
  textSize(45)
  textAlign(CENTER, CENTER)
  text("CLICK THE SCREEN!", 0, height/4, width)
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
    text("Streakin'", 0, height/12, width)
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

function drawCrowd() {
  image(crowdImage, 0, 0, width, topOfField)
}