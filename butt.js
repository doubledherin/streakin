function Butt(x, y) {
  this.position = createVector(x, y)
  this.velocity = createVector(0, 0)
  this.acceleration = createVector(0, 0)

  this.direction = "left"
  
  this.update = function() {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.set(0, 0);
  }
  
  this.applyForce = function(force) {
    this.acceleration.add(force)
  }
  
  this.display = function() {
    if (this.direction === "left") {
      image(leftButtImage, this.position.x, this.position.y)      
    } else {
      image(rightButtImage, this.position.x, this.position.y)
    }
  }

  this.edges = function() {
    if (this.position.y > height - 20) {
      this.position.y = height - 20
    }

    if (this.position.x > width - 20) {
      this.position.x = width - 20
    }

    if (this.position.x < 5) {
      this.position.x = 5
    }

    if (this.position.y < 150) {
      this.position.y = 150
    }
  }
}