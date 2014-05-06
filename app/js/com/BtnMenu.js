(function(window)
{
	function BtnMenu(nodo)
	{
		var self = this;
		var key     = $(nodo).attr('key');
		var color   = $(nodo).attr('color');
		var texto   = $(nodo).text();
		var imgItem = $(nodo).attr('key')+'.png';
		
		self.div = document.createElement('div');
		self.div.className = 'btn-menu';
		$(self.div).bind('click' , doClick);
		
		$(self.div).css({'background' : 'url(img/general/menu/'+color+'_item.png) no-repeat'});
		$(self.div).css({'background-size' : '320px 68px'});
	
		var innerBtn = document.createElement('div');
			innerBtn.className = 'inner-btn-menu';
			$(self.div).append(innerBtn);
			$(innerBtn).text(texto);
			
		var icono = new Image();
			icono.width = 64;
			icono.src = 'img/general/menu/'+imgItem+'?ac=1';
			$(self.div).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 5, 'top' : 0});
			
		self.inicializar = function(DELAY)
		{
			$(self.div).css({scale : 0.5}).delay(DELAY).transition({opacity : 1, scale : 1, duration : 500});
		}
		
		function doClick()
		{
			objApp.Navigate(key, nodo);
		}
		
	}
	
	window.BtnMenu = BtnMenu;

})(window);