(function(window)
{
	function ItemNovedad(nodo, parent, indice)
	{
		var self = this;
		
		self.div = document.createElement('div');
		self.div.className = 'item-novedad';
		$(self.div).css({'opacity' : 0});

		if(objApp.isTouch())
			$(self.div).bind('click' , doClick);
		else
			$(self.div).bind('click' , doClick);
							
		var imagenWrapper = document.createElement('div');
			imagenWrapper.className = 'imagen-item-novedad';
			$(self.div).append(imagenWrapper);
			
		var imagen = new Image();
			imagen.width = 92;
			imagen.src = objApp.SERVER+'global/img/noticias/'+$(nodo).find('imagen').text();
			$(imagenWrapper).append(imagen);
			$(imagen).css({'display' : 'none'});
			$(imagen).load(function()
			{
				$(this).fadeIn(500);
			});
		
		var tituloPantalla = document.createElement('div');
			$(tituloPantalla).css({'width' : 200, 'float' : 'left', 'height' : 25, 'overflow' : 'hidden', 'margin-top' : 18});
			$(self.div).append(tituloPantalla);
			
			var textoH4 = $(nodo).find('titulo').text().replace(/\\/g, '');
			$(tituloPantalla).append('<h4>'+textoH4+'</h4>');

		function doClick()
		{
			parent.showNoticia(nodo);
		}

		self.inicializar = function(DELAY)
		{
			$(self.div).css({scale : 0.5}).delay(DELAY).transition({opacity : 1, scale : 1, duration : 500});
		}				
	}
	
	window.ItemNovedad = ItemNovedad;
	
})(window);
