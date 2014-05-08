(function(window)
{
	function Registro()
	{
		var self = this;

		self.div = document.createElement('div');
		self.div.className = 'class-cero';

		var holderTituloRegistro = document.createElement('div');
			holderTituloRegistro.className = 'wrapper-titulo-registro';
			$(holderTituloRegistro).css({'background' : 'url(img/general/menu/yellow_item.png) no-repeat'});
			$(holderTituloRegistro).css({'background-size' : '320px 68px'});
			$(self.div).append(holderTituloRegistro);
	
		var titulo = document.createElement('h1');
			$(titulo).text('REGISTRARSE');
			$(titulo).css({'color' : '#000'});
			$(holderTituloRegistro).append(titulo);

		var icono = new Image();
			icono.width = 36;
			icono.src = 'img/general/menu/registrarse.png?ac=1';
			$(holderTituloRegistro).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 20, 'top' : 8});
			
		var holderRegistro = document.createElement('div');
			holderRegistro.id = 'holder-registro';
			$(self.div).append(holderRegistro);
			
		var innerRegistroLoader = document.createElement('div');
			innerRegistroLoader.id = 'inner-holder-registro-loader';
			$(holderRegistro).append(innerRegistroLoader);
			$(innerRegistroLoader).css({opacity : 0});
			
		innerNavigate('connect');
			
		function innerNavigate(innerSeccion)
		{
			$(innerRegistroLoader).transition({opacity : 0,  duration : 500}, 800 , 'linear');
			$(innerRegistroLoader).empty();
			
			switch(innerSeccion)
			{
				case 'connect':
					
					var btnConnect = new BtnConnect(self);
					$(innerRegistroLoader).append(btnConnect.div);
				
				break;

				case 'registroApp':
					
				
				break;				
				
			}
			
			$(innerRegistroLoader).transition({opacity : 1,  duration : 500}, 800 , 'linear');
		}	
		
		self.doConnect = function()
		{
			alert('DO CONNECT');
		}	
	}
	
	window.Registro = Registro;

})(window);