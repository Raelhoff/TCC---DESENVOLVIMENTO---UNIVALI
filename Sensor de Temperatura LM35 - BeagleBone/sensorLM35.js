var shell = require('shelljs');     

//voltage = 1;
//shell.echo (voltage);

//voltage = voltage + 1;
//shell.echo (voltage);
var media = 0, contador =0;
while(1){
    contador ++;	
    sensor_output = shell.cat ('/sys/bus/iio/devices/iio:device0/in_voltage0_raw');
    //shell.echo ("Valor Lido: " + sensor_output);
        
    media = media + ((sensor_output)*1.8)/4096.0
   if(contador == 500){
	Temp = ( media / 500) * 100; 
       	shell.echo ("Temperatura: " + Temp);
    	media = 0;
    	contador =0;
   }
}


