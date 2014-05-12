(function(window)
{
	function ItemMedia(nodo, parent, indice)
	{
		var self = this;
		
		self.div = document.createElement('div');
		self.div.className = 'item-media';
		$(self.div).css({'opacity' : 0});
		
		if(objApp.isTouch())
			$(self.div).bind('click' , doClick);
		else
			$(self.div).bind('click' , doClick);
					
		/*if(indice == 0)
			$(self.div).css({'margin-top' : -8});*/
		
		var imagenWrapper = document.createElement('div');
			imagenWrapper.className = 'imagen-item-media';
			$(self.div).append(imagenWrapper);
		
		if(parseInt($(nodo).find('boolVideo').text()) != 1)
		{
			var imagen = new Image();
				imagen.width = 92;
				imagen.src = objApp.SERVER+'global/img/media/'+$(nodo).find('archivo').text();
				$(imagenWrapper).append(imagen);
			
			var tituloPantalla = document.createElement('div');
				$(tituloPantalla).css({'width' : 218, 'float' : 'left', 'height' : 55});
				$(self.div).append(tituloPantalla);
				$(tituloPantalla).append('<h4>'+$(nodo).find('titulo').text()+'</h4>');
		}	

		function doClick()
		{
			parent.showMedia(nodo);
		}

		self.inicializar = function(DELAY)
		{
			$(self.div).css({scale : 0.5}).delay(DELAY).transition({opacity : 1, scale : 1, duration : 500});
		}										
	}
	
	window.ItemMedia = ItemMedia;

})(window);