function Mascot(x, y) {
  this.isFleeing = false
  this.maxSpeed = 2
  this.maxForce = 4
  this.position = createVector(x, y)
  this.velocity = createVector(0, 0)
  this.acceleration = createVector(0, 0)
  
  
  this.update = function(buttPosition) {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.set(0, 0)
    var flee = this.flee(buttPosition)
    this.applyForce(flee)
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

  this.flee = function(target) {
    var desired = p5.Vector.sub(target, this.position)
    var d = desired.mag()
    if (d < 250) {
      this.isFleeing = true
      desired.setMag(this.maxSpeed)
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.velocity)
      // steer.limit(this.maxForce)
      return steer
    } else {
      this.isFleeing = false
      return createVector(0, 0)
    }
}

  this.edges = function() {
    if (this.position.y > height - 20) {
      this.velocity.y *= -10;
      this.position.y = height - 20
    }

    if (this.position.x > width - 20) {
      this.velocity.x *= -10;
      this.position.x = width - 20
    }

    if (this.position.x < 5) {
      this.velocity.x *= 10
      this.position.x = 5
    }

    if (this.position.y < 120) {
      this.velocity.y *= -10
      this.position.y = 120
    }
  }
}