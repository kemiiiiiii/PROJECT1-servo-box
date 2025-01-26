
// 3d models
let servocube;
let box;

// vol input

let port; 
let connectBtn;
let mic;

// variables to smooth things out
let smoothedRotation = 0;
let smoothedSq1 = 0;
let smoothedSq2 = 0;
let smoothedSq3 = 0;
let smoothedBar = 0;
let smoothedBarColour = 0;

function preload(){
  //load 3D cube
  servocube = loadModel('libraries/assets/full cube.obj', true);
  box = loadModel('libraries/assets/cube box.obj', true);
  //load font
  font = loadFont('libraries/assets/Arial.ttf');
}

function setup() {
  createCanvas(800, 400, WEBGL);
  mic = new p5.AudioIn();
  mic.start();
  port = createSerial();

  rectMode(CENTER);
  
  // button to open/close serial port
  connectBtn = createButton('Arduino');
  connectBtn.position(655, 368); // position
  connectBtn.mousePressed(connectBtnClick); // runs connectBtnClick function when pressed
}

// FUNCTION: when button is pressed
function connectBtnClick(){  
  if (!port.opened()){
    port.open('Arduino', 115200); 
  } else {
    port.close();
  }
}

//  FUNCTION: gradient colours 
function drawGradient(){
   // gradient colours
   let from = color('white');
   let to = color('blue');
   // draw gradient
   for (let y = 0; y < 300; y+=2.5){
     n = map(y, 0, height, 0, 1);
     let newcolour = lerpColor(from, to, n);
     push();
     translate(362.5, -15);

     stroke(newcolour);
     line(-371, y-145, -355, y-145); // Adjust for WEBGL coordinates
     pop();

   }
}

function draw() {
  
  let vol = mic.getLevel();

  // make background change colour based on vol
  // map to bg colour 
  // and smooth with lerp
  bgMapped = map(vol * 2, 0, 1, 0, 255);
  background(bgMapped);


  // map audio input to a value 
 volmapped = map(vol*10, 0, 1, 0, 400); //map to square size

 // send audio value to arduino every 10 frames (to slow down data rate)
 if (frameCount % 10 == 0){
   let volStr = String(vol); //convert vol to string
   port.write(volStr + '\n'); //send vol with newline
   console.log(volStr);
 }
 // Update button label based on connection status
 connectBtn.html(port.opened() ? 'Disconnect': 'Start game!');


//// 2D GRAPHICS /////

// BG ROUNDED SQUARES
push();
  // map height
  let heightMapped = map(vol * 100, 0, 1, 0, 300);
  smoothedSq1 = lerp(smoothedSq1, heightMapped, 0.1);
  let height2Mapped = map(vol * 100, 0, 1, 0, 200);
  smoothedSq2 = lerp(smoothedSq2, height2Mapped, 0.1);
  let height3Mapped = map(vol * 60, 0, 1, 0, 200);
  smoothedSq3 = lerp(smoothedSq3, height3Mapped, 0.1);



  translate(-100, 0); // move origin

  //draw square
  noStroke();
  fill('white');
  rect(0, 0, 400, smoothedSq1);
  // fill ('orange');
  rect (0, 0, smoothedSq1, 400);
  fill('black');
  circle(0, 0, smoothedSq1);
  fill('#f000e0');
  circle(0, 0, smoothedSq2);
  fill ('white');
  circle(0, 0, smoothedSq3/1.25);
  fill ('black');
  circle(0, 0, smoothedSq3/3);
  stroke('white');
  strokeWeight(2);
  noFill();
  circle(0,0,smoothedSq2*2);
  strokeWeight(20);
  stroke('black');
  circle(0, 0, smoothedSq2/4);
  noStroke();
  fill('white');
  circle(0,0, smoothedSq3/5);

pop();

// bg rect for labels etc
push();
 noStroke();
 fill('#f0f0f0');
 rect(340, 0, 300, 400);
pop();
 
// VALUE BAR 
push();
 // map height 
 let loadingBarMapped = map(vol * 50, 0, 1, 0, 90);
 let constrainedBar = constrain(loadingBarMapped, 0, 280);
 smoothedBar = lerp(smoothedBar, constrainedBar, 0.1);
 //map height to loading bar colour
//  let lbColourMappedB = map(vol * 50, 0, 1, 0, 255);
//  smoothedBarColour = lerp(smoothedBarColour, lbColourMappedB, 0.1);

 // draw bar container
 translate(295, 10);
 stroke('black');
 strokeWeight(2);
 strokeCap(ROUND);
 fill('black');
 rect(0, -10, 35, 308);
 

 // LABELS: Distraction Level 
 push();
  fill('black');
  textFont(font);
  textSize(18);
  textAlign(CENTER);
  text('Distraction Lvl', 0, -180);
 pop();

 // LABELS: Low - Mid - High
 push();
  fill('black');
  textFont(font);
  textSize(12);
  textAlign(CENTER);
  text('Low', -60, -145);
  text('Mid', -60, -10);
  text('High', -60, 125);
  
  // LABELS: label lines
  push();
  stroke('black');
  line(-35, -148, -15, -148);  // low
  line(-35, -13, -15, -13);   // mid
  line(-35, 122, -15, 122);   // high
  pop();
 pop();
 
 
 // VALUE BAR
 push();
 rectMode(CORNER);
  // bar with lvl colours
    drawGradient();
  // cover
    noStroke();
    fill('black');
    rect(-10, 140, 20, -280 + smoothedBar);
 pop();

pop();


//// 3D CUBE ////
// reflective colour
  normalMaterial();

// move origin
translate(-100, 30); 

 let cubeMapped = map(vol, 0, 1, 0, 45);
 smoothedRotation = lerp(smoothedRotation, cubeMapped, 0.1);

  // // cube box
  push();
    // specularMaterial(255);
    translate(0, 200)
    scale(2);
    rotateX(PI);
    model(box);
  pop();

// main cube
  push();
    scale(1.2);
    rotateZ(PI);
    rotateY(smoothedRotation);
    model(servocube);
  pop();

 


}
