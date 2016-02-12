#!/bin/bash
# VACIAMOS LAS TABLAS DISPONBILES
sudo iptables -t nat -F
sudo iptables -t filter -F
sudo iptables -t mangle -F
# BORRAMOS LAS CADENAS EN CASO DE EXISTIR
sudo iptables -X internet -t mangle
sudo iptables -X facebooklist -t mangle
sudo iptables -X facebookip -t mangle
# CREAMOS A LAS NUEVAS CADENAS INTERNET, FACEBOOKLIST Y FACEBOOKIP
sudo iptables -N internet -t mangle
sudo iptables -N facebooklist -t mangle
sudo iptables -N facebookip -t mangle
# COMENZAMOS CON LA REGLA PARA LA TABLA MANGLE CADENA PREROUTING
sudo iptables -t mangle -A PREROUTING -j internet
# VERIFICAMOS SI ES UNA MAC CONOCIDA (LISTA DINAMICA) 
#iptables -t mangle -A internet -m mac --mac-source [[MAC]] -j RETURN
# VERIFICAMOS SI LA PETICION PROVIENE DEL CRM Y DEVOLVEMOS A PREROUTING EN CASO DE SER CIERTO
#iptables -t mangle -A internet -s [[IPCRM]] -j MARK --set-mark 12
sudo iptables -t mangle -A internet -m mark --mark 12 -j RETURN
# EN CASO CONTRARIO MARCAMOS EL PAQUETE y DEVOLVEMOS A LA CADENA PREROUTING
sudo iptables -t mangle -A internet -j MARK --set-mark 10
sudo iptables -t mangle -A internet -j RETURN
# EN LA CADENA PREROUTING PREGUNTAMOS SI TIENE MARCA 10 PARA CORROBORAR SI HAY ACCESO TEMPORAL A FACEBOOK. EN CASO CONTRARIO SE DEVUELVE --> LABEL A
sudo iptables -t mangle -A PREROUTING -m mark --mark 10 -j facebooklist
# CORROBORAMOS SI ES UNA MAC AUTORIZADA PARA TENER ACCESO TEMPORAL (LISTA DINAMICA)
#sudo iptables -t mangle -A facebooklist -m mac --mac-source [[MACFB]] -j facebookip 
# VERIFICAMOS CONTRA LA GRANJA DE IPS DE FACEBOOK y MARCAMOS EL PAQUETE COMO 12 EN CASO DE SER CIERTO (LISTA DINAMICA)
#iptables -t mangle -A facebookip -s [[IPFACEBOOK]] -j MARK --set-mark 11
#iptables -t mangle -A facebookip -d [[IPFACEBOOK]] -j MARK --set-mark 11
# Y EN AMBOS CASO DEVOLVEMOS A LA CADENA PREROUTING PASANDO POR FACEBOOKLIST SI ES NECESARIO
sudo iptables -t mangle -A facebookip -j RETURN
# LABEL A:
sudo iptables -t mangle -A facebooklist -j RETURN
sudo iptables -t mangle -A PREROUTING -j MARK --set-mark 15
# SE PASA A LA TABLA NAT CADENA PREROUTING
# SE VERIFICA SI EL PAQUETE ESTA MARCADO COMO 10. EN CASO FAVORABLE SE VERIFICA SI LA PETICION ES EN EL PUERTO 80 o 443. EN CASO CONTRARIO SE DEVUELVE --> LABEL B
# SI CONCUERDA CON LA PETICION ANTERIOR (TRUE) SE HACE DNAT Y LUEGO DE DEVUELVE
#iptables -t nat -A PREROUTING -m mark --mark 10 -p tcp --dport 80 -j DNAT --to-destination [[SERVERROUTER]]:[[PORTROUTER]]
#iptables -t nat -A PREROUTING -m mark --mark 10 -p tcp --dport 443 -j DNAT --to-destination [[SERVERROUTER]]:[[PORTROUTER]]
# LABEL B: ES UNA ACCION DEFAULT POR TERMINO DE LA CADENA
# CAMINO 1 : INPUT (PAQUETE LOCAL) / SALTAMOS CADENA MANGLE
# VERIFICAMOS SI TIENE LA MARCA 12 Y ACEPTAMOS EN CASO DE TENERLA
sudo iptables -t filter -A INPUT -m mark --mark 12 -j ACCEPT
sudo iptables -t filter -A INPUT -m mark --mark 15 -j ACCEPT
# EN CASO CONTRARIO VERIFICAMOS SI ES UNA PETICION EN EL PUERTO 80 O 443
sudo iptables -t filter -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -t filter -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -t filter -A INPUT -j DROP
# CAMINO 2 : FOWARD (PAQUETE HACIA FORWARD) / SALTAMOS CADENA MANGLE
# VERIFICAMOS SI TIENE LA MARCA 10 Y DESCARTAMOS SSI ES CIERTO
sudo iptables -t filter -A FORWARD -m mark --mark 10 -j DROP
# EN CASO DE TENER LA MARCA 11 (FACEBOOK) O NO TENERLA
# VERIFICAMOS SI VIENE DESDE EL EXTERIOR Y SI ES UNA CONEXION ESTABLECIDA (ESTABLISHED/RELATED) Y ACEPTAMOS EN CASO DE SER CIERTO. SE DESCARTA SINO ES ASI --> LABEL C
sudo iptables -t filter -A FORWARD -i wlan0 -o eth0 -m state --state ESTABLISHED,RELATED -j ACCEPT
# SI VIENE DESDE EL INTERIOR SE ACEPTA LA PETICION
sudo iptables -t filter -A FORWARD -i eth0 -o wlan0 -j ACCEPT
# LABEL C:
sudo iptables -t filter -A FORWARD -j DROP
# APLICAMOS LA REGLA DE NAT POSROUTING SALTANDONOS LA CADENA MANGLE
sudo iptables -t nat -A POSTROUTING -j MASQUERADE
