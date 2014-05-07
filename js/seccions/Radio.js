(function(window)
{
	function Radio(nodo)
	{
		var self = this;

		self.div = document.createElement('div');
		self.div.className = 'class-cero';	
					
		var objTituloSeccion = new TituloSeccion(nodo);
			$(self.div).append(objTituloSeccion.div);	
			$(self.div).append('<div class="clear"></div>');
		
		var wrapperRadio = document.createElement('div');
			wrapperRadio.id = 'holder-radio-contenido';
			$(self.div).append(wrapperRadio);
			
		$(wrapperRadio).append('<h3>Haz click en el siguiente link para oir la transmisión:</h3>');				
		
		var linkRadio = document.createElement('p');
			$(linkRadio).text('www.foxsportsradio.com');
			$(wrapperRadio).append(linkRadio);
			$(linkRadio).bind('click' , doClick);

		if(objApp.isTouch)
			$(linkRadio).bind('touchend', doClick);
		else
			$(linkRadio).bind('click', doClick);
			
		var holderTransmitiendo = document.createElement('div');
			
		function doClick()
		{
			try
			{
				window.open('http://www.foxsportsradio.com', '_system');
			}
			catch(e)
			{
				window.open('http://www.foxsportsradio.com', '_blank');
			}
		}	
	}
	
	window.Radio = Radio;

})(window);