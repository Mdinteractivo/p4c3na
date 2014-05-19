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
		
		objApp.ocultarCargador();

		function goConnect()
		{
			var btnConnect = new BtnConnect(self);
			innerNavigate(btnConnect);
		}	
		
		function goDatosFacebook(data)
		{
			var datosAppFace = new DatosFacebook(self, data);
			innerNavigate(datosAppFace);
		}
		
		self.goDatosApp = function (data)
		{
			var datosApp = new DatosApp(self, data);
			innerNavigate(datosApp);
		}
		
		function innerNavigate(object)
		{
			$(innerRegistroLoader).transition({opacity : 0,  duration : 800}, 1000 , 'linear');
			$(innerRegistroLoader).empty();
			
			setTimeout(function()
			{
				$(innerRegistroLoader).append(object.div);
				$(innerRegistroLoader).transition({opacity : 1,  duration : 500}, 1000 , 'linear');
			
			}, 1000);
		}	
		
		self.doConnect = function($obj_usuario, $access_token)
		{
			var data = new Object();
			
			if($obj_usuario == null)
			{
				data.access_token = 'sadasd432432412'
				data.usuario_uid = 100005636947233;
				data.usuario_nombre = 'Martin Luz';
				data.usuario_email  = 'mluzdesign@gmail.com	' ;
				data.usuario_ciudad_origen = 'Montevideo';
				data.usuario_ciudad_actual = 'Montevideo';
				data.usuario_fecha_nacimento = '26/10/1987';
			}
			else
			{
				data.usuario_uid = $obj_usuario.uid;
				data.access_token = $access_token
				data.usuario_nombre = $obj_usuario.first_name+' '+$obj_usuario.last_name;
				data.usuario_email = $obj_usuario.email;
				data.usuario_ciudad_origen = $obj_usuario.hometown.name;
				data.usuario_ciudad_actual = $obj_usuario.location.name;
				data.usuario_fecha_nacimento = $obj_usuario.birthday;

				try{
					data.usuario_ciudad_origen = $obj_usuario.hometown.name;
					data.usuario_ciudad_actual = $obj_usuario.hometown.name;
				}catch(e){}
			
				try{
					data.usuario_fecha_nacimento = $obj_usuario.birthday;
				}catch(e){}				
			}

			goDatosFacebook(data);
		}	
	}
	
	window.Registro = Registro;

})(window);

function DatosFacebook(parent, data)
{
	var self = this;
	self.div = document.createElement('div');
	$(self.div).css({'height' : 250});
	
	var leftHolder = document.createElement('div');
		$(self.div).append(leftHolder);
		$(leftHolder).css({'width' : 200, 'min-height' : 165, 'float' : 'left', 'margin-top' : 15});
	
	$(leftHolder).append('<p class="p-registro-app-title">Nombre de usuario: <span>'+data.usuario_nombre+'</span></p>');
	$(leftHolder).append('<p class="p-registro-app-title">Ciudad de origen: <span>'+data.usuario_ciudad_origen+'</span></p>');
	$(leftHolder).append('<p class="p-registro-app-title">Ciudad Actual: <span>'+data.usuario_ciudad_actual+'</span></p>');
	$(leftHolder).append('<p class="p-registro-app-title">Fecha de nacimiento: <span>'+data.usuario_fecha_nacimento+'</span></p>');
	
	var rightHolder = document.createElement('div');
		$(self.div).append(rightHolder);
		$(rightHolder).css({'width' : 100, 'height' : 120, 'float' : 'left', 'margin-top' : 30, 'margin-left' : 5, 'overflow' : 'hidden'});
	
	var imgProfile = new Image();
		imgProfile.width = 100;
		imgProfile.src = 'http://graph.facebook.com/'+data.usuario_uid+'/picture?width=100&height=120';
		$(rightHolder).append(imgProfile);		

	var divButton = document.createElement('div');
		$(self.div).append(divButton);
		$(divButton).css({'width' : '100%', 'height' : 60, 'float' : 'left', 'position' : 'relative'});

	var btnNext = document.createElement('div');
		btnNext.className = 'btn-next';
		$(divButton).append(btnNext);
		$(btnNext).text('SIGUIENTE');	
		$(btnNext).css({'top' : 10});
		
		if(objApp.isTouch())
			$(btnNext).bind('touchstart' , parentNavigate);	
		else	
			$(btnNext).bind('click' , parentNavigate);
			
	function parentNavigate()
	{
		parent.goDatosApp(data);
	}	
}

