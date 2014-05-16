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
			
		goConnect();
			
		
		function goConnect()
		{
			var btnConnect = new BtnConnect(self);
			innerNavigate(btnConnect);
		}	
		
		function goDatosApp(data)
		{
			var datosApp = new DatosApp(self, data);
			innerNavigate(datosApp);
		}
			
		function innerNavigate(object)
		{
			$(innerRegistroLoader).transition({opacity : 0,  duration : 500}, 1000 , 'linear');
			$(innerRegistroLoader).empty();
			
			setTimeout(function()
			{
				$(innerRegistroLoader).append(object.div);
				$(innerRegistroLoader).transition({opacity : 1,  duration : 500}, 1000 , 'linear');
			
			}, 1000);
		}	
		
		self.doConnect = function($obj_usario, $access_token)
		{
			var data = new Object();
			if($obj_usario == null){
				data.access_token = ''
				data.uid = 100005636947233;
				data.usuario_nombre = 'Martin Luz';
				data.usuario_email  = 'mluzdesign@gmail.com	' ;
				data.usuario_ciudad_origen = 'Montevideo';
				data.usuario_ciudad_actual = 'Montevideo';
				data.usuario_fecha_nacimento = '26/10/1987';
			}else{

				data.access_token = $access_token;
				data.uid = $obj_usario.id;
				data.usuario_nombre = $obj_usario.name;
				data.usuario_email  = $obj_usario.email;
				data.usuario_ciudad_origen = $obj_usario.hometown.name;
				data.usuario_ciudad_actual = $obj_usario.hometown.name;
				data.usuario_fecha_nacimento = $obj_usario.birthday;

			}
			
			alert(
				
				'access_token: ' + data.access_token + '\n' + 
				'uid: ' + data.uid + '\n' + 
				'usuario_nombre: ' + data.usuario_nombre + '\n' + 
				'usuario_email: ' + data.usuario_email + '\n' + 
				'usuario_ciudad_origen: ' + data.usuario_ciudad_origen + '\n' + 
				'usuario_ciudad_actual: ' + data.usuario_ciudad_actual + '\n' + 
				'usuario_fecha_nacimento: ' + data.usuario_fecha_nacimento + '\n'

				);
			
			console.log(data)

			goDatosApp(data);
		}	
	}
	
	window.Registro = Registro;

})(window);

function DatosApp(parent, data)
{
	var self = this;
	self.div = document.createElement('div');
	$(self.div).css({'height' : 250});
	
	var leftHolder = document.createElement('div');
		$(self.div).append(leftHolder);
		$(leftHolder).css({'width' : 200, 'height' : 200, 'float' : 'left', 'margin-top' : 15});
	
	$(leftHolder).append('<p class="p-registro-app-title">Nombre de usuario: <span>'+data.usuario_nombre+'</span></p>');
	$(leftHolder).append('<p class="p-registro-app-title">Ciudad de origen: <span>'+data.usuario_ciudad_origen+'</span></p>');
	$(leftHolder).append('<p class="p-registro-app-title">Ciudad Actual: <span>'+data.usuario_ciudad_actual+'</span></p>');
	$(leftHolder).append('<p class="p-registro-app-title">Fecha de nacimiento: <span>'+data.usuario_fecha_nacimento+'</span></p>');
	
	var rightHolder = document.createElement('div');
		$(self.div).append(rightHolder);
		$(rightHolder).css({'width' : 100, 'height' : 120, 'float' : 'left', 'margin-top' : 30, 'margin-left' : 5, 'overflow' : 'hidden'});
	
	var imgProfile = new Image();
		imgProfile.width = 100;
		imgProfile.src = 'http://graph.facebook.com/'+data.uid+'/picture?width=100&height=120';
		$(rightHolder).append(imgProfile);		

	var btnNext = document.createElement('div');
		btnNext.className = 'btn-next';
		$(self.div).append(btnNext);
		$(btnNext).text('SIGUIENTE');	
		$(btnNext).css({'top' : 190});
}
