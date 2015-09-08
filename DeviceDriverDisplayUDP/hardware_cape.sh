#!/bin/bash

#--- inicializa SPI
echo "Inicializando SPI"
export SLOTS=/sys/devices/bone_capemgr.*/slots
echo BB-SPIDEV0 > $SLOTS

exit