function DatosApp(parent, data)
{
	var self = this;
	self.div = document.createElement('div');
	self.div.id = 'wrapper-datos-app';
	
	$(self.div).css({'height' : 325, 'width' : '100%'});
	$(self.div).append('<h3>'+data.usuario_nombre+'</h3>');
	$(self.div).append('<label>Confirma tu Nombre Completo</label><br/>');
	
	var inputNombre = document.createElement('input');
		inputNombre.type = 'text';
		$(self.div).append(inputNombre);
		$(inputNombre).css({'width' : 285});
		$(inputNombre).val(data.usuario_nombre);
		
	$(self.div).append('<label>Número de Carnet</label><br/>');
	
	var inputCarnet = document.createElement('input');
		inputCarnet.type = 'text';
		$(self.div).append(inputCarnet);
		$(inputCarnet).css({'width' : 170});

	$(self.div).append('<br/>');
	$(self.div).append('<label>Número de Teléfono</label><br/>');
	
	var inputTel = document.createElement('input');
		inputTel.type = 'tel';
		$(self.div).append(inputTel);
		$(inputTel).css({'width' : 170});
		
	var tick = new TickComponent(self);		
		$(self.div).append(tick.div);
		$(tick.div).css({'left' : 8});
		
		$(self.div).append('<label style="position:absolute;top: 227px; left: 43px;">Recibir Notificaciones</label>');
		
	var btnGuardar = document.createElement('div');
		btnGuardar.className = 'btn-next';
		$(self.div).append(btnGuardar);
		$(btnGuardar).text('GUARDAR');	
		$(btnGuardar).css({'top' : 278});	
		
		if(objApp.isTouch())
			$(btnGuardar).bind('touchstart' , checkGuardar);	
		else	
			$(btnGuardar).bind('click' , checkGuardar);
			
	var btnNext = document.createElement('div');
		btnNext.className = 'btn-next';
		$(self.div).append(btnNext);
		$(btnNext).text('SIGUIENTE');	
		$(btnNext).css({'top' : 278, 'display' : 'none'});				
	
	self.sendEstado = function(estado)
	{
		if(estado == 1)
		{
			$(btnNext).css({'display' : 'block'});				
			$(btnGuardar).css({'display' : 'none'});			
		}
		else
		{
			$(btnGuardar).css({'display' : 'block'});
			$(btnNext).css({'display' : 'none'});				
		}
	}
	
	function checkGuardar()
	{
		if($(inputNombre).val().length == 0)
		{
			objApp.error('No puedes dejar el campo Nombre vacío');
		}
		else if($(inputTel).val().length == 0)
		{
			objApp.error('No puedes dejar el campo Teléfono vacío');
		}
		else
		{
			objApp.mostrarCargador();

			 var params =
			 {
				  usuario_uid : data.usuario_uid,
				  usuario_at : data.access_token,
				  usuario_nombre : $(inputNombre).val(),
				  usuario_email : data.usuario_email,
				  usuario_ciudad_origen  :data.usuario_ciudad_origen,
				  usuario_ciudad_actual : data.usuario_ciudad_actual,
				  usuario_fecha_nacimiento : data.usuario_fecha_nacimento,
				  usuario_numero_carnet:$(inputCarnet).val(),
				  usuario_numero_tel:$(inputTel).val(),
				  guardo_favoritos:0
     		}
			
			$.ajax
			({
				url  : objApp.SERVER+'ws/ws-guardarUsuario.php',
				type : 'POST',
				data : params,
				success : onCompleteXML
			});	
		}
	}
	
	function onCompleteXML(xml)
	{
		objApp.ocultarCargador();
		
		if(parseInt($(xml).find('resultado').text()) == 1)
		{
			objApp.setIdUsuario($(xml).find('idUsuario').text());
			
			setTimeout(function()
			{
				objApp.Navigate('inicio', null);
			
			}, 500);
		}
		else
		{
			objApp.error('Ha ocurrido un error, intenta más tarde');
		}
	}
	
}