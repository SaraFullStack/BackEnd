# Ejercicio
Escribe un programa de consola que acepte como su único parámetro de entrada la URL de una
página web. Al ejecutarse el programa, debe acceder a la URL que se le ha pasado como
parámetro, recuperar su contenido, e imprimir por pantalla todas las URLs que haya detectado
en la respuesta devuelta por el servidor.
Puedes usar cualquier lenguaje de programación y cualquier librería que consideres oportuno.

Modifica el programa para que por cada una de las URLs encontradas se haga de nuevo una
petición y se recupere una nueva lista de URLs. El programa debe aceptar por línea de comandos
un parámetro adicional N que indique el “máximo número de iteraciones” que se quieren seguir.
Por ejemplo, para N=3 deberías imprimir los resultados en el siguiente formato:
--- URL-A
--- URL-A-1
--- URL-A-1-1
--- URL-A-1-2
--- URL-A-2
--- URL-A-3
--- URL-B
--- URL-B-1
--- URL-B-2
--- URL-B-3
--- URL-B-3-1
--- URL-C
--- URL-C-1
--- URL-C-2
# INSTALACION
PHP:
1)	Instalar php o WampServer
2)	Instalar comando php
3)	Configurar curl
4)	Php scraping.php
PHYTON:
1)	Instalar phyton
2)	Instalar dependencias
3)	Ejecutar instalador o comando py scraping.py
# DEPENDENCIAS
PHP:
Curl.
PHYTON:
Request, Regex y BeautifulSoup.
