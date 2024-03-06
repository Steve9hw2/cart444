/**************************************************
Project 2 Prototype
Steve Berthiaume

This is a test for the final script. My goal here is
to test switch statements (the more efficient conditional),
test displaying scenes from a method, and to test
randomized scenes.
**************************************************/
"use strict";

let canvas;
let state = "start" // start, s1, s2, s3, s4, s5, load, end, fail
let lemmings = [];
let numberOfLemmings = 50;
let deadLemmings = 0;
let savedLemmings = 0;
let p5hatty;
let lem0;
let lem1;
let lem2;
let lem3;
let lem4;
let lem5;
let lem6;
let lem7;
let lemIcon;
let lemIconSmall;
let lemIconSaved;
let lemIconDead;
let menuPlayButton;
let menuPlayFade;
let clouds = [];
let cloud;
let maxPossibleClouds = 100;
let musicPlaying = false;

let singe;

let pitStartX = undefined;
let pitDisabled = false;

let areaOne;  // Area: object for the scene
let areaTwo;
let areaThree;
let areaFour;
let areaFive;
let sceneOne; // Scene: variation of the area
let sceneTwo;
let sceneThree;
let sceneFour;
let sceneFive;

let bg1_1;
let bg1_2;
let bg1_2alt;
let totemfallen = false;
let totem;
let totemfell;
let totemhl;
let sunhl;
let sundisabled = false;

let currentbgm;
let bgm1_1;
let bgm1_2;
let scream;
let singed;

let levelIndex = [
  [], // index zero, empty
  [`N/A`,`1 - 1: Totem Crossing`, `1 - 2: A Real Scorcher`, `1 - 3: Undefined.`, `1 - 4: Undefined.`, `1 - 5: Undefined.`], // area one
  [`N/A`,`2 - 1: Undefined.`, `2 - 2: Undefined.`, `2 - 3: Undefined.`, `2 - 4: Undefined.`, `2 - 5: Undefined.`],
  [],
  [],
];

let nextState; // used to track the next state after `load`
let rotationDeg = 1; // initial rotation increment for loading screen icon (degrees)
let frameCheck; // used to track time elapsed in loading screens
let loadTime = 3; // time, in seconds, spent in loading screens

function preload() {
  p5hatty = loadFont(`assets/fonts/p5hatty.ttf`);
  lem7 = loadImage(`assets/images/WeirdLemming.png`);
  lem4 = loadImage(`assets/images/DarkLemming.png`);
  lem2 = loadImage(`assets/images/FancyLemming.png`);
  lem6 = loadImage(`assets/images/DuskLemming.png`);
  lem1 = loadImage(`assets/images/BlandLemming.png`);
  lem3 = loadImage(`assets/images/RedLemming.png`);
  lem5 = loadImage(`assets/images/ArcticLemming.png`);
  lem0 = loadImage(`assets/images/GoldLemming.png`);
  lemIcon = loadImage(`assets/images/LemmingIcon.png`);
  lemIconSmall = loadImage(`assets/images/LemmingIconSmall.png`);
  lemIconSaved = loadImage(`assets/images/LemmingIconSaved.png`);
  lemIconDead = loadImage(`assets/images/LemmingIconDead.png`);
  menuPlayButton = loadImage(`assets/images/Button.png`);
  menuPlayFade = loadImage(`assets/images/ButtonFade.png`);
  cloud = loadImage(`assets/images/cloud.png`);
  singe = loadImage(`assets/images/CrispLemming.png`)
  // section specific assets
  bg1_1 = loadImage(`assets/images/sections/sec1-1.png`);
  bg1_2 = loadImage(`assets/images/sections/sec1-2.png`);
  bg1_2alt = loadImage(`assets/images/sections/sec1-2alt.png`)
  totem = loadImage(`assets/images/sections/totem.png`);
  totemhl = loadImage(`assets/images/sections/totemhighlight.png`);
  totemfell = loadImage(`assets/images/sections/totemfallen.png`);
  sunhl = loadImage(`assets/images/sections/sunhighlight.png`);
  bgm1_1 = loadSound(`assets/sounds/sectionmusic/1_1-CrashNST_Jungle_Rollers.mp3`);
  bgm1_2 = loadSound(`assets/sounds/sectionmusic/1_2-MonkeyBall_Desert.mp3`);
  scream = loadSound(`assets/sounds/scream.mp3`)
  singed = loadSound(`assets/sounds/fire.mp3`)
}

