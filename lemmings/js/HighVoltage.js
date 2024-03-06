class HighVoltage {

  constructor() {

  }

  update() {
    // 2-1 specific
    image(bg2_1,0,0);
    if (wireleftiscut && wirerightiscut) {
      image(bg2_1alt,0,0);
    }

    this.playMusic(bgm2_1);
    this.moveLemmings(760,gameSpeed);
    this.wireLeftCheck();
    this.wireRightCheck();
    this.electrocution();
    }

    wireLeftCheck() {
      if (!wireleftiscut) {
        image(wireleft,0,0);
        this.drawStatic(370,590,700,880);
      }
      else if (wireleftiscut) {
        image(wireleftcut,0,0);
      }
      if (!wireleftiscut && mouseX >= 385 && mouseX <= 590 && mouseY >= 80 && mouseY <= 850) {
        image(wirelefthl,0,0);
      }
    }

     wireRightCheck() {
      if (!wirerightiscut) {
        image(wireright,0,0);
        this.drawStatic(660,1600,800,1020);
      }
      else if (wirerightiscut) {
        image(wirerightcut,0,0);
      }
      if (!wirerightiscut && mouseX >= 1000 && mouseX <= 1600 && mouseY >= 235 && mouseY <= 1000) {
        image(wirerighthl,0,0);
      }
    }

    drawStatic(x1,x2,y1,y2) {
      let staticCount = 30;
      for(let i = 0; i < staticCount; i++) {
      push();
      stroke(56,228,228);
      strokeWeight(3);
      point(random(x1,x2),random(y1,y2))
      pop();
      }
    }

    electrocution() {
      for(let i = 0; i < 50; i++) {
        let lem = lemmings[i];
        if (lem.x >= 370 && lem.x <= 590 && !wireleftiscut && lem.moving === true || lem.x >= 660 && lem.x <= 1600 && !wirerightiscut && lem.moving === true) {
          image(singe,lem.x,lem.y)
          if (!lem.singed && !lem.dead) {
            lem.moving = false;
            lem.dead = true;
            lem.singed = true;
            deadLemmings ++;
          shock.play();
          }
        }
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
        if (!wireleftiscut && mouseX >= 385 && mouseX <= 590 && mouseY >= 80 && mouseY <= 850) {
          wireleftiscut = true;
        }
        if (!wirerightiscut && mouseX >= 1000 && mouseX <= 1600 && mouseY >= 235 && mouseY <= 1000) {
          wirerightiscut = true;
        }
      }

}
