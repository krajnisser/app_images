Hacer "npm install" antes de ejecutar "ionic serve".

La aplicación muestra, desde la url "https://i.picsum.photos/id/id_incremental/500/500", 4000 fotos (con posibilidad de cambiar el número de fotos) respecto a un id generado de manera aleatoria,
y un texto en cada foto generado también de manera aleatoria.
Cuenta con un buscador en la parte superior que permite mostrar sólo aquellas fotos que contengan el texto o el id que se está introduciendo en el cuadro de búsqueda.
La carga de las fotos, para que sea óptimo, se realiza conforme el usuario realiza scroll.

Los componentes utilizados son:

 	1.- HomeComponent: Este componente es el que se muestra como página principal al iniciar la aplicación. Contiene el componente
 	del cuadro de búsqueda, así como los cards donde se muestran las fotos. A su vez, se hace uso del "scroll infinito" de ionic,
 	que es el que se encarga de hacer la carga dinámica con el scroll de la pantalla.
	
	Con respecto a la vista (HTML), se está haciendo uso del componente SearchBarComponent para el filtro, donde se está haciendo
	uso de las funciones @Output(), en este caso (filterOutput) que ejecutará, a su vez, la función filterImages cuando en el componente
	hijo (SearchBarComponent) se lance el evento ionInput (es decir, cuando el usuario introduce caracteres).
	Esta función será la que se encargue de filtrar las fotos.

	También se está llamando al componente ImageCardComponent pasándole dos parámetros (url y text) que son variables que el propio
	componente está esperando que se le pase como entrada, haciendo uso de @Input().

	Con respecto al controlador (.ts), en la función ngOnInit que se ejecuta al crear el componente, se está haciendo la carga de los datos.
	Como se pedía que hubiera un array de 4000 elementos, en esta carga inicial se rellena completamente la variable "randomPhotos", aunque luego
	las fotos que se muestran serán las que se encuentran en la variable "filteredPhotos". En esta carga inicial, esta variable se rellena
	con los primeros elementos de "randomPhotos". De esta manera, desde el principio ya contamos con el array completamente relleno.
	La función filterImages es la que se encarga de filtrar las fotos de "randomPhotos" con el criterio de búsqueda y se 
	actualizar "filteredPhotos" (las que se muestran). Antes de hacer este filtro, se está reseteando esta variable, ya que, si hemos filtrado
	muchas fotos porque hemos introducido muchos caracteres, conforme se borran estos caracteres, esta variable ya estaría filtrada de manera
	que no se volverían a mostrar las fotos con menos caracteres de búsqueda.

	Por último, la función onScroll se encarga de ir rellenando "filteredPhotos" conforme se hace scroll y mientras no se haya llegado al número
	de fotos totales. Esta es la función que se ejecuta con el "infinite scroll" de ionic.

	Este controlador tiene varias variables que se podrían cambiar:
		- width: ancho de las fotos.
		- height: altura de las fotos.
		- iterations: número de iteraciones, es decir, la cantidad de fotos totales.
		- numberOfRandoms: indica que el número random a generar para el id de las fotos será de 0 a numberOfRandoms.
		- photoPerPage: número de fotos que se muestran por cada carga.
		- loremIpsumLength: longitud del texto generado aleatoriamente.



	2.- ImageCardComponent: Este componente se encarga de pintar las fotos en cards (ion-card). Las fotos que se deben mostrar se les pasa como
	parámetro desde HomeComponent en la variable "url". A su vez, también se le está pasando com parámetro el texto generado de manera random.
	Se ha decidido pintar las fotos en un componente aparte, para que sea más limpio a la hora de añadir funcionalidades a las tarjetas con las fotos.

	
	
	3.- SearchBarComponent: Se encarga de realizar el filtrado de las fotos. Al introducir caracteres, se lanza la función filterImages mediante el evento
	ionInput, que ejecuta, como he mencionado anteriormente, la función del componente padre HomePage que filtra la variable con las fotos.
	Tiene un timeOut y un clearTimeout, para hacer la experiencia de usuario más cómoda, de manera de que, si el usuario escribe varios caracteres muy
	rápidamente, no se esté lanzando el filtro y mostrando las fotos filtradas por cada caracter que introduce, si no que haya un delay y sólo se filtre
	cuando lleva 300 milisegundos sin introducir nada.

	Nuevamente, se ha decidido implementarlo en un componente, para que sea más fácil y limpio añadir funcionalidades al filtro.
