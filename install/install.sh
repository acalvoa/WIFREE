#!/bin/bash
# INSTALAMOS LOS PAQUETES NECESARIOS
sudo wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
sudo dpkg -i node_latest_armhf.deb
sudo apt-get install hostapd udhcpd
# COPIAMOS LOS ARCHIVOS DE AUTOARRANQUE
sudo cp ./wifree /etc/init.d
sudo chmod ug+x /etc/init.d/wifree 
# COPIAMOS LOS ARCHIVOS DE CONFIGURACION
sudo cp udhcpd /etc/default/udhcpd
# INSCRIBIMOS EL DEMONIO
sudo update-rc.d wifree enable
sudo update-rc.d hostapd enable
sudo update-rc.d udhcpd enable
# INICIAMOS LOS SERVICIOS
sudo service udhcpd start
sudo service hostapd start
exit
