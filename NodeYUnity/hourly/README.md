# Aplicación Unity Hora y Día
Este proyecto sirve para obtener el día y la hora actual, mediante
una aplicación 2D de Unity, o desde un .jade en la web, ambos llaman 
a dos servicios Node y Express para obtener los datos.

## Comenzando 🚀
Los puertos del servidor son 3000 para la hora (Express)
y el puerto 3030 para el día (Node)

### Pre-requisitos 📋
He utilizado Visual Studio Code para crear el servidor, con la versión 
de node Node (LTS) v12.16.0, con el gestor de paquetes npm
Para la parte de Unity la versión  Unity 2019.3.1f1, y Visual Studio
para el Script de Unity en C#.
He probado la .apk y la .aab en Android Studio.

### Instalación 🔧
Para instalar el servidor:
	> npm install

## Construido con 🛠️
	"cookie-parser": "~1.4.4",
    "date-and-time": "^0.12.0",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "morgan": "~1.9.1",
    "request": "^2.88.2"
	"eslint": "^6.8.0"

## Ejecutando las pruebas ⚙️
Parte de Unity:
	Ejecutar el proyecto de Unity
		
Parte del servidor:
Para hacerlo funcionar abrir ambos puertos
Para el puerto 3000:
	> npm start
Para el puerto 3030:
	> npm test
	
☕ El servidor tambien tiene una interfaz gráfica para el navegador, 
en .jade  http://localhost:3000/

Unity ataca al servidor del puerto 3000 y este llamara si es necesario al 3030
para unificar el proceso.

## Autor ✒️
Sara Cubero García-Conde (FullSatck Developer)

