// PROJECT: Phonegap Facebook Application
// AUTHOR: Drew Dahlman ( www.drewdahlman.com )
// DATE: 1.26.2012

/*
NOTES:
The current solution for working with Facebook within Phonegap is confusing and very limiting.
This solution uses the Childbrowser to create your access_token, save that, and then allow you to
do what ever you want within the graph API.

This example will allow you to post to a users wall
*/

// GLOBAL VARS

var my_client_id = "335776533202934", // YOUR APP ID
	my_secret = "43d77f411f8c9e48e3561f0cf9acc860", // YOUR APP SECRET 
	
	my_redirect_uri = SERVER + "/fbconnect/", // LEAVE THIS
	my_type ="user_agent", my_display = "touch"; // LEAVE THIS
	
var facebook_token = "fbToken"; // OUR TOKEN KEEPER
var client_browser;

var facebook_connect_callbak = null



// FACEBOOK
var Facebook = {
	
	obtuvo_code:"",
	crear_eventos:true,
	

	init:function($facebook_connect_callbak){

		Facebook.obtuvo_code =  "";
		
		if(IS_PHONEGAP){
			//testing
			my_client_id = "155544507931731";
			my_secret = "d0589d6854d6da94f21a237fcaf152aa"
			my_redirect_uri = SERVER + "/fbconnect/"
		}
		
		facebook_connect_callbak = $facebook_connect_callbak
		
		 
					FB.login(
                         function(response) {
							console.log(response)
							 if (response.authResponse.accessToken) {
								 Facebook.conectado(response.authResponse.accessToken)
							 } else {
								 main.alerta("No se pudo conecatar con facebook", function(){}, "Alerta")
							 }
                         },
                         { scope: "email" }
                         );
		
	    /*
		// Begin Authorization
		var  authorize_url = "https://graph.facebook.com/oauth/authorize?";
			 authorize_url += "client_id=" + my_client_id;
			 authorize_url += "&redirect_uri=" + encodeURIComponent(my_redirect_uri);
			 authorize_url += "&display=" + my_display;
			 authorize_url += "&scope=email"

		
			window.plugins.childBrowser.onLocationChange = function (url) {
				Facebook.facebookLocChanged(url);
			}
			window.plugins.childBrowser.showWebPage(
				authorize_url, {showLocationBar:true, showAddress:true, showNavigationBar:true}
			);
		*/	
		
	},
	
	conectado:function($at){
		
		Main.loading.mostrar();
		
			$.ajax({

						url:SERVER + "/fbconnect/json.fb.dataset_at.php?at=" + $at,
						data: {},
						dataType: 'json',
						type: 'GET',
						
						success: function(data_me){
							
							try{
								facebook_connect_callbak(data_me)
							}catch(e){
								main.alerta("Ocurrió un error al acceder a tus datos de facebook");
							}
							
							main.db.ejecutar("UPDATE app SET valor='"+data_me.me.id+"' WHERE dato='usuario_uid'");
							main.db.ejecutar("UPDATE app SET valor='"+data_me.at_60+"' WHERE dato='usuario_at'");

							Main.loading.ocultar();
							
						},
						
						error: function(error) {
							main.alerta("Ocurrió un error al conectar con facebook")
							Main.loading.ocultar();
						}
								
					});
			
			
		
		
	},
	
	logout:function(){
		
			FB.logout(function(response) {});
	/* main.db.seleccionar("SELECT valor FROM app WHERE dato='usuario_at'", 
		
			function (resultado) {
				
				if (resultado.rows.length > 0){
					
					$.ajax({
						url:"https://www.facebook.com/logout.php?next=" + encodeURIComponent(SERVER+"/") + "&access_token=" + resultado.rows.item(0).valor,
						data: {},
						type: 'GET',
						success: function(data_out){
					
						}
					});	
					
				}
			}
		);
*/
	},
	
	/*
	facebookLocChanged:function(loc){
		
		if (loc.indexOf(my_redirect_uri) >= 0 || loc.indexOf(my_redirect_uri) > -1) {
			
			var fbCode = loc.match(/code=(.*)$/)[1]
			
			Facebook.obtuvo_code  = fbCode
			
			Main.loading.mostrar();
			
			window.plugins.childBrowser.close();

			$.ajax({

						url:SERVER + "/fbconnect/json.fb.dataset.php?code=" + fbCode,
						data: {},
						dataType: 'json',
						type: 'GET',
						
						success: function(data_me){
							
							try{
								facebook_connect_callbak(data_me)
							}catch(e){
								main.alerta("Ocurrio un error al acceder a tus datos de facebook");
							}
							
							main.db.ejecutar("UPDATE app SET valor='"+data_me.me.id+"' WHERE dato='usuario_uid'");
							main.db.ejecutar("UPDATE app SET valor='"+data_me.at_60+"' WHERE dato='usuario_at'");

							Main.loading.ocultar();
							
						},
						
						error: function(error) {
							main.alerta("Ocurrio un error al conectar con Facebook")
							Main.loading.ocultar();
						}
								
					});
			
			
			
	
		}
	}*/
	
};