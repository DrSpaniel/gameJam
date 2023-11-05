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
let room = 0; //defaults to the first room

function preload() {
  //init background images
  let R1 = loadImage("assets/images/rooms/R1.png");
  let R2 = loadImage("assets/images/rooms/R2.png");
  let R3 = loadImage("assets/images/rooms/R3.png");
  let R4 = loadImage("assets/images/rooms/R4.png");
  let R5 = loadImage("assets/images/rooms/R5.png");
  let R6 = loadImage("assets/images/rooms/R6.png");
  let R7 = loadImage("assets/images/rooms/R7.png");
  let R8 = loadImage("assets/images/rooms/R8.png");
  let R9 = loadImage("assets/images/rooms/R9.png");
  bg = R1; //start in bedroom

  spaceGuyDefault = loadImage("assets/images/Character/REST/Resting1.png");
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
  createCanvas(1024, 576);
  spaceGuy = new SpaceGuy(width / 2, height / 2, spaceGuyDefault);
}

function draw() {
  background(bg);
  //roomChange(); //changes room depending on the triggers
  spaceGuy.display();
  spaceGuy.move();
  vibeCheck();
  vibeCheckRoom();
  //print(room);
  debugCoord();
}

function debugCoord() {
  //when mouse clicked, print x and y coords
  if (mouseIsPressed) {
    print("x: " + mouseX + " y: " + mouseY);
    print(room);
  }
}

function vibeCheck() {
  // Ensure spaceGuy stays within the canvas bounds.

  if (room == 0) {    //bounds for bedroom
    if (spaceGuy.x < 295) {
      spaceGuy.x = 295;
    }
    if (spaceGuy.x > 728 - 16) {
      spaceGuy.x = 728 - 16;
    }
    if (spaceGuy.y < 164) {
      spaceGuy.y = 164;
    }
    if (spaceGuy.y > 433 - 32) {
      spaceGuy.y = 433 - 32;
    }
  } else if (room == 1) { //bounds for hallway
    if (spaceGuy.x < 0) {
      spaceGuy.x = 0;
    }
    if (spaceGuy.x > width - 16) {
      spaceGuy.x = width - 16;
    }
    if (spaceGuy.y < 288) {
      spaceGuy.y = 288;
    }
    if (spaceGuy.y > 424 - 32) {
      spaceGuy.y = 424 - 32;
    }
  }else if (room == 2)  //bounds for main room
    {

    }
}

function vibeCheckRoom() {
  //this sets triggers and changes room var for roomchange to use
  if (room == 0) {
    //only trigger in bedroom
    if (spaceGuy.y < 332 && spaceGuy.y > 252) {
      if (spaceGuy.x > 687 && spaceGuy.x < 728) {
        print("hooray!");
        //set room to 1, hallway
        room = 1;
        roomChange();
      }
    }
  } else if (room == 1) {
    //continue for checkers in each room (hallway next)
    if (spaceGuy.y < 420 && spaceGuy.y > 286) {
      if (spaceGuy.x < 77 && spaceGuy.x > 7) {
        print("hooray!");
        //set room to 1, hallway
        room = 0;
        roomChange();
      }
    } else if (spaceGuy.y < 420 && spaceGuy.y > 291) {  //this should check if continue
      if (spaceGuy.x < 1020 && spaceGuy.x > 970) {
        print("hooray!");
       
        room = 2;
        roomChange();
      }
    }
  } else if (room == 2) {

  }
}

function roomChange() {
  if (room == 0) {
    bg = loadImage("assets/images/rooms/R1.png");
    spaceGuy.x = 670;
    spaceGuy.y = 287;
    //bg = R1;
    //bedroom
    //play ambient music (music.mp3)
    //set bounds of room
  } else if (room == 1) {
    bg = loadImage("assets/images/rooms/R2.png");
    spaceGuy.x = 108;
    spaceGuy.y = 350;
    //hall 1
    //play hallway music
    //move x and y of spaceguy to far left
  } else if (room == 2) {
    bg = loadImage("assets/images/rooms/R3.png");
    //main room
    //play again ambient music
    //change room to main room
  } else if (room == 3) {
    //hall 2
    //change room
  } else if (room == 4) {
    //water room
  } else if (room == 5) {
    //hall 3
  } else if (room == 6) {
    //pilot room
  } else if (room == 7) {
    //hall 4
    //vertical room
  } else if (room == 8) {
    //SPACE!!!!!!!!
    //play space music
    //change cat img
  } else if (room == 9) {
    //final locked room access
  }
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
    image(this.img, this.x - 16, this.y - 32, 32, 64);
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
