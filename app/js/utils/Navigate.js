(function(window)
{
	function Navigate()
	{		
		var self = this;
		var div_holder = '#holder-seccion-loader';
		var objContenido;
		
		self.to = function(seccionName, nodo)
		{					
			$(div_holder).transition({scale : 0.5, duration : 500}).transition({x : -1000, duration : 500}, 800 , 'linear').
			fadeOut(200, function()
			{	
				$(div_holder).empty();		
				
				console.log(seccionName);

				switch(seccionName)
				{
					case 'inicio' : 
						objContenido = new Inicio(); 
					break;
					
					case 'noticias' : 
						objContenido = new Noticias(nodo); 
					break;	
					
					case 'pantallas' : 
						objContenido = new Pantallas(nodo); 
					break;	

					case 'radio' : 
						objContenido = new Radio(nodo); 
					break;														
				}	
				
				$(div_holder).html(objContenido.div);		
			});

			$(div_holder).fadeIn(200).transition({x : 0, duration : 500}).transition({scale : 1, duration : 500});
		}			
	}

	window.Navigate = Navigate;

})(window)
