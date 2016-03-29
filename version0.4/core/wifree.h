#include <iostream>
#include "config.h"
using namespace std;
class wifree{
	public:
		wifree(){
			this->start();
		}
	private:
		void start(){
			json app = Config::getApp();
			cout << "***********************************" << endl;
			cout << "* "<< app["NAME"] <<" "<< app["CODENAME"] << endl;
			cout << "* VERSION: "<< app["VERSION"] << endl;
			cout << "* DESARROLLADOR BACK-END: "<< app["BACKEND"] << endl;
			cout << "* DESARROLLADOR FRONT-END: "<< app["FRONTEND"] << endl;
			cout << "* FECHA: "<< app["LASTUPDATE"] << endl;
			cout << "***********************************');" << endl << endl;
			cout << "INICIALIZANDO APLICATIVO..." << endl;
		}
};