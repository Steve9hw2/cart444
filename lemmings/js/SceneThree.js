class SceneThree {

  constructor(variation) {
    this.x = 0;
    this.y = 0;
    this.variant = variation
  }

  update(variant,lemmings) {
    switch(variant) {
      case 1:
      this.VariantOne();
      break;
    }
    this.displayUI();
  }

  VariantOne() {
    hazardPay.update();
    this.displayUI(this.section,this.variant);
    this.checkEndS3();
  }

  VariantTwo() {
    background(100);
  }

  VariantThree() {
    background(150);
  }

  VariantFour() {
    background(200);
  }

  VariantFive() {
    background(255);
  }

  displayUI(area,variant) {
    push();
    fill(224,166,49); // scene name display
    textFont(p5hatty);
    textAlign(LEFT,CENTER);
    textSize(50); // remaining display
    text(`x `+ numberOfLemmings, 90, 1030);
    image(lemIconSmall,30,1000);
    image(lemIconDead,185,1000);
    text(`x `+deadLemmings, 250, 1030);
    image(lemIconSaved,335,1000);
    text(`x `+savedLemmings, 400,1030);
    pop();
    this.displayAudio();
    this.displayFastForward();
    this.displayLevel(area,variant);
  }

  displayLevel(area,variant) {
    push();
    fill(224,166,49); // scene name display
    textSize(60);
    textFont(p5hatty);
    textAlign(LEFT,CENTER);
    text(`3 - 1: Hazard Pay`,50,1100);
    pop();
  }

  displayAudio() {
    if (mute) {
      image(audio,0,0);
    }
    else if (!mute) {
      image(audiofade,0,0);
    }
    if (mouseX >= 585 && mouseX <= 710 && mouseY >= 650 && mouseY <= 1180 && mute) {
      image(audiohover,0,0);
    }
    else if (mouseX >= 585 && mouseX <= 710 && mouseY >= 650 && mouseY <= 1180 && !mute) {
      image(audiofadehover,0,0);
    }
  }

  displayFastForward() {
    if (gameSpeed === normalSpeed) {
      image(fastforward,0,0);
    }
    else if (gameSpeed === fastSpeed) {
      image(fastforwardfade,0,0);
    }
    if (mouseX >= 1455 && mouseX <= 1570 && mouseY >= 1075 && mouseY <= 1175 && gameSpeed === normalSpeed) {
      image(fastforwardhover,0,0);
    }
    else if (mouseX >= 1455 && mouseX <= 1570 && mouseY >= 1075 && mouseY <= 1175 && gameSpeed === fastSpeed) {
      image(fastforwardfadehover,0,0);
    }
  }

  stopMusic() {
      currentbgm.stop();
      musicPlaying = false;
  }

  checkEndS3() {
      if (deadLemmings === numberOfLemmings) {
        state = "fail";
      }
      else if (savedLemmings + deadLemmings === numberOfLemmings && savedLemmings > 0) {
        state = "load";
        nextState = "s4";
        this.stopMusic();
        frameCheck = int(frameCount/30);
        numberOfLemmings -= deadLemmings;
        lemmingDelta += deadLemmings;
        deadLemmings = 0;
        savedLemmings = 0;
      }
  }

  mousePressed() {
    if (state === `s1` || state === `s2` || state === `s3` || state === `s4` || state === `s5`) {
      if (mouseX >= 585 && mouseX <= 710 && mouseY >= 1070 && mouseY <= 1180) {
        if (!mute) {
          storedbgm = currentbgm;
          this.stopMusic();
          mute = true;
        }
        else if (mute) {
          currentbgm = storedbgm;
          switch(v2) {
            case 1:
            highVoltage.playMusic();
            break;
          }
          mute = false;
        }
      }
    } // mute toggle
  if (mouseX >= 1455 && mouseX <= 1570 && mouseY >= 1075 && mouseY <= 1175) {
    if (gameSpeed === normalSpeed) {
      gameSpeed = fastSpeed;
    }
    else if (gameSpeed === fastSpeed) {
      gameSpeed = normalSpeed;
    }
  } // fast forward toggle
  }

}
