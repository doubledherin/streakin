let framesPerSecond = 60
let gameStartDelayTimeInSeconds = 0 //8
let copDelayTimeInSeconds = 15
let funk
let crowdCheer
let mouseMoved = false

function preload() {
  // loadSounds()
}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight)
  // cnv.mouseMoved(triggerSounds)
  loadImages()
  mascot = new Mascot(width/2, height/2)
  butt = new Butt(width - 50, height - 50)
  cop = new Cop(0, height-200)
}

function draw() {
  if (!gameHasStarted()) {
    showInstructions()
  } else {
    // funk.stop()
    image(crowdImage, 0, 0, width, height/6);
    drawField()
    mascot.display()
    mascot.update(butt.position)
    mascot.edges()
    butt.display()
    butt.update()
    butt.edges()
  }
  if (mascot.isFleeing) {
    streakinText()
    // crowdCheer.setVolume(1)
  } else {
    // crowdCheer.setVolume(0.3)
  }
  if (shouldShowCop()) {
    cop.display(butt.position)
    cop.update()
    cop.edges()
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
  crowdCheer = loadSound('./assets/crowdCheersTrimmed.mp3');
  funk = loadSound('./assets/funk.mp3');
  copWhistle = loadSound('./assets/cop-whistle.mp3');
}

function loadImages() {
  leftButtImage = loadImage('./assets/left-butt.png');
  rightButtImage = loadImage('./assets/right-butt.png');
  copImage = loadImage('./assets/cop.png');
  leftMascotImage = loadImage('./assets/left-mascot.png');
  rightMascotImage = loadImage('./assets/right-mascot.png');
  crowdImage = loadImage('./assets/crowd.jpg');
}

function gameHasStarted() {
  return frameCount > (framesPerSecond * gameStartDelayTimeInSeconds)
}
  
function shouldShowCop() {
  return frameCount > (framesPerSecond * copDelayTimeInSeconds)
}

function showInstructions() {
  fill(250, 243, 220);
  rect(0, 0, width, height);
  streakinText();
  instructionsText();
}

function instructionsText() {
  push()
  textFont("VT323");
  stroke(0);
  fill(0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("HOW TO PLAY", 0, 150, width);
  text("Use the arrow keys to move!", 0, 250, width);
  text("Try to tackle the mascot!", 0, 350, width);
  text("Don't get caught by the fuzz!", 0, 450, width);
  text("To begin, click the screen!", 0, 550, width);
  pop()
}

function streakinText() {
  push()
  textFont("Monoton");
  stroke(245, 107, 8);
  fill(255, 219, 88);
  textSize(50);
  textStyle(ITALIC);
  textAlign(CENTER, CENTER);

  if (frameCount % 40 < 15) {
    text("Streakin'!", 0, 70, width);
  }
  pop()
}

function drawField() {

  // field
  push()
    fill(76, 187, 23) // green
    noStroke()
    rect(0, height/6, width, height - height/6)
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