// setup()
function setup() {
    canvas = createCanvas(1600,1200);
    for(let i = 0; i < numberOfLemmings; i++) {
      let lemming;
      let variation = int(randomGaussian(3,2));
      lemming = new Lemming(variation);
      lemming.number = i;
      lemmings.push(lemming);
    }
    randomizeSections(); // This function randomizes the sceneOne-type values
    areaOne = new SceneOne(sceneOne); // This creates a new scene object which stores its variation as this.variant
    areaTwo = new SceneTwo(sceneTwo);
    areaThree = new SceneThree(sceneThree);
    areaFour = new SceneFour(sceneFour);
    areaFive = new SceneFive(sceneFive);
    frameRate(30);
    for(let i = 0; i < maxPossibleClouds; i++) {
      let newCloud = {
        x:random(0,1600),
        y:random(-50,200),
      };
      clouds.push(newCloud);
    }
}

// draw()
function draw() {
  switch (state) {
  case "start":
  startMenu();
  break;
  case "s1":
  loadScene(areaOne,areaOne.variant);
  checkEndS1();
  break;
  case "s2":
  loadScene(areaTwo,areaTwo.variant);
  checkEndS2();
  break;
  case "s3":
  loadScene(areaThree,areaThree.variant);
  checkEndS3();
  break;
  case "s4":
  loadScene(areaFour,areaFour.variant);
  checkEndS4();
  break;
  case "s5":
  loadScene(areaFive,areaFive.variant);
  checkEndS5();
  break;
  case "load":
  loadingScreen();
  break;
  case "end":
  break;
  case "fail":
  loadFailScreen();
  break;
  }
}

function randomizeSections() {
  // sceneOne = int(random(1,5));
  sceneOne = int(random(1,2.4));
  sceneTwo = int(random(1,5));
  sceneThree = int(random(1,5));
  sceneFour = int(random(1,5));
  sceneFive = int(random(1,5));
}

function loadScene(area, variant) {
  switch (variant) {
    case 1:
    area.VariantOne();
    break;
    case 2:
    area.VariantTwo();
    break;
    case 3:
    area.VariantThree();
    break;
    case 4:
    area.VariantFour();
    break;
    case 5:
    area.VariantFive();
    break;
  }
  sceneSpecificDisplay(area.section, variant);
  sceneNameDisplay(area.section, variant);
  remainingDisplay();
}

function startMenu() {
    background(0);
    push();
    fill(224,166,49);
    textSize(260);
    textFont(p5hatty);
    textAlign(CENTER,CENTER);
    text(`Lemmings`,800,200);
    menuLoadPlayButton();
    pop();
    menuLoadLemmings();
}

function menuLoadLemmings() {
let menuLemX = 400;
let menuLemY = 800;
let spacing = 160;
  for (let i = 0; i < 5; i++) {
    let lem = lemmings[i];
    switch(lem.variant) {
      case 0:
      image(lem0,menuLemX,menuLemY);
      menuLemX += spacing;
      break;
      case 1:
      image(lem1,menuLemX,menuLemY);
      menuLemX += spacing;
      break;
      case 2:
      image(lem2,menuLemX,menuLemY);
      menuLemX += spacing;
      break;
      case 3:
      image(lem3,menuLemX,menuLemY);
      menuLemX += spacing;
      break;
      case 4:
      image(lem4,menuLemX,menuLemY);
      menuLemX += spacing;
      break;
      case 5:
      image(lem5,menuLemX,menuLemY);
      menuLemX += spacing;
      break;
      case 6:
      image(lem6,menuLemX,menuLemY);
      menuLemX += spacing;
      break;
      case 7:
      image(lem7,menuLemX,menuLemY);
      menuLemX += spacing;
      break;
    }
  }
}

