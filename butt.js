class Butt {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.velocity = createVector(0, 0)
    this.acceleration = createVector(0, 0)  
    this.direction = "left"
  }

  update() {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.set(0, 0)
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  display() {
    if (this.direction === "left") {
      image(leftButtImage, this.position.x, this.position.y)      
    } else {
      image(rightButtImage, this.position.x, this.position.y)
    }
  }
  
  edges() {
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
