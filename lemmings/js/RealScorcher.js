class RealScorcher {
  constructor() {

  }

  update() {
    // 1-2 specific
    image(bg1_2,0,0);
    if (sundisabled) {
      image(bg1_2alt,0,0);
    }
    this.playMusic(bgm1_2);
    this.moveLemmings(680,gameSpeed);
    this.sunCheck();
    this.checkSinge();
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

    lemdisplay() {
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

    checkSinge() {
        for(let i = 0; i < numberOfLemmings; i++) {
          let lem = lemmings[i];
          if (lem.x >= 520 && lem.x <= 1000 && !sundisabled && !lem.dead) {
            lem.dead = true;
            lem.singed = true;
            lem.moving = false;
            deadLemmings ++;
            image(singe,lem.x,lem.y);
            if (!mute) {
              singed.play()
            }
          }
        }
    }

    sunCheck() {
        if (mouseX >= 680 && mouseX <= 970 && mouseY >= 20 && mouseY <= 320 && !sundisabled) {
          image(sunhl,0,0)
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

    mousePressed() {
        if (mouseX >= 680 && mouseX <= 970 && mouseY >= 20 && mouseY <= 320 && !sundisabled) { // 1-2 sun
          sundisabled = true;
    }
    }
}