function menuLoadPlayButton() {
  let buttonWidth = 320;
  let buttonHeight = 140;
  let buttonX = 625;
  let buttonY = 950;
  image(menuPlayButton,buttonX,buttonY);
  if (mouseX >= 625 && mouseX <= buttonX + buttonWidth && mouseY >= buttonY && mouseY <= buttonY + buttonHeight ) {
    menuPlayButtonFade();
  }
}

function menuPlayButtonFade() {
  image(menuPlayFade,625,950);
}

function loadingScreen() {
  background(0);
  push();
  fill(224,166,49);
  textSize(120);
  textFont(p5hatty);
  textAlign(CENTER,CENTER);
  text(`Remaining Lemmings: `+ numberOfLemmings,800,150);
  pop();
  loadingScreenLemmings();
  loadingIcon();
  loadingTimer();
}

function loadingScreenLemmings() {
  let spacing = 160;
  let vertSpacing = 100;
  let startX = 180;
  let currentX = 180;
  let maxX = 1400;
  let startY = 250;
  let currentY = 250;
  for (let i = 0; i < 50; i++) {
    let lem = lemmings[i];
    if (!lem.dead) {
    switch(lem.variant) {
    case 0:
    image(lem0,currentX,currentY);
    currentX += spacing;
    if (currentX > maxX) {
      currentX = startX;
      currentY += vertSpacing
    }
    break;
    case 1:
    image(lem1,currentX,currentY);
    currentX += spacing;
    if (currentX > maxX) {
      currentX = startX;
      currentY += vertSpacing
    }
    break;
    case 2:
    image(lem2,currentX,currentY);
    currentX += spacing;
    if (currentX > maxX) {
      currentX = startX;
      currentY += vertSpacing
    }
    break;
    case 3:
    image(lem3,currentX,currentY);
    currentX += spacing;
    if (currentX > maxX) {
      currentX = startX;
      currentY += vertSpacing
    }
    break;
    case 4:
    image(lem4,currentX,currentY);
    currentX += spacing;
    if (currentX > maxX) {
      currentX = startX;
      currentY += vertSpacing
    }
    break;
    case 5:
    image(lem5,currentX,currentY);
    currentX += spacing;
    if (currentX > maxX) {
      currentX = startX;
      currentY += vertSpacing
    }
    break;
    case 6:
    image(lem6,currentX,currentY);
    currentX += spacing;
    if (currentX > maxX) {
      currentX = startX;
      currentY += vertSpacing
    }
    break;
    case 7:
    image(lem7,currentX,currentY);
    currentX += spacing;
    if (currentX > maxX) {
      currentX = startX;
      currentY += vertSpacing
    }
    break;
  }
}
}
}

function loadingIcon() {
  push();
  translate(1475,1075);
  angleMode(DEGREES);
  rotate(rotationDeg);
  image(lemIcon,-70,-70);
  rotationDeg += 2
  pop();
}

function loadingTimer() {
    if (int(frameCount/30) > frameCheck + loadTime) {
      state = nextState;
    }
}

function sceneNameDisplay(area, variant) {
    let leveltext;
    push();
    fill(224,166,49);
    textSize(80);
    textFont(p5hatty);
    textAlign(LEFT,CENTER);
    leveltext = levelIndex[area][variant];
    text(leveltext,50,1100);
    pop();
    print(levelIndex[area][variant])
}

function remainingDisplay() {
  push();
  fill(224,166,49);
  textSize(50);
  textFont(p5hatty);
  textAlign(LEFT,CENTER);
  text(`x `+ numberOfLemmings, 90, 1030);
  image(lemIconSmall,30,1000);
  image(lemIconDead,185,1000);
  text(`x `+deadLemmings, 250, 1030);
  image(lemIconSaved,335,1000);
  text(`x `+savedLemmings, 400,1030);
  pop();
}

