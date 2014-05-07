(function(window)
{
	function Pantallas(nodo)
	{
		var self = this;

		self.div = document.createElement('div');
		self.div.className = 'class-cero';	
					
		var holderItems = document.createElement('div');
			$(self.div).append(holderItems);
			$(holderItems).css({'width' : 320, 'float' : 'left'});
			
		var objTituloSeccion = new TituloSeccion(nodo);
			$(holderItems).append(objTituloSeccion.div);	
			$(self.div).append('<div class="clear"></div>');

		var holderMapa = document.createElement('div');
			holderMapa.className = 'holder-mapa-pantalla';
			$(self.div).append(holderMapa);
		
		/**/
		var holderTituloMapa = document.createElement('div');
			holderTituloMapa.className = 'wrapper-titulo-pantalla';
			$(holderTituloMapa).css({'background' : 'url(img/general/menu/yellow_item.png) no-repeat'});
			$(holderTituloMapa).css({'background-size' : '320px 68px'});
			$(holderMapa).append(holderTituloMapa);

		var divVolver = document.createElement('div');
			divVolver.className = 'btn-volver-seccion';
			$(holderTituloMapa).append(divVolver);
			$(divVolver).css({'background' : 'url(img/general/volver_black.png) no-repeat'});
			$(divVolver).css({'background-size' : '16px', 'background-position' : 'left'});			
			$(divVolver).css({'color':'#000'});

		if(objApp.isTouch())
			$(divVolver).bind('touchend' , doCloseMap);
		else
			$(divVolver).bind('click' , doCloseMap);
			
		var titulo = document.createElement('h1');
			$(titulo).text('DÓNDE VER EL MUNDIAL');
			$(titulo).css({'color' : '#000'});
			$(holderTituloMapa).append(titulo);
		
		var icono = new Image();
			icono.width = 64;
			icono.src = 'img/general/menu/pantallas.png?ac=1';
			$(holderTituloMapa).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 5, 'top' : 0});

		/**/
		var mapaWrapper = document.createElement('div');				
			mapaWrapper.id = 'mapa-wrapper';
			$(holderMapa).append(mapaWrapper);

		var holderDireccion = document.createElement('div');
			holderDireccion.id = 'holder-direccion-pantallas';
			$(holderMapa).append(holderDireccion);

		$.ajax
		({
			url : objApp.SERVER+'ws/ws-tiendas.php',
			success : onCompleteXML,
			error : onErrorXML
		});				
			
		function onErrorXML()
		{
			//objApp.error('Ha ocurrido un error, por favor intenta más tarde');
		}		
		function onCompleteXML(xml)
		{
			if($(xml).find('xml').find('tienda').length != 0)
			{
				$(xml).find('xml').find('tienda').each(function(index, element) 
				{
					objItemPantalla = new ItemPantalla($(this), self, index);
					$(holderItems).append(objItemPantalla.div);
				});
			}
			else
				objApp.error('Actualmente no hay pantallas');				
		}
		self.showMap = function(nodo)
		{
			$(mapaWrapper).empty();
			$(holderDireccion).empty();
			$(holderDireccion).append($(nodo).find('nombre').text()+' '+$(nodo).find('direccion').text());
			
			$(holderItems).transition({scale : 0.5, duration : 500}).transition({opacity : 0});
			$(holderMapa).delay(500).fadeIn(500, function ()
			{
				var lat  = Number($(nodo).find('latitud').text());
				var long = Number($(nodo).find('longitud').text());
		
				var myLatlng = new google.maps.LatLng(lat,long);
				
				var myOptions = 
				{
					zoom: 16,
					center: myLatlng,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				}
				
				var map = new google.maps.Map(document.getElementById("mapa-wrapper"), myOptions);
				
				var marker = new google.maps.Marker
				({
					position  : myLatlng,
					draggable : false,
					animation : google.maps.Animation.DROP,
					title : ""
				});
					
				marker.setMap(map);	
				
			});			
		}	
		
		function doCloseMap()
		{
			$(holderMapa).fadeOut(500);
			$(holderItems).delay(500).transition({opacity : 1}).transition({scale : 1, duration : 500});
		}	
		
		//self.showMap();	
	}
	
	window.Pantallas = Pantallas;

})(window);