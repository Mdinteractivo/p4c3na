(function(window)
{
	function ItemNotificacion(nodo)
	{
		var self = this;
		self.div = document.createElement('div');
		self.div.className = 'item-notificacion';
		
		var check = new TickComponent();
		$(self.div).append(check.div);	
		$(check.div).css({'float' : 'left'});
		
		var divTexto = document.createElement('div');
			divTexto.className = 'div-texto-notificacion';
			$(self.div).append(divTexto);
			$(divTexto).append($(nodo).find('pais').text());				
	}
	
	window.ItemNotificacion = ItemNotificacion;

})(window);