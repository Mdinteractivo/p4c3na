(function(window)
{
	function Fixture(nodo)
	{
		var self = this;
		var animando = false;
		var array_items = [];
		var delay = 200;		
		var ALTO_HEADER = 180;
		var altoItems = 65;
		var animando = false;
		var altoPantalla = window.innerHeight - ALTO_HEADER;
		var multiplo = Math.ceil((altoPantalla / altoItems));	
		var alturaFinal = (altoItems * multiplo)  - 20;		
		
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

		var holderGrupo = document.createElement('div');
			holderGrupo.className = 'holder-noticia-item';
			$(self.div).append(holderGrupo);
			$(holderGrupo).css({'height' : altoPantalla});

		
		var holderTituloGrupo = document.createElement('div');
			holderTituloGrupo.className = 'wrapper-titulo-noticia';
			$(holderTituloGrupo).css({'background' : 'url(img/general/menu/yellow_item.png) no-repeat'});
			$(holderTituloGrupo).css({'background-size' : '320px 68px'});
			$(holderGrupo).append(holderTituloGrupo);

		var divVolver = document.createElement('div');
			divVolver.className = 'btn-volver-seccion';
			$(holderTituloGrupo).append(divVolver);
			$(divVolver).css({'background' : 'url(img/general/volver_black.png) no-repeat'});
			$(divVolver).css({'background-size' : '16px', 'background-position' : 'left'});			
			$(divVolver).css({'color':'#000'});
	
		var titulo = document.createElement('h1');
			$(titulo).text('FIXTURE DEL MUNDIAL');
			$(titulo).css({'color' : '#000', 'margin-left' : 30});
			$(holderTituloGrupo).append(titulo);

		if(objApp.isTouch())
			$(divVolver).bind('touchstart' , doCloseGrupo);
		else
			$(divVolver).bind('click' , doCloseGrupo);

		var icono = new Image();
			icono.width = 64;
			icono.src = 'img/general/menu/fixture.png?ac=1';
			$(holderTituloGrupo).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 5, 'top' : 0});		
		
		var holderGrupoContenido = document.createElement('div');
			holderGrupoContenido.id = 'holder-grupo-contenido';
			$(holderGrupo).append(holderGrupoContenido);

		$.ajax
		({
			url : objApp.SERVER+'ws/ws-obtenerPartidos.php',
			success : onCompleteXML,
			error : onErrorXML
		});	

		function onCompleteXML(xml)
		{
			var objContenido;
			objApp.ocultarCargador();

			if(parseInt($(xml).find('xml').find('finFases').text()) == 0)
			{
				//fases de grupo	
				objContenido = new FasesDeGrupo(xml, self);
				console.log('FASES');
			}
			else
			{
				//octavos, cuartos, semi y final
				//objContenido = new Versus(xml);
			}
			$(divScroll).append(objContenido.div);	
		}
		
		function onErrorXML()
		{
			objApp.error('Ha ocurrido un error, por favor intenta más tarde');
		}
		
		self.mostrarGrupo = function(grupo)
		{
			console.log(objApp.SERVER);
			if(animando)
				return;

			animando = true;	
			$(holderGrupoContenido).empty();
			
			$.ajax
			({
				url : objApp.SERVER+'ws/ws-obtenerPartidosByGrupo.php',
				type : 'POST',
				data : {'grupo' : grupo},
				success : function(xml)
				{
					objVersus = new Versus(xml);
					$(holderGrupoContenido).append(objVersus.div);
					$(holderItems).transition({scale : 0.5, duration : 500}).transition({opacity : 0});
					$(holderGrupo).stop().delay(500).fadeIn(500, function(){animando = false;});	
				}
			});	
		}
		
		function doCloseGrupo()
		{
			if(animando)
				return;

			animando = true;	
				
			$(holderGrupo).stop().fadeOut(500);
			$(holderItems).delay(500).transition({opacity : 1}).transition({scale : 1, duration : 500});
			animando = false;	
		}	
					
	}
	
	window.Fixture = Fixture;

})(window);


function FasesDeGrupo(xml, parent)
{
	var self = this;
	var placeHolderGrupo;
	var grupoActual = 'R';
	
	self.div = document.createElement('div');
	
	if($(xml).find('xml').find('equipo').length != 0)
	{
		$(xml).find('xml').find('equipo').each(function(index, element) 
		{
			if($(this).find('grupo').text() != grupoActual)
			{
				grupoActual = $(this).find('grupo').text();
				
				placeHolderGrupo = new PlaceHolderGrupo($(this).find('grupo').text(), self);
				$(self.div).append(placeHolderGrupo.div);
			}
			
			placeHolderGrupo.add($(this));	
			/*objItemNovedad = new ItemNovedad($(this), self, index);
			$(divScroll).append(objItemNovedad.div);
			array_items.push(objItemNovedad);*/
		});
	}
	else
		objApp.error('No hay grupos definidos');
		
	self.mostrarGrupo = function(grupo)
	{
		parent.mostrarGrupo(grupo);
	}		
}

function PlaceHolderGrupo(grupo, parent)
{
	var self = this;
	self.div = document.createElement('div');
	self.div.className = 'place-holder-grupo';
	$(self.div).bind('click' , doClick);
	
	var vertical = document.createElement('div');
		vertical.className = 'vertical-fixture';
		$(self.div).append(vertical);

	var texto = document.createElement('p');
		$(texto).text('GRUPO '+grupo);
		$(vertical).append(texto);
	 
	 $(texto).css({'-ms-transform': 'rotate(-90deg)'});
	 $(texto).css({'-moz-transform': 'rotate(-90deg)'});
	 $(texto).css({'-webkit-transform': 'rotate(-90deg)'});
	 $(texto).css({'-o-transform': 'rotate(-90deg)'});
	 $(texto).css({'transform': 'rotate(-90deg)'});	
		
	var holderSelecciones = document.createElement('div');
		holderSelecciones.className = 'holder-selecciones';	
		$(self.div).append(holderSelecciones);
		
	self.add = function(equipo)
	{
		var divSeleccion = document.createElement('div');
			divSeleccion.className = 'seleccion-div';
			$(holderSelecciones).append(divSeleccion);
			
		var divBandera = document.createElement('div');	
			$(divSeleccion).append(divBandera);
			$(divBandera).css({'width' : '100%', 'height' : 45, 'overflow' : 'hidden', 'float' : 'left'});
			
		var bandera = new Image();
			bandera.src = objApp.SERVER+'global/img/banderas/bandera'+$(equipo).find('id').text()+'.png?ac=1';
			bandera.width = 71;
			$(divBandera).append(bandera);

		var divNombre = document.createElement('div');	
			$(divSeleccion).append(divNombre);
			$(divNombre).css({'width' : '100%', 'overflow' : 'hidden', 'float' : 'left'});
			$(divNombre).append('<p>'+$(equipo).find('nombre').text()+'</p>');
	}	
	
	function doClick()
	{
		parent.mostrarGrupo(grupo);
	}	
}

function Versus(xml)
{
	var self = this;
	self.div = document.createElement('div');
	
	if($(xml).find('partido').length == 0)
		objApp.error('No ahay partidos para esta fase');
	else
	{
		$(xml).find('partido').each(function(index, element) 
		{
        	var itemVersus = document.createElement('div');
				itemVersus.className = 'item-versus';
				$(self.div).append(itemVersus);  
        });	
	}
	
}