function Mascot(x, y) {
  this.isFleeing = false
  this.maxSpeed = 5
  this.maxForce = 5
  this.position = createVector(x, y)
  this.velocity = createVector(0, 0)
  this.acceleration = createVector(0, 0)
  this.center = createVector(width/2, height/2)
  
  this.update = function(buttPosition) {
    this.velocity.add(this.acceleration)
    constrain(this.velocity.mag, 0, this.maxSpeed)
    this.position.add(this.velocity)
    this.acceleration.set(0, 0)
    var flee = this.flee(buttPosition)
    this.applyForce(flee)
    var gravitateTowardCenter = this.gravitateTowardCenter()
    this.applyForce(gravitateTowardCenter)
  }
  
  this.applyForce = function(force) {
    this.acceleration.add(force)
  }

  this.display = function() {
    this.flip()
  }
  
  this.flip = function() {
    if (frameCount % 60 < 30) {
      image(leftMascotImage, this.position.x, this.position.y)
    } else {
      image(rightMascotImage, this.position.x, this.position.y)
    }
  }

  this.gravitateTowardCenter = function() {
    var desired = p5.Vector.sub(this.center, this.position)
    desired.setMag(1.5)
    var steer = p5.Vector.sub(desired, this.velocity)
    steer.limit(this.maxForce)
    return steer
  }

  this.flee = function(target) {
    var desired = p5.Vector.sub(target, this.position)
    var d = desired.mag()
    if (d < 300) {
      this.isFleeing = true
      desired.setMag(this.maxSpeed)
      desired.mult(-1)
      var steer = p5.Vector.sub(desired, this.velocity)
      steer.limit(this.maxForce)
      return steer
    } else {
      this.isFleeing = false
      return createVector(0, 0)
    }
}

  this.edges = function() {
    if (this.position.y > height - 20) {
      this.velocity.y *= -1
      this.position.y = height - 20
    }

    if (this.position.x > width - 20) {
      this.velocity.x *= -1
      this.position.x = width - 20
    }

    if (this.position.x < 5) {
      this.velocity.x *= 1
      this.position.x = 5
    }

    if (this.position.y < 120) {
      this.velocity.y *= -1
      this.position.y = 120
    }
  }
}

