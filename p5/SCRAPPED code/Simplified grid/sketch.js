// TO ARDUINO: get audio input, make it move the servo
// IN P5: rotate squares based on vol

let port; // hold serial port object
let connectBtn; // variable to store button
let mic;

// variables to store square angle rotation
let angle1 = 0, angle2 = 0, angle3 = 0;
let angle4 = 0, angle5 = 0, angle6 = 0;
let angle7 = 0, angle8 = 0, angle9 = 0;

// activation states
let active1 = true, active2 = false, active3 = false;
let active4 = false, active5 = false, active6 = false;
let active7 = false, active8 = false, active9 = false;

// variable to store loading bar amt
let loadingAmt = 0;


function setup() {
  createCanvas(1920, 1080);
  
  //audio initialise
  mic = new p5.AudioIn();
  mic.start();
  
  port = createSerial(); // create serial port object

  //serial port button
  connectBtn = createButton('Arduino');
  connectBtn.position(20,360);
  connectBtn.mousePressed(connectBtnClick);

  //square modes
  rectMode(CENTER);
  angleMode(DEGREES);

}

function connectBtnClick(){ // executes when button is pressed 
  
  //connect to Arduino
  if (!port.opened()){
    port.open('Arduino', 9600);
  } else {
    port.close();
  } 
}