function sceneSpecificDisplay(area, variant) {
  switch (area) {
    case 1:
    switch (variant) {
    case 1: // 1-1
    image(bg1_1,0,0);
    pitStartX = 500;
    if (!totemfallen) {
      image(totem,0,0);
    }
    else if (totemfallen) {
      image(totemfell,0,0);
    }
    playMusic(bgm1_1);
    displayClouds(10,3);
    totemCheck();
    moveLemmings(620);
    checkGrav(pitStartX);
    break;
    case 2: // 1-2
    image(bg1_2,0,0);
    pitStartX = undefined;
    if (sundisabled) {
      image(bg1_2alt,0,0);
    }
    playMusic(bgm1_2);
    moveLemmings(680);
    sunCheck();
    checkSinge();
    break;
    case 3: // 1-3
    break;
    case 4: // 1-4
    break;
    case 5: // 1-5
    break;
    }
    break;
    case 2:
    switch (variant) {
      case 1: // 2-1
      break;
      case 2: // 2-2
      break;
      case 3: // 2-3
      break;
      case 4: // 2-4
      break;
      case 5: // 2-5
      break;
    }
    break;
    case 3:
    switch (variant) {
      case 1: // 3-1
      break;
      case 2: // 3-2
      break;
      case 3: // 3-3
      break;
      case 4: // 3-4
      break;
      case 5: // 3-5
      break;
    }
    break;
    case 4:
    switch (variant) {
      case 1: // 4-1
      break;
      case 2: // 4-2
      break;
      case 3: // 4-3
      break;
      case 4: // 4-4
      break;
      case 5: // 4-5
      break;
    }
    break;
    case 5:
    switch (variant) {
      case 1:
      break;
      case 2:
      break;
      case 3:
      break;
      case 4:
      break;
      case 5:
      break;
    }
    break;
  }
}

function displayClouds(number, speed) {
  for (let i = 0; i < number; i++) {
    let cld = clouds[i];
    cld.x -= speed;
    if (cld.x < -400) {
      cld.x = 1700;
    }
    image(cloud,cld.x,cld.y);
  }
}

function moveLemmings(startY) {
  for(let i = 0; i < numberOfLemmings; i++) {
    let lem = lemmings[i];
    lem.advance(startY);
    lem.moving = true;
    lem.advance(startY);
    if (lem.x > width && lem.safe === false && lem.dead === false) {
      lem.safe = true;
      lem.moving = false;
      savedLemmings ++;
    }
    lemdisplay(lem,lem.variation);
  }
}

