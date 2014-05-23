(function(window)
{
	function Header(bool)
	{
		var self = this;
		
		self.div = document.createElement('div');
		self.div.className = 'header-seccion';

		var logofifa = new Image();
			logofifa.src = 'img/general/logo-fifa.png';
			logofifa.id = 'logo-fifa';
			logofifa.width = 107;
			logofifa.height = 106;
			$(self.div).append(logofifa);
		
		var holderUserName = document.createElement('div');
			holderUserName.id = 'holder-user-name';
			$(self.div).append(holderUserName);
		
		var logo = new Image();
			logo.src = 'img/general/logo-pacena.png';
			logo.id = 'logo-pacena';
			logo.width = 92;
			logo.height = 77;
			$(self.div).append(logo);
			
		self.animIn = function()
		{
			$(logofifa).delay(0).css({scale : 0.5, y : -110}).transition({duration : 400, scale : 1, y : 0});
			$(holderUserName).delay(300).css({opacity : 0}).transition({opacity : 1});
			$(logo).delay(0).css({scale : 0.5, rotate : -210, opacity : 0}).transition
			({
				duration : 500, scale : 1, rotate : 0, opacity : 1
			});
		}	
		
		self.setUser = function(nombre)
		{
			$(holderUserName).append('<h3>BIENVENIDO</h3>');
			$(holderUserName).append('<p>'+nombre+'</p>');
		}
		
		self.animIn();
	}
	
	window.Header = Header;

})(window);