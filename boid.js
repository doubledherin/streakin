class Boid {
  constructor(x, y, maxSpeed=1, maxForce=1) {
    this.position = createVector(x, y)
    this.velocity = createVector(0, 0)
    this.acceleration = createVector(0, 0)
    this.maxSpeed = maxSpeed
    this.maxForce = maxForce
    this.center = createVector(width/2, height/2)
    this.isFleeing = false 
  }

  display(imageRef, position) {
    image(imageRef, position.x, position.y)
  }

  update() {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.set(0, 0)
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  // TODO: Try this with constrain
  edges(xMin=5, xMax=width-20, yMin=150, yMax=height-40) {
    if (this.position.x < xMin) {
      this.position.x = xMin
    }

    if (this.position.x > xMax) {
      this.position.x = xMax
    }

    if (this.position.y < yMin) {
      this.position.y = yMin
    }

    if (this.position.y > yMax) {
      this.position.y = yMax
    }
  }

  chase(target) {
    this.chase = function(target) {
      const desired = p5.Vector.sub(target, this.position)
      desired.setMag(this.maxSpeed)
      const steer = p5.Vector.sub(desired, this.velocity)
      steer.limit(this.maxForce)
      return steer  
    }
  }

  separate(padding, allBoids) {
    let steer = createVector(0, 0)
    let count = 0
    // For every cop on the screen, check if it's too close to another cop
    for (let i = 0; i < allBoids.length; i++) {
      let d = p5.Vector.dist(this.position,allBoids[i].position)
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < padding)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, allBoids[i].position)
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
      steer.mult(this.maxSpeed)
      steer.sub(this.velocity)
      steer.limit(this.maxForce)
    }
    return steer
  }

  gravitateTowardCenter() {
    var desired = p5.Vector.sub(this.center, this.position)
    desired.setMag(1.5)
    var steer = p5.Vector.sub(desired, this.velocity)
    steer.limit(this.maxForce)
    return steer
  }

  flee(target) {
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
}