function lemdisplay(lem,variation) {
  if (!lem.dead) {
  switch(variation) {
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
}

function playMusic(bgm) {
  if (!musicPlaying) {
    musicPlaying = true;
    currentbgm = bgm;
    currentbgm.play();
  }
}

function stopMusic() {
  currentbgm.stop();
  musicPlaying = false;
}

function mouseClicked() {
  let buttonWidth = 320;
  let buttonHeight = 140;
  let buttonX = 625;
  let buttonY = 950;
  if (mouseX >= 625 && mouseX <= buttonX + buttonWidth && mouseY >= buttonY && mouseY <= buttonY + buttonHeight && state == `start` ) {
    state = `load`;
    nextState = `s1`;
    frameCheck = int(frameCount/30);
  }
  if (state === `s1` && sceneOne == 1 && mouseX >= 390 && mouseX <= 500 && mouseY >= 30 && mouseY <= 750) { // 1-1 totem
    totemfallen = true;
    pitDisabled = true;
  }
  if (state === `s1` && sceneOne == 2 && mouseX >= 680 && mouseX <= 970 && mouseY >= 20 && mouseY <= 320 && !sundisabled) {
    sundisabled = true;
}
}

function totemCheck() {
  let totemXStart = 390;
  let totemXEnd = 500;
  let totemYStart = 30;
  let totemYEnd = 750;
  if (mouseX >= totemXStart && mouseX <= totemXEnd && mouseY >= totemYStart && mouseY <= totemYEnd && !totemfallen && state === `s1`) {
    image(totemhl,0,0)
  }
  if (totemfallen === true) {
    for(let i = 0; i < numberOfLemmings; i++) {
      let lem = lemmings[i];
      if (lem.x > 480 && lem.x < 1180 && lem.falling === false) {
      lem.climb(-0.4);
      }
    }
  }
}

function checkGrav() {
  for(let i = 0; i < numberOfLemmings; i++) {
    let lem = lemmings[i];
    if (lem.x > pitStartX && pitDisabled === false || lem.falling === true) {
    lem.gravity();
    if (!lem.scream) {
    lem.scream = true;
    scream.play();
    }
    lemdisplay(lem,lem.variation);
    }
    if (lem.y > height && lem.dead === false) {
      lem.dead = true;
      deadLemmings ++;
    }
  }
}

function checkEndS1() {
  if (deadLemmings === numberOfLemmings) {
    state = "fail";
  }
  else if (savedLemmings + deadLemmings === numberOfLemmings && savedLemmings > 0) {
    state = "load";

    // randomizeSections();
    // nextState = "s1";
    nextState = "s2";
    stopMusic();
    frameCheck = int(frameCount/30);
    numberOfLemmings -= deadLemmings;
    deadLemmings = 0;
  }
}

function checkEndS2() {
  if (deadLemmings === numberOfLemmings) {
    state = "fail";
  }
  else if (savedLemmings + deadLemmings === numberOfLemmings && savedLemmings > 0) {
    state = "load";
    nextState = "s3";
    frameCheck = int(frameCount/30);
    numberOfLemmings -= deadLemmings;
    deadLemmings = 0;
  }
}

function checkEndS3() {
  if (deadLemmings === numberOfLemmings) {
    state = "fail";
  }
  else if (savedLemmings + deadLemmings === numberOfLemmings && savedLemmings > 0) {
    state = "load";
    nextState = "s4";
    frameCheck = int(frameCount/30);
    numberOfLemmings -= deadLemmings;
    deadLemmings = 0;
  }
}

function checkEndS4() {
  if (deadLemmings === numberOfLemmings) {
    state = "fail";
  }
  else if (savedLemmings + deadLemmings === numberOfLemmings && savedLemmings > 0) {
    state = "load";
    nextState = "s5";
    frameCheck = int(frameCount/30);
    numberOfLemmings -= deadLemmings;
    deadLemmings = 0;
  }
}

function checkEndS5() {
  if (deadLemmings === numberOfLemmings) {
    state = "fail";
  }
  else if (savedLemmings + deadLemmings === numberOfLemmings && savedLemmings > 0) {
    state = "load";
    nextState = "end";
    frameCheck = int(frameCount/30);
  }
}

function loadFailScreen() {
  background(0);
  push();
  fill(153,52,53);
  textSize(160);
  textFont(p5hatty);
  textAlign(CENTER,CENTER);
  text(`Extinction`,800,200);
  pop();
}

function checkSinge() {
  for(let i = 0; i < numberOfLemmings; i++) {
    let lem = lemmings[i];
    if (lem.x >= 520 && lem.x <= 1000 && !sundisabled && !lem.dead) {
      lem.dead = true;
      lem.moving = false;
      deadLemmings ++;
      image(singe,lem.x,lem.y);
      singed.play()
    }
  }
}

function sunCheck() {
  if (mouseX >= 680 && mouseX <= 970 && mouseY >= 20 && mouseY <= 320 && !sundisabled) {
    image(sunhl,0,0)
  }
}

// function removeDead() {
//   for(let i = 0; i < numberOfLemmings; i++) {
//     let lem = lemmings[i];
//     if (lem.dead) {
//       lemmings.splice(i, 1);
//     }
//   }
// }
