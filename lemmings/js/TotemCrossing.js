class TotemCrossing {
  constructor() {

  }

  update() {
    // 1-1 specific
    image(bg1_1,0,0);
    pitStartX = 500;
    if (!totemfallen) {
      image(totem,0,0);
    }
    else if (totemfallen) {
      image(totemfell,0,0);
    }
    this.playMusic(bgm1_1);
    this.displayClouds(10,gameSpeed);
    this.totemCheck();
    this.moveLemmings(620,gameSpeed);
    this.checkGrav(pitStartX,gameSpeed);
    }

    displayClouds(number, speed) {
      for (let i = 0; i < number; i++) {
        let cld = clouds[i];
        cld.x -= speed * gameSpeed;
        if (cld.x < -400) {
          cld.x = 1700;
        }
        image(cloud,cld.x,cld.y);
      }
    }

    totemCheck() {
      if (mouseX >= 390 && mouseX <= 500 && mouseY >= 30 && mouseY <= 750 && !totemfallen && state === `s1`) {
        image(totemhl,0,0)
      }
      if (totemfallen === true) {
        for(let i = 0; i < numberOfLemmings; i++) {
          let lem = lemmings[i];
          if (lem.x > 480 && lem.x < 1180 && lem.falling === false) {
          lem.climb(-0.4,gameSpeed);
          }
        }
      }
    }

    moveLemmings(startY, gameSpeed) {
      for(let i = 0; i < 50; i++) {
        lem = lemmings[i];
        lem.advance(lemmingDelta,startY,gameSpeed);
        lem.moving = true;
        lem.advance(lemmingDelta,startY,gameSpeed);
        if (lem.x > width && lem.safe === false && lem.dead === false) {
          lem.safe = true;
          lem.moving = false;
          savedLemmings ++;
        }
        this.lemdisplay(lem,lem.variation);
      }
    }

    lemdisplay(lem,variation) {
      if (!lem.dead) {
      switch(lem.variation) {
        case 0:
        image(lem0,lem.x,lem.y);
        break;
        case 1:
        image(lem1,lem.x,lem.y);
        break;
        case 2:
        image(lem2,lem.x,lem.y);
        break;
        case 3:
        image(lem3,lem.x,lem.y);
        break;
        case 4:
        image(lem4,lem.x,lem.y);
        break;
        case 5:
        image(lem5,lem.x,lem.y);
        break;
        case 6:
        image(lem6,lem.x,lem.y);
        break;
        case 7:
        image(lem7,lem.x,lem.y);
        break;
      }
      }
      else if (lem.dead && lem.singed) {
        image(singe,lem.x,lem.y);
      }
    }

    playMusic(bgm) {
        if (!musicPlaying) {
          if (!mute) {
          musicPlaying = true;
          currentbgm = bgm;
          currentbgm.play();
          }
        }
      }

    checkGrav() {
        for(let i = 0; i < numberOfLemmings; i++) {
          let lem = lemmings[i];
          if (lem.x > pitStartX && pitDisabled === false || lem.falling === true) {
          lem.gravity();
          if (!lem.scream) {
          lem.scream = true;
          if (!mute) {
          scream.play();
          }
          }
          this.lemdisplay(lem,lem.variation);
          }
          if (lem.y > height && lem.dead === false) {
            lem.dead = true;
            deadLemmings ++;
          }
        }
      }

    mousePressed() {
      if (mouseX >= 390 && mouseX <= 500 && mouseY >= 30 && mouseY <= 750) { // 1-1 totem
          print('the totem has been pressed')
        totemfallen = true;
        pitDisabled = true;
      }
    }
}
