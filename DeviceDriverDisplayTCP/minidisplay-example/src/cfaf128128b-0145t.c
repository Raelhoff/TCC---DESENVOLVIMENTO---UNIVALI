#include <stdio.h>
#include <stdarg.h>
#include <stdlib.h>
#include <errno.h>
#include <stdint.h>
#include <unistd.h>
#include <fcntl.h>
#include <inttypes.h>
#include "spi-driver.h"
#include "cfaf128128b-0145t.h"
#include "boris-image.h"
#include "Fontes.h"
#include <string.h>
#include <sys/types.h> 
#include <sys/socket.h>
#include <netinet/in.h>
 
#define BUFLEN 512  //Max length of buffer

 
void die(char *s)
{
    perror(s);
    exit(1);
}


#define pabort(s) {perror(s); abort();}

typedef struct _6bit { int val:6;} uint6_t;

typedef struct _bitDStruct {
  unsigned int b0:1;
  unsigned int b1:1;
  unsigned int b2:1;
  unsigned int b3:1;
  unsigned int b4:1;
  unsigned int b5:1;
  unsigned int b6:1;
  unsigned int b7:1;
} bitDStruct;

typedef struct _pixel { int val:12;} uint12_t;

typedef struct _Transfer {
  uint8_t data;
  uint8_t type:1;
  uint8_t pad:7;
} Transfer;

char tbufferDisplay[128][128];

int BitRead(char a,int b)
{
    int x =0; 
 
    x = (a >> b) & 1; 
    return x;
}
 

static int initResetPin(){
  int ret = 0;
  FILE* ex = fopen("/sys/class/gpio/export","w");
  fprintf(ex,"49");
  fclose(ex);
  
  if(errno!=0)
    errno=0;
    
  FILE* pindir = fopen("/sys/class/gpio/gpio49/direction","w");
  fprintf(pindir,"out");
  fclose(pindir);
  
  FILE* pinval = fopen("/sys/class/gpio/gpio49/value","w");
  fprintf(pinval,"0");
  fclose(pinval);
  
  return ret;
}

static void resetClear(){
  FILE* pin = fopen("/sys/class/gpio/gpio49/value","w");
  fprintf(pin,"0");
  fclose(pin);
}

static void resetSet(){
  FILE* pin = fopen("/sys/class/gpio/gpio49/value","w");
  fprintf(pin,"1");
  fclose(pin);
}

int LCDSendCommand(int len, ...){
  if(len < 1)
    return 0;

  va_list ap;

  va_start(ap, len);
  
  Transfer *transfer_buffer = (Transfer *)malloc(sizeof(Transfer)*len);
  int ret = 0;
  int repack = 0;
    
  for(repack=0;repack<len;repack++){
    int data = va_arg(ap, int);
    transfer_buffer[repack].data = (uint8_t)data;
    if(repack==0){
      transfer_buffer[repack].type=0;
    }else{
      transfer_buffer[repack].type=1;
    }
  }

  ret = SPIWriteChunk(transfer_buffer, len*sizeof(Transfer));
  
  va_end(ap);

  free(transfer_buffer);

  return ret;
}

void init_tft(int deviceNum) {
  int ret=0;
  int SPISpeed = 15000000;
  ret = initResetPin();

  if(ret == -1){
    pabort("Unable to initialize reset PIN");
  }
  
  ret = SPIInit(deviceNum, 9, SPISpeed);
  if(ret < 0){
    pabort("Unable to initialize SPI");
  }

  //***************************RESET LCD Driver*******************************
  // SET RST Pin high
  resetSet();
  usleep(1000);

  // SET RST Pin low
  resetClear();
  usleep(20000);

  // SET RST Pin high
  resetSet();
  usleep(120000);

  LCDSendCommand(1, 0x11); // Sleep out and charge pump on
  usleep(120000);

  LCDSendCommand(4, 0xB1, 0x02, 0x25, 0x36); //SETPWCTR

  LCDSendCommand(4, 0xB2, 0x02, 0x35, 0x36); //SETDISPLAY 

  LCDSendCommand(7, 0xB3, 0x02, 0x35, 0x36, 0x02, 0x35, 0x36); //Doesn't exist

  LCDSendCommand(2, 0xB4, 0x07); //SETCYC

  LCDSendCommand(4, 0xC0, 0xA2, 0x02, 0x04); //SETSTBA

  LCDSendCommand(2, 0xC1, 0xC5); //Doesn't exist

  LCDSendCommand(3, 0xC2, 0x0D, 0x00); //Doesn't exist

  LCDSendCommand(3, 0xC3, 0x8D, 0x1A); //SETID

  LCDSendCommand(3, 0xC4, 0x8D, 0xEE); //Doesn't exist

  LCDSendCommand(2, 0xC5, 0x09); //Doesn't exist

  LCDSendCommand(17, 0xE0, 0x0A, 0x1C, 0x0C, 0x14, 0x33, 0x2B, 0x24, 0x28, 0x27, 0x25, 0x2C, 0x39, 0x00, 0x05, 0x03, 0x0D);

  LCDSendCommand(17, 0xE1, 0x0A, 0x1C, 0x0C, 0x14, 0x33, 0x2B, 0x24, 0x28, 0x27, 0x25, 0x2C, 0x39, 0x00, 0x05, 0x03, 0x0D);

  LCDSendCommand(2, 0x3A, 0x06); // set for 3-wire 18-bits per pixel

  LCDSendCommand(1, 0x29);
  usleep(150);

}

  
void setOrientation(int orientation) {
  switch(orientation) {
    case 0:
      LCDSendCommand(5, 0x2A, 0x00, 0x02, 0x00, 0x81);
      LCDSendCommand(5, 0x2B, 0x00, 0x01, 0x00, 0x80);
      LCDSendCommand(2, 0x36, 0x40);
      break;
    case 1:
            LCDSendCommand(5, 0x2A, 0x00, 0x03, 0x00, 0x82);
      LCDSendCommand(5, 0x2B, 0x00, 0x02, 0x00, 0x81);  
      LCDSendCommand(2, 0x36, 0xE0);
      break;
    case 2:
      LCDSendCommand(5, 0x2A, 0x00, 0x02, 0x00, 0x81);
      LCDSendCommand(5, 0x2B, 0x00, 0x03, 0x00, 0x82);
      LCDSendCommand(2, 0x36, 0x80);
      break;
    case 3: 
      LCDSendCommand(5, 0x2A, 0x00, 0x01, 0x00, 0x80);
      LCDSendCommand(5, 0x2B, 0x00, 0x02, 0x00, 0x81);
      LCDSendCommand(2, 0x36, 0x20);
      break;
  }
}

