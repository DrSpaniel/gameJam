/**
Title: space Guy

Programming: 

Art: 

Audio:

space guy

 */

"use strict";

let bg;
let spaceGuy;
let keys = [];
let spaceGuyImages = [];
let spaceGuyDefault;
let currentFrame = 0;
let frameDelay = 10;

function preload() {
  bg = loadImage("assets/images/rooms/bg.jpg");
  spaceGuyDefault = loadImage("assets/images/spaceguy/spaceguy.png");
  spaceGuyImages = loadSpaceGuyImages();
}

function loadSpaceGuyImages() {
  const imagePaths = [
    "LEFT_WALK/LEFT_Walk1.png",
    "LEFT_WALK/LEFT_Walk2.png",
    "LEFT_WALK/LEFT_Walk3.png",
    "LEFT_WALK/LEFT_Walk4.png",
    "RIGHT_WALK/RIGHT_Walk1.png",
    "RIGHT_WALK/RIGHT_Walk2.png",
    "RIGHT_WALK/RIGHT_Walk3.png",
    "RIGHT_WALK/RIGHT_Walk4.png",
    "REST/Resting1.png",
    "REST/Resting2.png",
    "REST/Resting3.png",
    "REST/Resting4.png",
  ];

  return imagePaths.map((path) => loadImage("assets/images/Character/" + path));
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
  // Check if spaceGuy enters the trigger space in the default room (bedroom).
  // If so, teleport to hallScene.
}

function hallScene() {
  // Depending on the "prog" variable, hallscene will have a different background and narration audio.
}

function vibeCheck() {
  // Ensure spaceGuy stays within the canvas bounds.
  if (spaceGuy.x < 0) {
    spaceGuy.x = 0;
  }
  if (spaceGuy.x > windowWidth - 32) {
    spaceGuy.x = windowWidth - 32;
  }
  if (spaceGuy.y < 0) {
    spaceGuy.y = 0;
  }
  if (spaceGuy.y > windowHeight - 64) {
    spaceGuy.y = windowHeight - 64;
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
    this.speed = 3;
    this.img = img;
    this.frameCount = 0;
    this.idle = true; // Set idle state by default
    this.movingLeft = false; // Track left movement
    this.movingRight = false; // Track right movement
  }

  display() {
    image(this.img, this.x, this.y, 32, 64);
  }

  move() {
    let moving = false;

    if (keys[87]) {
      // W key (up)
      this.y -= this.speed;
      moving = true;
      this.movingLeft = false;
      this.movingRight = false;
    }
    if (keys[83]) {
      // S key (down)
      this.y += this.speed;
      moving = true;
      this.movingLeft = false;
      this.movingRight = false;
    }
    if (keys[65]) {
      // A key (left)
      this.x -= this.speed;
      moving = true;
      this.movingLeft = true;
      this.movingRight = false; // Reset right movement state
      this.idle = false;
    }
    if (keys[68]) {
      // D key (right)
      this.x += this.speed;
      moving = true;
      this.movingLeft = false; // Reset left movement state
      this.movingRight = true;
      this.idle = false;
    }

    if (moving) {
      this.frameCount++;
      if (this.frameCount >= frameDelay) {
        this.img = this.getDirectionImage();
        currentFrame = (currentFrame + 1) % 4;
        this.frameCount = 0;
      }
    } else {
      if (!this.idle) {
        this.frameCount = 0;
        this.idle = true;
        this.img = spaceGuyImages[this.getDirectionIndex()];
      } else {
        this.frameCount++;
        if (this.frameCount >= frameDelay) {
          this.img = spaceGuyImages[8 + currentFrame];
          currentFrame = (currentFrame + 1) % 4;
          this.frameCount = 0;
        }
      }
    }
  }

  getDirectionImage() {
    return spaceGuyImages[this.getDirectionIndex() + currentFrame];
  }

  getDirectionIndex() {
    if (this.movingLeft) {
      return 0; // Index for left movement
    } else if (this.movingRight) {
      return 4; // Index for right movement
    } else {
      return 8; // Index for idle
    }
  }
}

