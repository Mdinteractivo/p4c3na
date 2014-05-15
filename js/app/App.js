var objApp;

(function(window)
{	
	App.Navigate;
	App.Cargador;
	App.CheckConnection;
	
	function App()
	{
		var self = this;
		var xmlSite;
		var seccionsSite = [];
		var ALTO_HEADER = 180;
		var uuid;
		var xmlDataUser;
		
		self.idUsuario;
		self.VERSION;	
		self.TITLE;	
		self.DESCRIPTION;	
		self.FB_APP_ID;
		self.SERVER;
						
		var wholeWrapper = document.createElement('div');
			wholeWrapper.id = 'app';
			$(wholeWrapper).appendTo('body');	
					
		var objHeader = new Header(true);
			$(wholeWrapper).append(objHeader.div);
			
		var holderSeccion = document.createElement('div');
			holderSeccion.id = 'holder-seccion-loader';	
			$(wholeWrapper).append(holderSeccion);
	
		$(holderSeccion).css({scale : 0.5, duration : 500}).css({x : -1000, duration : 500})
		
		App.Navigate = new Navigate();
		App.Cargador = new Cargador();
		App.CheckConnection = new CheckConection();

		self.initialize = function() 
		{
		   //Inicializo eventos
		   document.addEventListener('deviceready', onDeviceReady, false);
		   document.addEventListener("offline", onDeviceOffLine, false);
		   document.addEventListener("online", onDeviceOnLine, false);
		   document.addEventListener("backbutton", backKeyDown, false);
		}		
			
		function onDeviceReady()
		{		
			//Obtengo datos del dispositivo

			//device.uuid;
			//var platform = device.platform;
			uuid = 123456789;
			
			if(self.internet())
			{											
				$.ajax
				({
					url : 'xml/config-site.xml',
					success : onCompleteXML,
					error : onErrorXML
				});
			}
			else
				onDeviceOffLine();
		}	
	
		function onDeviceOffLine()
		{
			App.CheckConnection.mostrar();						
		}
		function onDeviceOnLine()
		{
			App.CheckConnection.ocultar();
		}
		function backKeyDown()
		{
			return;
		}				
		function onCompleteXML(xmlSite)
		{
			//Me traigo toda la informacion de la aplicacion
			document.title   = $(xmlSite).find('site').find('title').text();
			
			self.SERVER      = $(xmlSite).find('site').find('server').text();
			self.VERSION     = $(xmlSite).find('site').find('version').text();
			self.FB_APP_ID   = $(xmlSite).find('site').find('fbappid').text();
			self.DESCRIPTION = $(xmlSite).find('site').find('description').text();

		    try 
			{
             	FB.init({ appId: $(xmlSite).find('site').find('fbappid').text(), nativeInterface: CDV.FB, useCachedDialogs: false });   
            } 
			catch (e) { /* alert(e);*/ }

			$(xmlSite).find('site').find('seccions').find('seccion').each(function(index, element) 
			{						
			   seccionsSite.push($(this));
			});	
			
			//Chequeo si ya existe este dispositivo
			checkExisteDispositivo();
		}
		
		function checkExisteDispositivo()
		{
			$.ajax
			({
				url  : objApp.SERVER+'ws/ws-checkDispositivo.php',
				type : 'POST',
				data : {'uuid' : uuid},
				success : onCompleteCheckDispositivo
			});				
		}
		function onCompleteCheckDispositivo(xml)
		{
			if(parseInt($(xml).find('existe').text()) == 1)
			{
				xmlDataUser = xml;
				self.idUsuario = $(xml).find('idUsuario').text();
				
				console.log('id de usuario: '+self.idUsuario+'-------------');
				
				objApp.Navigate('inicio', null);
			}
			else
				self.error('Uusario no existe registrarlo');
		}
		
		function onErrorXML()
		{
			self.error('Error al inicializar la aplicación.');
		}
		
		self.getMenu = function()
		{
			return seccionsSite;
		}

		self.Navigate = function(seccion, nodo)
		{
			App.Navigate.to(seccion, nodo);
		}
		self.internet = function() 
		{
			try
			{
				var networkState = navigator.connection.type;
			}
			catch(e)
			{
				return true
			}
			var states = {};
			states[Connection.UNKNOWN]  = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI]     = 'WiFi connection';
			states[Connection.CELL_2G]  = 'Cell 2G connection';
			states[Connection.CELL_3G]  = 'Cell 3G connection';
			states[Connection.CELL_4G]  = 'Cell 4G connection';
			states[Connection.CELL]     = 'Cell generic connection';
			states[Connection.NONE]     = 'No network connection';
		
			if(networkState == Connection.WIFI ||  networkState == Connection.CELL_3G || 
			networkState == Connection.CELL_4G || networkState == Connection.WIFI)
			{
				return true
			}
		
			return false
	    }
		self.error = function(error)
		{
			try
			{
				navigator.notification.alert(error, function(){}, 'ALERT');		
			}
			catch(e)
			{
				alert(error);
			}
		}	
    
		self.isTouch = function () 
		{  
		  try 
		  {  
			document.createEvent("TouchEvent");  
			return true;  
		  } 
		  catch (e) 
		  {  
			return false;  
		  }  
		}
		self.mostrarCargador = function()
		{
			App.Cargador.mostrar();
		}					
		self.ocultarCargador = function()
		{
			App.Cargador.ocultar();
		}	
		
		self.login_con_facebook = function(uid)
		{
			self.error(uid);
		}	
		
		function doScroll()
		{
			var scrollTop = $(this).scrollTop();
			
			if(scrollTop > ALTO_HEADER)
				$('.wrapper-titulo-seccion').css({'position' : 'absolute', 'top' : 0, 'left' : 0});
			else
				$('.wrapper-titulo-seccion').css({'position' : 'relative'});
		}			
	}
	
	window.App = App;
	
})(window);