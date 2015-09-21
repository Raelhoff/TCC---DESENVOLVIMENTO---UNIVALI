#include <SPI.h>         // needed for Arduino versions later than 0018
#include <Ethernet.h>
#include <EthernetUdp.h>         // UDP library from: bjoern@cs.stanford.edu 12/30/2008


const int LM35 = A1; // Pino Analogico onde vai ser ligado ao pino 2 do LM35
const int REFRESH_RATE = 5000;  //Tempo de atualização entre as leituras em ms
const float CELSIUS_BASE = 0.4887585532746823069403714565; //Base de conversão para Graus Celsius ((5/1023) * 100)
float SOMA;
char buffer[25]; // just give it plenty to write out any values you want to test
String mystring;
int cont = 0;

byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};
IPAddress ip(192, 168, 0, 117);

unsigned int localPort = 8888;      // local port to listen on

// buffers for receiving and sending data
char packetBuffer[UDP_TX_PACKET_MAX_SIZE]; //buffer to hold incoming packet,
char  ReplyBuffer[] = "acknowledged";       // a string to send back

IPAddress ipServer(192, 168, 0, 100);

// An EthernetUDP instance to let us send and receive packets over UDP
EthernetUDP Udp;

void setup() {
  Serial.begin(9600);
  // start the Ethernet and UDP:
  Ethernet.begin(mac, ip);
  Udp.begin(localPort);
}

int contador;
void loop() {
contador = 0;

while(contador < 10000){
  ExibeMensagem();
  contador++;
}
  InformaTemperatura();
}

void ExibeMensagem(){
  int packetSize = Udp.parsePacket();
  if (packetSize)
  {
    Serial.print("Received packet of size ");
    // read the packet into packetBufffer
    Udp.read(packetBuffer, UDP_TX_PACKET_MAX_SIZE);
    Serial.println("Contents:");
    Serial.println(packetBuffer);
  }  
}

void InformaTemperatura(){
  int i = 0;
  if (cont == 500) cont = 0;
  SOMA = 0;
  Serial.print("Temperatura: ");
  for(i = 0; i < 100; i++){
    SOMA = SOMA + readTemperature();    
  }
  cont ++;
  SOMA = SOMA / 100;
  mystring = String(SOMA);
  Serial.println(mystring);
  Serial.print("Contador: ");
  Serial.println(cont);
  Udp.beginPacket(ipServer, localPort);
  Udp.write("{\"temperatura\" : \"");

  zerabuffer();
  for(i =0; i < 5; i++){
    buffer[i] = mystring[i];
  }
  Udp.write(buffer);
  Udp.write("\" , \"cont\" : \"");

  mystring = String(cont);
  zerabuffer();
  for(i =0; i < 5; i++){
    buffer[i] = mystring[i];
  }
  Udp.write(buffer);
  Udp.write("\"}");
  Udp.endPacket(); 
}

void zerabuffer(){
int i;
  for(i = 0; i <= 25; i ++){
    buffer[i] = '\0';  
  }
}
float readTemperature(){
  return (analogRead(LM35) * CELSIUS_BASE); 
}
