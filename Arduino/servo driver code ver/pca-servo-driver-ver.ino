#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

// servo min and max
#define SERVOMIN 150 
#define SERVOMAX 600 

// servo positions 
int servo1pos = 0;
int servo2pos = 0;
int servo3pos = 0;
int servo4pos = 0;
int servo5pos = 0;
int servo6pos = 0;
int servo7pos = 0;
int servo8pos = 0;
int servo9pos = 0;

// servo activation states, servos 1-9
bool servo1state = true;  
bool servo2state = false;
bool servo3state = false;
bool servo4state = false;
bool servo5state = false;
bool servo6state = false;
bool servo7state = false;
bool servo8state = false;
bool servo9state = false;

String data = "";

void setup() {
  // initialize servo driver
  pwm.begin();
  pwm.setPWMFreq(60); // frequency (should be anough to move the stiffer servos)

  Serial.begin(115200); // baud rate, match with p5 code
  Serial.println("PCA9685 Servo Controller Initialized");

  // reset servo rotation to 0º

  pwm.setPWM(0, 0, SERVOMIN);
  pwm.setPWM(1, 0, SERVOMIN);
  pwm.setPWM(2, 0, SERVOMIN);
  pwm.setPWM(3, 0, SERVOMIN);
  pwm.setPWM(4, 0, SERVOMIN);
  pwm.setPWM(5, 0, SERVOMIN);
  pwm.setPWM(6, 0, SERVOMIN);
  pwm.setPWM(7, 0, SERVOMIN);
  pwm.setPWM(8, 0, SERVOMIN);

}

void loop() {
  if (Serial.available() > 0) {
    data = Serial.readStringUntil('\n');
    if (data.length() > 0) {
      float p5data = data.toFloat();
      if (p5data >= 0.0 && p5data <= 1.0) {

        // ACTIVE: Servo1 logic: if servo1pos is less than or equal to 90, update servo pos. if otherwise, set to 90
        if (servo1state) {
          int servo1Mapped = map(p5data * 7000, 0, 1000, 0, 90);
          servo1Mapped = constrain(servo1Mapped, 0, 90);
          if (servo1pos != 90) {
            int pwmValue = map(servo1Mapped, 0, 180, SERVOMIN, SERVOMAX);
            pwm.setPWM(0, 0, pwmValue);
            servo1pos = servo1Mapped;

            if (servo1pos >= 90) {
              servo1state = false;
              servo2state = true;
            }
          }
        }

        // Servo2 logic
        if (servo2state) {
          int pwmValue = map(90, 0, 180, SERVOMIN, SERVOMAX);
          pwm.setPWM(1, 0, pwmValue);
          servo2pos = 90;
          servo2state = false;
          servo3state = true;
        }

        // Servo3 logic
        if (servo3state) {
          int pwmValue = map(90, 0, 180, SERVOMIN, SERVOMAX);
          pwm.setPWM(2, 0, pwmValue);
          servo3pos = 90;
          servo3state = false;
          servo4state = true;
        }

        // ACTIVE: Servo4 logic
        if (servo4state) {
          int servo4Mapped = map(p5data * 1000, 0, 500, 0, 90);
          servo4Mapped = constrain(servo4Mapped, 0, 90);
          if (servo4pos != 90) {
            int pwmValue = map(servo4Mapped, 0, 180, SERVOMIN, SERVOMAX);
            pwm.setPWM(3, 0, pwmValue);
            servo4pos = servo4Mapped;

            if (servo4pos >= 90) {
              servo4state = false;
              servo5state = true;
            }
          }
        }

        // Servo5 logic
        if (servo5state) {
          int pwmValue = map(90, 0, 180, SERVOMIN, SERVOMAX);
          pwm.setPWM(4, 0, pwmValue);
          servo5pos = 90;
          servo5state = false;
          servo6state = true;
        }

        // Servo6 logic
        if (servo6state) {
          int pwmValue = map(90, 0, 180, SERVOMIN, SERVOMAX);
          pwm.setPWM(5, 0, pwmValue);
          servo6pos = 90;
          servo6state = false;
          servo7state = true;
        }

        // ACTIVE: Servo7 logic
        if (servo7state) {
          int servo7Mapped = map(p5data * 600, 0, 500, 0, 90);
          servo7Mapped = constrain(servo7Mapped, 0, 90);
          if (servo7pos != 90) {
            int pwmValue = map(servo7Mapped, 0, 180, SERVOMIN, SERVOMAX);
            pwm.setPWM(6, 0, pwmValue);
            servo7pos = servo7Mapped;

            if (servo7pos >= 90) {
              servo7state = false;
              servo8state = true;
            }
          }
        }

        // Servo8 logic
        if (servo8state) {
          int pwmValue = map(90, 0, 180, SERVOMIN, SERVOMAX);
          pwm.setPWM(7, 0, pwmValue);
          servo8pos = 90;
          servo8state = false;
          servo9state = true;
        }

        // Servo9 logic
        if (servo9state) {
          int pwmValue = map(90, 0, 180, SERVOMIN, SERVOMAX);
          pwm.setPWM(8, 0, pwmValue);
          servo9pos = 90;
          servo9state = false;
        }

        // reset data so no carrying over
        data = "";
      }
    }
  }
}
