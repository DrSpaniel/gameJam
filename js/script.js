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

function preload() {
  bg = loadImage("assets/images/bg.jpg");
  spaceGuy = loadImage("assets/images/spaceguy/spaceguy.png"); // Load the spaceGuy image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  spaceGuy = new SpaceGuy(width / 2, height / 2, spaceGuy); // Pass the spaceGuy image
}

function draw() {
  background(bg);
  spaceGuy.display();
  spaceGuy.move();
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
    this.img = img; // The spaceGuy image
  }

  display() {
    image(this.img, this.x, this.y, 64, 120); // Display the spaceGuy image
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
      // A key
      this.x -= this.speed;
    }
    if (keys[68]) {
      // D key
      this.x += this.speed;
    }
  }

  walkCycle() {
    // This function will animate the spaceGuy
  }
}
