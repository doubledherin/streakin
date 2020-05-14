let framesPerSecond = 60
let gameStartDelayTimeInSeconds = 8
let copDelayTimeInSeconds = 15
let funk
let crowdCheer
let mouseMoved = false

function preload() {
  loadSounds()
}

function setup() {
  var cnv = createCanvas(900, 800)
  cnv.mouseMoved(triggerSounds)
  loadImages();
  mascot = new Mascot(100, 200)
  butt = new Butt(width - 50, height - 50)
  cop = new Cop(0, height-200)
}

function draw() {
  if (!gameHasStarted()) {
    showInstructions()
  } else {
    funk.stop();
    drawField();
    mascot.display()
    mascot.update(butt.position)
    mascot.edges()
    butt.display()
    butt.update()
    butt.edges()
  }
  if (mascot.isFleeing) {
    streakinText()
    crowdCheer.setVolume(1)
  } else {
    crowdCheer.setVolume(0.3)
  }
  if (shouldShowCop()) {
    cop.display(butt.position)
    cop.update()
    cop.edges()
  }
}

function toggleSoundAndStreakinText() {}

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
    funk.play()
    crowdCheer.setVolume(0.3)
    crowdCheer.loop(gameStartDelayTimeInSeconds)      
  }
  console.log("AUDIO CONTEXT STATE: ", getAudioContext().state)
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
  background(76, 187, 23);
  image(crowdImage, 0, 0);
  beginShape();
  noFill();
  stroke(255);
  strokeWeight(4);
  vertex(width / 2, height - 600);
  vertex(width - 50, height - 350);
  vertex(width / 2, height - 50);
  vertex(width - 850, height - 350);
  endShape(CLOSE);
  push()
  fill(255);
  rect(440, 195, 20, 20);
  rect(835, 440, 20, 20);
  rect(440, 730, 20, 20);
  rect(45, 440, 20, 20);
  pop()
}