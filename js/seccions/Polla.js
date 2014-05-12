(function(window)
{
	function Polla(nodo)
	{
		var self = this;
		var ALTO_HEADER = 180;
		var altoPantalla = (window.innerHeight - ALTO_HEADER) - 10;
		
		self.div = document.createElement('div');
		self.div.className = 'class-cero';
		
		var objTituloSeccion = new TituloSeccion(nodo);
			$(self.div).append(objTituloSeccion.div);	
			$(self.div).append('<div class="clear"></div>');
			
		var divScroll = document.createElement('div');
			divScroll.className = 'divScroll';
			$(self.div).append(divScroll);
			$(divScroll).css({'height' : altoPantalla});
			
		var holderDatosUsuario = document.createElement('div');
			holderDatosUsuario.id = 'holder-datos-usuario';
			$(divScroll).append(holderDatosUsuario);

		var leftDatosUsuario = document.createElement('div');
			leftDatosUsuario.id = 'left-holder-datos-usuario';
			$(holderDatosUsuario).append(leftDatosUsuario);			
		
		var holderFoto = document.createElement('div');
			$(leftDatosUsuario).append(holderFoto);

		var rightDatosUsuario = document.createElement('div');
			rightDatosUsuario.id = 'right-holder-datos-usuario';
			$(holderDatosUsuario).append(rightDatosUsuario);
		
		/**/
		var nombreApellidoTitulo = document.createElement('p');
			nombreApellidoTitulo.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(nombreApellidoTitulo);
			$(nombreApellidoTitulo).text('Nombre y apellidos :');

		var nombreApellido = document.createElement('p');
			nombreApellido.className = 'holder-profile-texto';
			$(rightDatosUsuario).append(nombreApellido);
			$(nombreApellido).text('Juan Carlos Gonzalez');
		
		/**/
		var correoTitulo = document.createElement('p');
			correoTitulo.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(correoTitulo);
			$(correoTitulo).text('Correo eléctronico :');

		var correo = document.createElement('p');
			correo.className = 'holder-profile-texto';
			$(rightDatosUsuario).append(correo);
			$(correo).text('jonzalez@gmail.com');
			
		/**/
		var fechaTitulo = document.createElement('p');
			fechaTitulo.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(fechaTitulo);
			$(fechaTitulo).text('Fecha de nacimiento :');

		var fecha = document.createElement('p');
			fecha.className = 'holder-profile-texto';
			$(rightDatosUsuario).append(fecha);
			$(fecha).text('15/10/1985');			

		/**/
		var clasificacionTitulo = document.createElement('p');
			clasificacionTitulo.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(clasificacionTitulo);
			$(clasificacionTitulo).append('Clasificació Gral : <span style="color:#333; text-decoration:none">30000</span>');

		/**/
		var clasificacionAmigosTitulo = document.createElement('p');
			clasificacionAmigosTitulo.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(clasificacionAmigosTitulo);
			$(clasificacionAmigosTitulo).append('Clasificación entre amigos : <span style="color:#333; text-decoration:none">200</span>');

		/**/
		var puntos = document.createElement('p');
			puntos.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(puntos);
			$(puntos).append('Puntos : <span style="color:#333; text-decoration:none">2</span>');

		/**/
		var pronosticos = document.createElement('p');
			pronosticos.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(pronosticos);
			$(pronosticos).append('Pronósticos : <span style="color:#333; text-decoration:none">6</span>');

		var equiposTitulo = document.createElement('p');
			equiposTitulo.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(equiposTitulo);
			$(equiposTitulo).text('Equipos Favoritos :');

		var ulEquipos = document.createElement('ul');
			ulEquipos.className = 'holder-profile-texto';
			$(rightDatosUsuario).append(ulEquipos);
			
			$(ulEquipos).append('<li>Uruguay</li>');
			$(ulEquipos).append('<li>Brasil</li>');
			$(ulEquipos).append('<li>Alemania</li>');
			$(ulEquipos).append('<li>Francia</li>');
			$(ulEquipos).append('<li>Argentina</li>');
			

		/*PANEL PARTICIPACIONES*/
		var holderParticipaciones = document.createElement('div');
			holderParticipaciones.id = 'holder-participaciones-polla';
			$(divScroll).append(holderParticipaciones);
			
		var holderPanelParticipacionesTitulo = document.createElement('div');
			holderPanelParticipacionesTitulo.className = 'wrapper-titulo-noticia';
			$(holderPanelParticipacionesTitulo).css({'background' : 'url(img/general/menu/red_item.png) no-repeat'});
			$(holderPanelParticipacionesTitulo).css({'background-size' : '320px 68px'});
			$(holderParticipaciones).append(holderPanelParticipacionesTitulo);
	
		var titulo = document.createElement('h1');
			$(titulo).text('Partidos Jugados');
			$(titulo).css({'color' : '#FFF', 'margin-left' : 30});
			$(holderPanelParticipacionesTitulo).append(titulo);		

		var icono = new Image();
			icono.width = 64;
			icono.src = 'img/general/menu/polla.png?ac=1';
			$(holderPanelParticipacionesTitulo).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 5, 'top' : 0});		
		
		var holderParticipacionesContenido = document.createElement('div');
			holderParticipacionesContenido.id = 'holder-noticia-contenido';
			$(holderParticipaciones).append(holderParticipacionesContenido);
			$(holderParticipacionesContenido).css({'min-height' : 200});


		/*PANEL PROXIMOS*/
		var holderProximos = document.createElement('div');
			holderProximos.id = 'holder-proximos-polla';
			$(divScroll).append(holderProximos);
			
		var holderPanelProximosTitulo = document.createElement('div');
			holderPanelProximosTitulo.className = 'wrapper-titulo-noticia';
			$(holderPanelProximosTitulo).css({'background' : 'url(img/general/menu/red_item.png) no-repeat'});
			$(holderPanelProximosTitulo).css({'background-size' : '320px 68px'});
			$(holderProximos).append(holderPanelProximosTitulo);
	
		var titulo = document.createElement('h1');
			$(titulo).text('Próximos partidos');
			$(titulo).css({'color' : '#FFF', 'margin-left' : 30});
			$(holderPanelProximosTitulo).append(titulo);		

		var icono = new Image();
			icono.width = 64;
			icono.src = 'img/general/menu/polla.png?ac=1';
			$(holderPanelProximosTitulo).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 5, 'top' : 0});		
		
		var holderProximosContenido = document.createElement('div');
			holderProximosContenido.id = 'holder-noticia-contenido';
			$(holderProximos).append(holderProximosContenido);
			$(holderProximosContenido).css({'min-height' : 200});
		
		objApp.ocultarCargador();
		
	}
	
	window.Polla = Polla;

})(window);