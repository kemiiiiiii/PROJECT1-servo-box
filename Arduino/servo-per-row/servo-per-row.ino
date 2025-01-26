#include <Servo.h>

// declare servos
Servo servo1;
Servo servo2;
Servo servo3;
Servo servo4;
Servo servo5;
Servo servo6;
Servo servo7;
Servo servo8;
Servo servo9;

// store servo positions
int servo1pos = 0; // Start at 0°
int servo2pos = 0;
int servo3pos = 0;
int servo4pos = -5;
int servo5pos = 0;
int servo6pos = 0;
int servo7pos = 0;
int servo8pos = 0;
int servo9pos = 0;

int ledPin = 3; // Red LED

// servo activation states. false by default
bool servo1state = true; // start with servo1 active
bool servo2state = false;
bool servo3state = false;
bool servo4state = false;
bool servo5state = false;
bool servo6state = false;
bool servo7state = false;
bool servo8state = false;
bool servo9state = false;

// input data
String data = "";

void setup() {
  // attach servos
  servo1.attach(9);
  servo2.attach(10);
  servo3.attach(5);
  servo4.attach(A0);
  servo5.attach(A1);
  servo6.attach(A2);
  servo7.attach(A3);
  servo8.attach(A4);
  servo9.attach(A5);

  // reset servo positions to 0
  servo1.write(0);
  servo2.write(0);
  servo3.write(0);
  servo4.write(0);
  servo5.write(0);
  servo6.write(0);
  servo7.write(0);
  servo8.write(0);
  servo9.write(0);



  Serial.begin(115200);
  pinMode(ledPin, OUTPUT); // Red LED
}

void loop() {
  if (Serial.available() > 0) {
    data = Serial.readStringUntil('\n');
    if (data.length() > 0) {
      float p5data = data.toFloat();
      if (p5data >= 0.0 && p5data <= 1.0) {

        // MOVING: Servo1 logic
        if (servo1state) {                                        // if servo1state is true
          int servo1Mapped = map(p5data * 7000, 0, 1000, 0, 90); // map data to servo1
          servo1Mapped = constrain(servo1Mapped, 0, 90);         // constrain to 90
          if (servo1pos != 90) {              // if servo1 position is not 90
            if (servo1Mapped != servo1pos) { // if servo1mapped is not initial servo1pos value (0)
              servo1.write(servo1Mapped); // update servo based on mapped val
              servo1pos = servo1Mapped; // update servo1pos
            }
            if (servo1Mapped >= 90) { // if servo1 is 90
              servo1.write(90);
              servo1pos = 90;
              servo1state = false; // deactivate servo1
              servo2state = true; // activate servo2
              delay(500);        // delay for stability
            }
          }
        }

        // Servo2 logic
        if (servo2state) {
          servo2.write(90);
          servo2state = false;
          servo3state = true; // activate servo 3
          delay(500);
        }

        // Servo3 logic
        if (servo3state) {
          servo3.write(90);
          servo3state = false;
          servo3pos = 90;
          servo4state = true; // activate servo4...
          delay(500);
        }
     

        // MOVING: Servo4 logic 
          if (servo4state){
          int servo4Mapped = map(p5data *1000 , 0, 500, 0, 90);
          servo4Mapped = constrain(servo4Mapped * 1.5, 0, 90);
          if (servo4pos != 90) { 
          analogWrite(ledPin, 50);
            if (servo4Mapped != servo4pos) {
              servo4.write(servo4Mapped);
              servo4pos = servo4Mapped;
            }
            if (servo4pos >= 90) { 
                servo4.write(90);
                servo4pos = 90;
                servo5state = true; 
                delay(500); 
            }
          }
          }


        // Servo5 logic
        if (servo5state) {
          servo5.write(90);
          servo5state = false;
          servo6state = true;
          delay(500);
        }
        // Servo6 logic
        if (servo6state) {
          servo6.write(90);
          servo6state = false;
          servo7state = true;
          delay(500);
        }


          // MOVING: Servo7 logic 
          if (servo7state){
          int servo7Mapped = map(p5data *1000, 0, 1000, 0, 90);
          servo7Mapped = constrain(servo7Mapped * 1.5, 0, 90);
          if (servo7pos != 90) { 
          analogWrite(ledPin, 10);
            if (servo7Mapped != servo7pos) {
              servo7.write(servo7Mapped);
              servo7pos = servo7Mapped;
            }
            if (servo7pos >= 90) { 
                servo7.write(90);
                servo7pos = 90;
                servo7state = false;
                servo8state = true; 
                delay(500); 
            }
          }
          
        }

      // Servo8 logic
        if (servo8state) {
          servo8.write(90);
          servo8state = false;
          servo9state = true;
          delay(500);
        }

     // Servo9 logic
        if (servo9state) {
          servo9.write(90);
          servo9state = false;
          delay(500);
        }
      }
    }
  }
}