function draw() {
  background(220);

  // PORT + SQUARES: get and map audio input
  let vol = mic.getLevel(); 
  let angleIncrement = map(vol * 500, 0, 1, 0, 5);
  let reverseIncrement = map(vol * 500, 0, 1, 0, -5);

  // PROGRESS BAR   
  //make a variable for the square's height that increases based on vol OR when angle = 90
  let loadingBar = map(vol *10, 0, 1, 0, 450); 

  // PORT: convert values to string & send to Arduino every 10 frames
  if (frameCount % 10 == 0){
    let volStr = String(vol); 
    port.write(volStr + '\n'); // print input with a new line
    console.log(volStr);  
  }
  // PORT: Update button label based on connection status 
  connectBtn.html(port.opened() ? 'Disconnect': 'Connect to Arduino');


  ///////
  // SQUARES: if current angle is less than 90, update based on vol
  // update square 1
  if (active1) { // if square 1 is active
    angle1 = angleIncrement; // angle increases based on vol value stored in angleIncrement variable
    //loading bar
    loadingAmt += loadingBar;
    loadingAmt = constrain(loadingAmt, 0, 100);
    console.log('square1 building');

    if(angle1 >= 90){
      angle1 = 90;
      active1 = false; // stop square 1
      active2 = true; // activate square 2
      console.log('square 1 complete, activating square 2');
    }
  } 

  // update square 2
  if (active2) { // if square 2 is active or true
    angle2 = angleIncrement;
    loadingAmt += loadingBar;
    loadingAmt = constrain(loadingAmt, 100, 200);
    console.log('square2 building');
    if (angle2 >= 90) {
      angle2 = 90;
      active2 = false; // stop square 2
      active3 = true; // activate square 3
      console.log('square2 complete');
    }
  } else if (!active2 && angle2 >=90){
    loadingAmt = 200;
    console.log('bar2done');

  }
  // update square 3
  if (active3) {
    angle3 = angleIncrement;
    loadingAmt += loadingBar;
    loadingAmt = constrain(loadingAmt, 200, 300);
    console.log('square3 building');
    if (angle3 >=180) {
      angle3 = 180;
      active3 = false; // stop square 3 
      active4 = true; // start square 4
      console.log('square3 complete');
    }
   } else if (!active3 && angle3 >=180){
    loadingAmt = 300;
    console.log('bar3done');

  }

  // update square 4
  if (active4) {
    angle4 = reverseIncrement;
    loadingAmt = constrain(loadingAmt, 300, 400);
    console.log('square4 building');
    if (angle4 >= -90) {
      angle4 = -90;
      active4 = false; 
      active5 = true; 
      console.log('square4 complete');
    }
   } else if (!active4 && angle4 <= -90){
    loadingAmt = 400;
    console.log('bar4done');
  }


  // update square 5
  if (active5) {
    angle5 = reverseIncrement;
    loadingAmt = constrain(loadingAmt, 400, 500);
    console.log('square5 building');
    if (angle5 >= -90) {
      angle5 = -90;
      active5 = false; // stop square 5
      active6 = true; // start square 6
      console.log('square5 complete');
    }
   } else if (!active5 && angle5 <= -90){
    loadingAmt = 500;
    console.log('bar5done');
  }
  // update square 6
  if (active6) {
    angle6 = reverseIncrement;
    loadingAmt = constrain(loadingAmt, 500, 600);
    console.log('square6 building');
    if (angle6 >= -180) {
      angle6 = -180;
      active6 = false; 
      active7 = true; 
      console.log('square6 complete');
    }
   } else if (!active6 && angle6 <= -180){
    loadingAmt = 600;
    console.log('bar6done');
  }
  // update square 7
  if (active7) {
    angle7 = angleIncrement;
    loadingAmt = constrain(loadingAmt, 600, 700);
    console.log('square7 building');
    if (angle7 >= 90) {
      angle7 = 90;
      active7 = false; // stop square 7
      active8 = true; // start square 8
      console.log('square7 complete');
    }
   } else if (!active7 && angle7 >= 90){
    loadingAmt = 700;
    console.log('bar7done');
  }
  // update square 8
  if (active8) {
    angle8 = angleIncrement;
    loadingAmt = constrain(loadingAmt, 700, 800);
    console.log('square8 building');
    if (angle8 >= 90) {
      angle8 = 90;
      active8 = false; // stop square 8
      active9 = true; // start square 9
      console.log('square8 complete');
    }
   } else if (!active8 && angle8 >= 90){
    loadingAmt = 800;
    console.log('bar8done');
  }
  // update square 9
  if (active9) {
    angle9 = angleIncrement;
    loadingAmt = constrain(loadingAmt, 800, 900);
    console.log('square9 building');
    if (angle9 >= 180) {
      angle9 = 180;
      active9 = false; // stop square 9
      console.log('square9 complete');
    }
   } else if (!active9 && angle9 >= 90){
    loadingAmt = 900;
    console.log('bar9done');
  }
//GRID 
  // boxes
   push();
    // white box
      noStroke();
      fill('white');
      rect(width/2, height/2, 1200, height-50);
    // wood box
      noStroke();
      fill('#d4b274');
      rect (width/2, height/2, 1000, height-200);
    // face 1
      fill('#d4b274');
      rect(350, height/2, 20, height-300);
      rect(450+1120, height/2, 20, height-300);

    // ears
      rect(width/2, 15, 400, 20);
      rect(width/2, 1065, 400, 20);
    pop();
  
  // grid dividers
  push();
    // columns
    strokeWeight(10); 
    stroke('black');
    line(800, 1080, 800, 0);
    line(325+800, 1080, 325+800, 0);  
    // rows
    strokeWeight(4);
    line(470, 400, 1450, 400);
    line(470, 675, 1450, 675);
  pop();
  
//SQUARES
  // draw square 1 
  noStroke();
  
  push();
  translate(width/3, height/4);
  rotate(angle1);
  fill('white');
  square(0, 0, 150);
  fill('black');
  rect(0, -80, 140, 10);
  pop();


  // draw square 2 
  noStroke();
  
  push();
  translate(width/2, height/4);
  rotate(angle2);
  fill('white');
  square(0, 0, 150);
  fill('black');
  rect(0, -80, 140, 10);
  pop();


  // draw square 3 
  noStroke();
  
  push();
  translate(width/1.5, height/4);
  rotate(angle3);
  fill('white');
  square(0, 0, 150);
  fill('black');
  rect(0, -80, 140, 10);
  pop();

  // draw square 4 
  noStroke();
  
  push();
  translate(width/1.5, height/2);
  rotate(angle4);
  fill('white');
  square(0, 0, 150);
  fill('black');
  rect(0, -80, 140, 10);
  pop();


  // draw square 5 
  noStroke();
  
  push();
  translate(width/2, height/2);
  rotate(angle5);
  fill('white');
  square(0, 0, 150);
  fill('black');
  rect(0, -80, 140, 10);
  pop();


  // draw square 6 
  noStroke();
    
  push();
  translate(width/3, height/2);
  rotate(angle6);
  fill('white');
  square(0, 0, 150);
  fill('black');
  rect(0, -80, 140, 10);
  pop();

  // draw square 7 
  noStroke();
  
  push();
  translate(width/3, height/1.325);
  rotate(angle7);
  fill('white');
  square(0, 0, 150);
  fill('black');
  rect(0, -80, 140, 10);
  pop();

  // draw square 8 
  noStroke();
  
  push();
  translate(width/2, height/1.325);
  rotate(angle8);
  fill('white');
  square(0, 0, 150);
  fill('black');
  rect(0, -80, 140, 10);
  pop();
  
  // draw square 9 
  noStroke();
  
  push();
  translate(width/1.5, height/1.325);
  rotate(angle9);
  fill('white');
  square(0, 0, 150);
  fill('black');
  rect(0, -80, 140, 10);
  pop();

  //white bar
      push();
      fill('white');
      rect(width/11, height/2, 70, 900);
      pop();
    // moving progress bar
      push();
      rectMode(CORNER);
      fill('black');
      rect(width/11 - 40, height/12, 70, loadingAmt);
      // rect(x, year, width, height, tl, tr, br, bl);
      pop();



  


  }