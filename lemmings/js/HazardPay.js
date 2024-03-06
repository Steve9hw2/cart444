class HazardPay {

  constructor() {

  }

  update() {
    image(bg3_1,0,0);
    if (buttonpressed) {
    image(buttonplatform,0,0);
    }
    pitStartX = 645;
    this.playMusic(bgm3_1);
    this.buttonCheck();
    this.moveLemmings(760,gameSpeed);
    this.checkGrav(pitStartX,gameSpeed);
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

  buttonCheck() {
    if (mouseX >= 1445 && mouseX <= 1521 && mouseY >= 680 && mouseY <= 750 && !buttonpressed) {
      image(buttonhl,0,0);
    }
    else if (buttonpressed) {
      image(buttonis,0,0);
    }
    else {
      image(buttonnot,0,0);
    }
  }

  checkGrav() {
      for(let i = 0; i < numberOfLemmings; i++) {
        let lem = lemmings[i];
        if (lem.x > pitStartX && buttonpressed === false || lem.falling === true) {
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

  moveLemmings(startY, gameSpeed) {
      for(let i = 0; i < 50; i++) {
        let lem = lemmings[i];
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

    mousePressed() {
        if (mouseX >= 1445 && mouseX <= 1521 && mouseY >= 680 && mouseY <= 750 && !buttonpressed) {
          buttonpressed = true;
        }
      }

}
