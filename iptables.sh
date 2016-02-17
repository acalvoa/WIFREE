#!/bin/bash
sudo su
# VACIAMOS LAS TABLAS DISPONBILES
iptables -t nat -F
iptables -t filter -F
iptables -t mangle -F
# CREAMOS A LAS NUEVAS CADENAS INTERNET, FACEBOOKLIST Y FACEBOOKIP
iptables -N internet -t mangle
iptables -N facebooklist -t mangle
iptables -N faebookip -t mangle
# COMENZAMOS CON LA REGLA PARA LA TABLA MANGLE PREROUTING
iptables -t mangle -I PREROUTING -j internet