void fillScreenRandom(){
  int i = 0;
  char inbyte;
  Transfer tbuffer[491512];
  FILE *random = fopen("/dev/urandom", "r");

  LCDSendCommand(1, 0x2C);

  for(i=0;i<49152;i++){
    fread(&inbyte, 1, 1, random);
    tbuffer[i].data = inbyte;
    tbuffer[i].type = 1;  
  }

  void *buff_ptr = tbuffer;
  for(i=0;i<128;i++){
    SPIWriteChunk(buff_ptr, 768);
    buff_ptr += 768;
  }

  fclose(random);
}


void displayimage(){

char pixel[5], *data = header_data;
int i = width * height;
Transfer tbuffer[7];
void *buff_ptr = tbuffer;

    LCDSendCommand(1, 0x2C);

    while(i-- > 0) {
  HEADER_PIXEL(data,pixel);

  tbuffer[0].data=( 0xff);
  tbuffer[0].type=1;

  tbuffer[1].data=(0xff);
  tbuffer[1].type=1;

  tbuffer[2].data=(0xff);
  tbuffer[2].type=1;

  SPIWriteChunk(buff_ptr, 6);

    }

}

void fillScreenBars(){
    int i = 0;
    Transfer tbuffer[49152];

    LCDSendCommand(1, 0x2C);

    for(i=0;i<49152;i++){
        if(((i%3) == 0 && (i%384)>=256) ||
           ((i%3) == 1 && (i%384)>=128 && (i%384)<256) || 
           ((i%3) == 2 && (i%384)<128)){
            tbuffer[i].data = 0xFF;
            tbuffer[i].type = 1;
        }else{
            tbuffer[i].data = 0x00;
            tbuffer[i].type = 1;
        }
    }

    void *buff_ptr = tbuffer;
    for(i=0;i<128;i++){
        SPIWriteChunk(buff_ptr, 768);
        buff_ptr += 768;
    }
}

void VerificaTelaEsquerda(){
  int i, j;

  for(i = 0; i < 128; i ++){
    for(j = 0; j < 128; j ++){
      if( (i%2) == 0){
        tbufferDisplay[i][j] = '1'; 
      }else{
        tbufferDisplay[i][j] = '0';  
      }
    }
  }
} 

void VerificaTelaDireita(){
  int i, j;

  for(i = 0; i < 128; i ++){
    for(j = 0; j < 128; j ++){
      if( (j%2) == 0){
        tbufferDisplay[i][j] = '1'; 
      }else{
        tbufferDisplay[i][j] = '0';  
      }
    }
  }
} 


void LimpaDisplay(){
  int i, j;

  for(i = 0; i < 128; i ++){
    for(j = 0; j < 128; j ++){
        tbufferDisplay[i][j] = '0'; 
    }
  }
} 

int RertornaPosicaoCaracter(char cCaracter){
  int i, GuardaPosicao = -1;

  for( i = 0; i < 150; i++){
    if(cCaracter == FontesDisplay[i].cCaracter){
      GuardaPosicao = i;
      break;
    }
  }

  return GuardaPosicao;
}

char RetornaLinhaCaracter( int nPosicao, int nLinha){
    return FontesDisplay[nPosicao].mcLinha[nLinha];
}

