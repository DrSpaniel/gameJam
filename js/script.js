/**
Title: space Guy

Programming: 

Art: 

Audio:

space guy

 */

"use strict";

let bg; //initializing stuff that otherwise would break
let spaceGuy;
let keys = [];
let spaceGuyImages = [];
let spaceGuyLeftStand;
let spaceGuyLeftWalk;
let spaceGuyRightStand;
let spaceGuyRightWalk;
let spaceGuyDefault;
let currentFrame = 0;
let frameDelay = 10; // Adjust this value to change the delay



let prog = 0;
//super important variable!!!! this will be used to determine the audio played in the hallScene, as well 




function preload() {
  bg = loadImage("assets/images/rooms/bg.jpg"); //loading images
  spaceGuyLeftStand = loadImage("assets/images/spaceguy/spaceguyleftstand.png");
  spaceGuyLeftWalk = loadImage("assets/images/spaceguy/spaceguyleftwalk.png");
  spaceGuyRightStand = loadImage(
    "assets/images/spaceguy/spaceguyrightstand.png"
  );
  spaceGuyRightWalk = loadImage("assets/images/spaceguy/spaceguyrightwalk.png");
  spaceGuyDefault = loadImage("assets/images/spaceguy/spaceguy.png");
  spaceGuyImages = [
    //creating image array
    spaceGuyLeftStand,
    spaceGuyLeftWalk,
    spaceGuyRightStand,
    spaceGuyRightWalk,
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  spaceGuy = new SpaceGuy(width / 2, height / 2, spaceGuyDefault);
}

function draw() {
  background(bg);
  spaceGuy.display();
  spaceGuy.move();
  vibeCheck();
}

function mainArea() {
  //checks if spaceGuy enters the trigger space in the default room (bedroom). if so, teleport to hallScene.
}

//depending on the "prog" variable, hallScene will display different background, and narration audio. 

function hallScene(){
  //using prog, hallscene will have a different background and narration audio. 
  
}


function vibeCheck() {
  //ensures spaceGuy is within the canvas and does not leave

  if (spaceGuy.x < 0) {
    spaceGuy.x = 0;
  }
  if (spaceGuy.x > windowWidth - 64) {
    spaceGuy.x = windowWidth - 64;
  }
  if (spaceGuy.y < 0) {
    spaceGuy.y = 0;
  }
  if (spaceGuy.y > windowHeight - 120) {
    spaceGuy.y = windowHeight - 120;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  keys[keyCode] = true;
}

function keyReleased() {
  keys[keyCode] = false;
}

class SpaceGuy {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.img = img;
    this.frameCount = 0;
  }

  display() {
    image(this.img, this.x, this.y, 64, 120);
  }

  move() {
    if (keys[87]) {
      // W key
      this.y -= this.speed;
    }
    if (keys[83]) {
      // S key
      this.y += this.speed;
    }
    if (keys[65]) {
      // A key (left movement)
      this.x -= this.speed;
      if (this.frameCount === 0) {
        this.frameCount = 1;
      }
      this.frameCount++;
      if (this.frameCount >= frameDelay) {
        this.img = spaceGuyImages[currentFrame];
        currentFrame = (currentFrame + 1) % 2; //modulus operator, if current frame is 1, then it will be 0, if 0 then 1. it works by dividing the current frame by 2 and returning the remainder
        this.frameCount = 0;
      }
    }
    if (keys[68]) {
      // D key (right movement)
      this.x += this.speed;
      if (this.frameCount === 0) {
        this.frameCount = 1;
      }
      this.frameCount++;
      if (this.frameCount >= frameDelay) {
        this.img = spaceGuyImages[2 + currentFrame];
        currentFrame = (currentFrame + 1) % 2;
        this.frameCount = 0;
      }
    }
    if ((!keys[65] && !keys[68]) || (keys[65] && keys[68])) {
      // No left or right keys pressed
      this.img = spaceGuyDefault;
      currentFrame = 0;
      this.frameCount = 0;
    }
  }
}
