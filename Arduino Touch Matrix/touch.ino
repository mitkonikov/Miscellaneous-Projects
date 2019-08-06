#include <ADCTouch.h>

//Pin connected to ST_CP of 74HC595 -- sivo
int latchPin = 4;
//Pin connected to SH_CP of 74HC595 -- liljakovo
int clockPin = 2;
////Pin connected to DS of 74HC595 -- plavo
int dataPin = 3;

byte dataArray[3][3];

int ref0, ref1, ref2, ref3, ref4, ref5;
 
void setup()
{
    Serial.begin(9600);
  
    ref0 = ADCTouch.read(A0, 500);
    ref1 = ADCTouch.read(A1, 500);
    ref2 = ADCTouch.read(A2, 500);
    ref3 = ADCTouch.read(A3, 500);
    ref4 = ADCTouch.read(A4, 500);
    ref5 = ADCTouch.read(A5, 500);

    Serial.println("Calibration:");
    Serial.println(ref0);
    Serial.println(ref1);
    Serial.println(ref2);
    Serial.println(ref3);
    Serial.println(ref4);
    Serial.println(ref5);

    pinMode(latchPin, OUTPUT);
    pinMode(clockPin, OUTPUT);
    pinMode(dataPin, OUTPUT);
    dataArray[0][0] = 0b01000010;
    dataArray[0][1] = 0b01000100;
    dataArray[0][2] = 0b01001000;
    dataArray[1][0] = 0b00100010;
    dataArray[1][1] = 0b00100100;
    dataArray[1][2] = 0b00101000;
    dataArray[2][0] = 0b00010010;
    dataArray[2][1] = 0b00010100;
    dataArray[2][2] = 0b00011000;

    sendOut(0b00000000);
}
 
void loop()
{
    int value0 = ADCTouch.read(A0);   //no second parameter
    int value1 = ADCTouch.read(A1);     //   --> 100 samples
    int value2 = ADCTouch.read(A2);     //   --> 100 samples
    int value3 = ADCTouch.read(A3);     //   --> 100 samples
    int value4 = ADCTouch.read(A4);     //   --> 100 samples
    int value5 = ADCTouch.read(A5);     //   --> 100 samples
 
    value0 -= ref0;       //remove offset
    value1 -= ref1;
    value2 -= ref2;
    value3 -= ref3;
    value4 -= ref4;
    value5 -= ref5;
 
    if (value0 > 40 && value3 > 40) { sendOut(dataArray[0][0]); Serial.println("0 0"); }
    if (value0 > 40 && value4 > 40 ) { sendOut(dataArray[1][0]); Serial.println("0 1"); }
    if (value0 > 40 && value5 > 40 ) { sendOut(dataArray[2][0]); Serial.println("0 2"); }
    if (value1 > 40 && value3 > 40) { sendOut(dataArray[0][1]); Serial.println("1 0"); }
    if (value1 > 40 && value4 > 40 ) { sendOut(dataArray[1][1]); Serial.println("1 1"); }
    if (value1 > 40 && value5 > 40 ) { sendOut(dataArray[2][1]); Serial.println("1 2"); }
    if (value2 > 40 && value3 > 40) { sendOut(dataArray[0][2]); Serial.println("2 0"); }
    if (value2 > 40 && value4 > 40 ) { sendOut(dataArray[1][2]); Serial.println("2 1"); }
    if (value2 > 40 && value5 > 40 ) { sendOut(dataArray[2][2]); Serial.println("2 2"); }
    
    delay(100);
}

void sendOut(byte data)
{
    digitalWrite(latchPin, 0);
    shiftOut(dataPin, clockPin, MSBFIRST, data);
    digitalWrite(latchPin, 1);
    delay(300);
}
