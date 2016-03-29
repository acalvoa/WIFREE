#include <iostream>
#include <fstream>
#include <cstring>
#include "../lib/json/json.hh"
using namespace std;
using json = nlohmann::json;

class Config{
	public:
		Config(){
		}
		//OBTENEMOS LOS DATOS DE LA APP.
		static json getApp(){
			string packagestr = "";
			string cadena;
			ifstream fe("package.json");
			while(!fe.eof()) {
		      	packagestr = packagestr + cadena;
		      	fe >> cadena;
		   	}
		   	fe.close();
		   	json package = json::parse(packagestr);
		   	return package;
		}

};