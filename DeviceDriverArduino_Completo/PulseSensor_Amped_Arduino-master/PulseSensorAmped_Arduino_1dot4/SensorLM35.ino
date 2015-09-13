
const int LM35 = A1; // Pino Analogico onde vai ser ligado ao pino 2 do LM35
const int REFRESH_RATE = 5000;  //Tempo de atualização entre as leituras em ms
const float CELSIUS_BASE = 0.4887585532746823069403714565; //Base de conversão para Graus Celsius ((5/1023) * 100)


void zerabuffer(){
int i;
  for(i = 0; i <= 25; i ++){
    buffer[i] = '\0';  
  }
}

void InformaTemperatura(){
  float SOMA = 0;
  int i;
  
  for(i = 0; i < 100; i++){
    SOMA = SOMA + readTemperature();    
  }
 
  SOMA = SOMA / 100;
  mystring = String(SOMA);
  
  Udp.beginPacket(ipServer, localPort);
  Udp.write("{\"temperatura\" : \"");
  zerabuffer();
  for(i =0; i < 5; i++){
    buffer[i] = mystring[i];
  }
  Udp.write(buffer);
  Udp.write("\"}");
  Udp.endPacket(); 
}


float readTemperature(){
  return (analogRead(LM35) * CELSIUS_BASE); 
}
