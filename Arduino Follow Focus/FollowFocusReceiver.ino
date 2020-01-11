#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
#include <AccelStepper.h>
#include <MultiStepper.h>

#define stepPin 3
#define dirPin 4
#define ms1Pin 5
#define ms2Pin 6
#define ms3Pin 7
#define enablePin 8

#define MinPulseWidth 50

AccelStepper stepper(1, stepPin, dirPin);

#define motorStepsPerRev 200
#define microSteps 4
#define rotaryEncoderSteps 256

int stepsPerRotaryStep = (motorStepsPerRev * microSteps) / rotaryEncoderSteps;

int pot = 0;
int curPot = 0;
int dir = 0;
int prev = 0;
int prevDir = 0;

// Sleep Function
long previousMillis = 0;
#define sleepTimer 500

RF24 radio(9, 10); // CE, CSN
const byte address[6] = "00001";

void setup() {
  pinMode(stepPin, OUTPUT);
  pinMode(dirPin, OUTPUT);
  pinMode(ms1Pin, OUTPUT);
  pinMode(ms2Pin, OUTPUT);
  pinMode(ms3Pin, OUTPUT);
  pinMode(enablePin, OUTPUT);
  
  digitalWrite(ms1Pin, HIGH);
  digitalWrite(ms2Pin, HIGH);
  digitalWrite(ms3Pin, HIGH);
  digitalWrite(dirPin, LOW);

  stepper.setMinPulseWidth(MinPulseWidth);
  stepper.setMaxSpeed(1500);
  stepper.setAcceleration(1000);
  stepper.setSpeed(500);
  
  // Serial.begin(9600);
  radio.begin();
  radio.openReadingPipe(0, address);
  radio.setPALevel(RF24_PA_MIN);
  radio.startListening();

  // Serial.println("began listening");
}

void loop() {
  if (radio.available()) {
    radio.read(&pot, sizeof(pot));
    // Serial.println(pot);
  } else {
    previousMillis = millis();
  }

  stepper.moveTo(curPot);
  stepper.run();
  
  int diff = pot - prev;
  
  if (abs(diff) < 3) {
    return;
  } else {
    curPot = pot;
    
    if (diff > 0) dir = 0;
    else dir = 1;
  
    if (dir != prevDir) stepper.stop();
    
    digitalWrite(enablePin, LOW);

    // remember the values for later use
    prevDir = dir;
    prev = pot;
  }
    
  // Sleep timer
  unsigned long currentMillis = millis ();
  if (currentMillis - previousMillis > sleepTimer) {
    digitalWrite(enablePin, HIGH);
  }
}
