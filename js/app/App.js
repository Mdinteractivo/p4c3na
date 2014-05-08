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
		//App.Cargador = new Cargador();
		App.CheckConnection = new CheckConection();

		self.initialize = function() 
		{
		   document.addEventListener('deviceready', onDeviceReady, false);
		   document.addEventListener("offline", onDeviceOffLine, false);
		   document.addEventListener("online", onDeviceOnLine, false);
		}		
			
		function onDeviceReady()
		{		
			if(self.internet())
			{							
				objApp.Navigate('inicio', null);
				
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
		
		function onCompleteXML(xmlSite)
		{
			document.title   = $(xmlSite).find('site').find('title').text();
			
			self.SERVER      = $(xmlSite).find('site').find('server').text();
			self.VERSION     = $(xmlSite).find('site').find('version').text();
			self.FB_APP_ID   = $(xmlSite).find('site').find('fbappid').text();
			self.DESCRIPTION = $(xmlSite).find('site').find('description').text();

			$(xmlSite).find('site').find('seccions').find('seccion').each(function(index, element) 
			{						
			   seccionsSite.push($(this));
			});						
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
	}
	
	window.App = App;
	
})(window);