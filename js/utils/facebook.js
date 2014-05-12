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
	
	my_redirect_uri = "", // LEAVE THIS
	my_type ="user_agent", my_display = "touch"; // LEAVE THIS
	
var facebook_token = "fbToken"; // OUR TOKEN KEEPER
var client_browser;

var facebook_connect_callbak = null

// FACEBOOK
var Facebook = 
{
	obtuvo_code:"",
	crear_eventos:true,
	
	init:function(facebook_connect_callbak)
	{
		FB.login
		(
			 function(response) 
			 {
				console.log(response)
				 if (response.authResponse.accessToken) 
				 {
					 Facebook.conectado(response.authResponse.accessToken)
				 } 
				 else 
				 {
					 objApp.error("No se pudo conecatar con facebook", function(){}, "Alerta")
				 }
			 },
			 { scope: "email" }
			 );
	},
	
	conectado:function($at)
	{		
		my_redirect_uri = objApp.SERVER + "fbconnect/";
		
		$.ajax
		({
			url:SERVER + "/fbconnect/json.fb.dataset_at.php?at=" + $at,
			data: {},
			dataType: 'json',
			type: 'GET',
			
			success: function(data_me)
			{					
				try
				{
					facebook_connect_callbak(data_me)
				}
				catch(e)
				{
					objApp.error("Ocurrió un error al acceder a tus datos de facebook");
				}
			},
			error: function(error) 
			{
				objApp.error("Ocurrió un error al conectar con facebook")
			}
					
		});		
	},
	
	logout:function()
	{
		FB.logout(function(response) {});
	}
	
};