void EscreveCaracterMemoria(int x, int y, char cCaracter){
int PosicaoInicialY, finalx, finaly, PosicaoBuffer, contadorX, contadorY;
char cCaracterPintar;

  contadorX = 0;
  contadorY = 0;
  PosicaoInicialY = y;
  finalx = x + 7;
  finaly = y + 7;
  /////////////////////////

  PosicaoBuffer =  RertornaPosicaoCaracter(cCaracter); 
  
  for( x; x < finalx; x++){
   // printf("\n x: %d \n", x); 
     cCaracterPintar = RetornaLinhaCaracter( PosicaoBuffer, contadorX);
     contadorX++;
     contadorY = 0;    

    for(y = PosicaoInicialY; y < finaly; y++){
        if(BitRead(cCaracterPintar, contadorY)){
             tbufferDisplay[x][y] = '1';
        }else{
             tbufferDisplay[x][y] = '0';
        }
        contadorY++;  
    }
  }

}


void EscreveSPI(){
  Transfer tbuffer[7];
  void *buff_ptr = tbuffer;
  int i, j;

  LCDSendCommand(1, 0x2C);

  for(i = 0; i < 128; i ++){
    for(j = 0; j < 128; j ++){
      
        if(tbufferDisplay[i][j]  == '1' ){
            tbuffer[0].data=(0xff);
            tbuffer[0].type=1;

            tbuffer[1].data=(0xff);
            tbuffer[1].type=1;

            tbuffer[2].data=(0xff);
            tbuffer[2].type=1;
                
            SPIWriteChunk(buff_ptr, 6);

        }else{
            tbuffer[0].data=(0x00);
            tbuffer[0].type=1;

            tbuffer[1].data=(0x00);
            tbuffer[1].type=1;

            tbuffer[2].data=(0x00);
            tbuffer[2].type=1;

            SPIWriteChunk(buff_ptr, 6);
       }
    }
  }
}

void EscreveStringLinha(int x, int y, char cCaracter){
      EscreveCaracterMemoria(x, y, cCaracter);
}

void EscreveString (char * sString){
  int i, contador = 0, contX, contY; 

  contador = strlen(sString);
  contY = 120;
  contX = 2;

  for( i = 0; i <= strlen(sString); i ++){
    //printf("Entro %d \n", i);

    if(contY == 120 && sString[i] == ' '){
      printf("Nao escreve Linha - primeira Letra\n");
      i++;
    }
    
    EscreveStringLinha(contX , contY, sString[i]);
      

      if(sString[i] == ' '){
        contY = contY - 4;  
      } else{
          contY = contY - 8;
      }
      
      if(contY <= 0){
        contY = 120;
        contX = contX + 12;
      }
  }
}

void error(const char *msg)
{
    perror(msg);
    exit(1);
}

int main(int Tipo, char *argv[]){
  int cont, contador;
  char greeting[200];
  int sockfd, newsockfd, portno;
  socklen_t clilen;
  char buffer[256];
  struct sockaddr_in serv_addr, cli_addr;
  int n;
    

  init_tft(0);
  setOrientation(0);
  LCDSendCommand(1, 0x2C);

  displayimage();
  
  // Inicializa
  if(Tipo == 1){
    printf("SEND_EXIT\n");
    return 0;
  }else

  if(Tipo == 2){ // TCP
     sockfd = socket(AF_INET, SOCK_STREAM, 0);
     if (sockfd < 0) 
        error("ERROR opening socket");
     bzero((char *) &serv_addr, sizeof(serv_addr));
     portno = atoi(argv[1]);
     printf("TCP Porta: %d\n",portno);
     
     serv_addr.sin_family = AF_INET;
     serv_addr.sin_addr.s_addr = INADDR_ANY;
     serv_addr.sin_port = htons(portno);
     if (bind(sockfd, (struct sockaddr *) &serv_addr,
              sizeof(serv_addr)) < 0) 
              error("ERROR on binding");
     listen(sockfd,5);

     clilen = sizeof(cli_addr);
     newsockfd = accept(sockfd, 
                 (struct sockaddr *) &cli_addr, 
                 &clilen);

  while(true){
     
     if (newsockfd < 0) 
          error("ERROR on accept");
     bzero(buffer,256);
     n = read(newsockfd,buffer,255);
     if (n < 0) error("ERROR reading from socket");
     printf("Here is the message: %s\n",buffer);
     LimpaDisplay();
     EscreveSPI(); 
     EscreveString(buffer);  
     EscreveSPI();
     n = write(newsockfd,"I got your message",18);
     
     if (n < 0) error("ERROR writing to socket");
    }

    close(newsockfd);
    close(sockfd);
    return 0;
  }else
  {
    printf("Comando local!! \n\n");
    strcpy (greeting, "");
    contador = 0;
  
    for(cont = 1; cont < Tipo; cont++){
        printf("%d Parametro: %s\n", cont,argv[cont]);
        strcat (greeting, argv[cont]);
        strcat (greeting, " ");
    }
  
    printf("Parametro greeting: %s \n \n ", greeting);
    LimpaDisplay();
    EscreveSPI(); 
    EscreveString(greeting);  
    EscreveSPI();
    printf("Sucesso \n ");
    return 0;
  }
}
