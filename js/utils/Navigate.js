(function(window)
{
	function Navigate()
	{		
		var self = this;
		var div_holder = '#holder-seccion-loader';
		var objContenido;
		
		self.to = function(seccionName, nodo)
		{	
			$('#app').css({	'overflow-y' :'auto', '-webkit-overflow-scrolling' : 'touch'});
			
			$(div_holder).transition({scale : 0.5, duration : 500}).transition({x : -1000, duration : 500}, 800 , 'linear').
			fadeOut(200, function()
			{	
				$(div_holder).empty();		
					
				switch(seccionName)
				{
					case 'inicio' : 
						objContenido = new Inicio(); 
						objApp.ocultarCargador();
						
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

					case 'fotos' : 
						objContenido = new FotosVideos(nodo); 
					break;	
					
					case 'registro' : 
						objContenido = new Registro(); 
					break;

					case 'polla' : 
						$('#app').css({	'overflow-y' :'scroll', '-webkit-overflow-scrolling' : 'touch'});
						objContenido = new Polla(nodo); 
					break;																													
				}	
				
				$(div_holder).html(objContenido.div);		
			});
			
			objApp.mostrarCargador();
			
			$(div_holder).fadeIn(200).transition({x : 0, duration : 500}).transition({scale : 1, duration : 500});
		}			
	}

	window.Navigate = Navigate;

})(window)
