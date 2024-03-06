class Lemming {

  constructor(variation) {
    this.x = 0;
    this.y = 0;
    this.variation = variation;
    this.moving = false;
    this.falling = false;
    this.collide = false;
    this.dead = false;
    this.safe = false;
    this.vy = 1.2;
    this.ay = 0.5;
    this.maxGrav = 10;
    this.number = undefined; // # of lemming in the sequence
    this.scream = false;
    this.singed = false;
    this.speed = 1;
    this.variant = variation;
  }

  advance(delta,startY,gameSpeed) {   // moves the lemming if it's alive and ready to move, also offsets according to the number of dead.
    if (!this.moving && !this.collide && !this.safe && !this.falling && !this.dead) {
      this.x = -100 - 80*(this.number-delta) ;
      this.y = startY;
    }
    else if (this.moving && !this.collide && !this.safe && !this.falling && !this.dead) {
      this.x += this.speed*gameSpeed;
    }
  }

  gravity() {
    this.vy += this.ay * gameSpeed;
    this.vy = constrain(this.vy,-this.maxGrav,this.maxGrav);
    this.y += this.vy * gameSpeed
    this.falling = true;
  }

  climb(y,gameSpeed) {
    this.y += y*gameSpeed;
  }

}
