(function(window)
{
	function FotosVideos(nodo)
	{
		var self = this;
		var animando = false;
		var array_items = [];
		var delay = 200;		
		var ALTO_HEADER = 180;
		var altoItems = 65;
		
		var altoPantalla = (window.innerHeight - ALTO_HEADER) -5;
		/*var multiplo = Math.ceil((altoPantalla / altoItems));	
		var alturaFinal = (altoItems * multiplo)  - 20;*/
		
		self.div = document.createElement('div');
		self.div.className = 'class-cero';

		var holderItems = document.createElement('div');
			$(self.div).append(holderItems);
			$(holderItems).css({'width' : 320, 'float' : 'left'});
			
		var objTituloSeccion = new TituloSeccion(nodo);
			$(holderItems).append(objTituloSeccion.div);

		var divScroll = document.createElement('div');
			divScroll.className = 'divScroll';
			$(holderItems).append(divScroll);
			$(divScroll).css({'height' : altoPantalla});						

		var holderMedia = document.createElement('div');
			holderMedia.className = 'holder-media-item';
			$(self.div).append(holderMedia);
		
		var holderTituloMedia = document.createElement('div');
			holderTituloMedia.className = 'wrapper-titulo-media';
			$(holderTituloMedia).css({'background' : 'url(img/general/menu/yellow_item.png) no-repeat'});
			$(holderTituloMedia).css({'background-size' : '320px 68px'});
			$(holderMedia).append(holderTituloMedia);

		var divVolver = document.createElement('div');
			divVolver.className = 'btn-volver-seccion';
			$(holderTituloMedia).append(divVolver);
			$(divVolver).css({'background' : 'url(img/general/volver_black.png) no-repeat'});
			$(divVolver).css({'background-size' : '16px', 'background-position' : 'left'});			
			$(divVolver).css({'color':'#000'});
	
		var titulo = document.createElement('h1');
			$(titulo).text('FOTOS Y VIDEOS');
			$(titulo).css({'color' : '#000', 'margin-left' : 30});
			$(holderTituloMedia).append(titulo);

		if(objApp.isTouch())
		{
			$(divVolver).bind('touchstart' , doCloseMedia);
			$(titulo).bind('touchstart' , doCloseMedia);
		}
		else
		{
			$(divVolver).bind('click' , doCloseMedia);
			$(titulo).bind('click' , doCloseMedia);
		}

		var icono = new Image();
			icono.width = 64;
			icono.src = 'img/general/menu/fotos.png?ac=1';
			$(holderTituloMedia).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 5, 'top' : 0});		
		
		var holderMediaContenido = document.createElement('div');
			holderMediaContenido.id = 'holder-media-contenido';
			$(holderMedia).append(holderMediaContenido);
		
		$.ajax
		({
			url : objApp.SERVER+'ws/ws-fotosVideos.php',
			success : onCompleteXML,
			error : onErrorXML
		});	

		function onCompleteXML(xml)
		{
			objApp.ocultarCargador();

			if($(xml).find('xml').find('media').length != 0)
			{
				$(xml).find('xml').find('media').each(function(index, element) 
				{
					objMedia = new ItemMedia($(this), self, index);
					$(divScroll).append(objMedia.div);
					array_items.push(objMedia);
				});
			}
			else
				objApp.error('Actualmente no hay fotos ni videos');
				
				
			for(var i = 0; i < array_items.length; ++i)	
			{
				array_items[i].inicializar(delay);
				delay +=200;
			}	
		}
		
		function onErrorXML()
		{
			objApp.error('Ha ocurrido un error, por favor intenta más tarde');
		}

		self.showMedia = function(nodo)
		{
			if(animando)
				return;
			
			animando = true;	
			$(holderMediaContenido).empty();
			
			if(parseInt($(nodo).find('boolVideo').text()) == 0)
			{
				var imagen = new Image();
					imagen.width = 320;
					imagen.src = objApp.SERVER+'global/img/media/'+$(nodo).find('archivo').text();
					$(holderMediaContenido).append(imagen);
					$(imagen).css({'float' : 'left', 'display' : 'none'});
					$(imagen).load(function()
					{
						$(this).fadeIn();
					});
			}
			else
			{
					$(holderMediaContenido).append
					('<iframe width="320" height="180" src="http://www.youtube.com/embed/'+$(nodo).find('archivo').text()+'?rel=0" frameborder="0" allowfullscreen></iframe>');
			}
			
			var textoTitulo = $(nodo).find('titulo').text().replace(/\\/g, '');
			$(holderMediaContenido).append('<h3>'+textoTitulo+'</h3>');

			var textoP = $(nodo).find('texto').text().replace(/\\/g, '');
			var p = document.createElement('p');
				$(holderMediaContenido).append(p);
				$(p).html(textoP);		
			
			$(holderItems).transition({scale : 0.5, duration : 500}).transition({opacity : 0});
			$(holderMedia).stop().delay(500).fadeIn(500, function(){animando = false;});
		}
		function doCloseMedia()
		{
			$(holderMediaContenido).empty();

			if(animando)
				return;

			animando = true;	
				
			$(holderMedia).stop().fadeOut(500);
			$(holderItems).delay(500).transition({opacity : 1}).transition({scale : 1, duration : 500});
			animando = false;	
		}								
	}
	
	window.FotosVideos = FotosVideos;

})(window);