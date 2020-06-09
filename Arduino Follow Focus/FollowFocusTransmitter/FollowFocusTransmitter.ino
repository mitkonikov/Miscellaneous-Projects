#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(9, 10); // CE, CSN
const byte address[6] = "00001";

int average = 0;
int averageCount = 0;

void setup() {
  radio.begin();
  radio.openWritingPipe(address);
  radio.setPALevel(RF24_PA_MIN);
  radio.stopListening();
  // Serial.begin(9600);
}

void loop() {
  if (averageCount == 0) {
    average = analogRead(A1);
    averageCount++;
  } else if (averageCount < 30) {
    average = (average + analogRead(A1)) / 2;
    averageCount++;
  } else {
    radio.write(&average, sizeof(average));
    // Serial.println(average);
    average = 0;
    averageCount = 0;
  }
}
