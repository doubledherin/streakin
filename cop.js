class Cop {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.velocity = createVector(0, 0)
    this.acceleration = createVector(0, 0)
    this.maxSpeed = 1  
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  update(buttPosition, cops) {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.set(0, 0)
    var chase = this.chase(buttPosition)
    this.applyForce(chase)
    var separate = this.separate(cops)
    this.applyForce(separate)
  }

  display() {
    image(copImage, this.position.x, this.position.y)
  }

  separate(cops) {
    let desiredseparation = 50
    let steer = createVector(0, 0)
    let count = 0
    // For every boid in the system, check if it's too close
    for (let i = 0; i < cops.length; i++) {
      let d = p5.Vector.dist(this.position,cops[i].position)
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, cops[i].position)
        diff.normalize()
        diff.div(d)        // Weight by distance
        steer.add(diff)
        count++           // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count)
    }
  
    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize()
      steer.mult(this.maxspeed)
      steer.sub(this.velocity)
      steer.limit(this.maxforce)
    }
    return steer
  }

  chase(target) {
    this.chase = function(target) {
      var desired = p5.Vector.sub(target, this.position)
      desired.setMag(this.maxSpeed)
      var steer = p5.Vector.sub(desired, this.velocity)
      steer.limit(this.maxForce)
      return steer  
    }
  }

  edges() {
    if (this.position.y > height - 20) {
      this.velocity.y *= -1
      this.position.y = height - 20
    }

    if (this.position.x > width - 20) {
      this.velocity.x *= -1
      this.position.x = width - 20
    }

    if (this.position.x < 5) {
      this.velocity.x *= -1
      this.position.x = 5
    }

    if (this.position.y < 150) {
      this.velocity.y *= -1
      this.position.y = 150
    }
  }
}