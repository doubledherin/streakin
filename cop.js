function Cop(x, y) {
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
  }

  this.display = function() {
    image(copImage, this.position.x, this.position.y)
  }

  this.edges = function() {
    if (this.position.y > height - 20) {
      this.velocity.y *= -1;
      this.position.y = height - 20;
    }

    if (this.position.x > width - 20) {
      this.velocity.x *= -1;
      this.position.x = width - 20;
    }

    if (this.position.x < 5) {
      this.velocity.x *= -1;
      this.position.x = 5;
    }

    if (this.position.y < 150) {
      this.velocity.y *= -1;
      this.position.y = 150;
    }
  }
}