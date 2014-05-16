function Facebook(){

	var self = this;
	var access_token = 0;
	var callback;
	var inter;
	this.init = function(){

		FB.init({
			  appId: objApp.FB_APP_ID,
			  nativeInterface: CDV.FB,
			  useCachedDialogs: false
		});

	}

	function get_obj_user(){
		clearTimeout(inter)
		objApp.mostrarCargador()

			$.ajax({
			  dataType: "json",
			  url: 'https://graph.facebook.com/me?access_token=' + access_token,
			  type: 'get',
			  success: function(json){

			  		callback(json, access_token)
			  		objApp.ocultarCargador()
			  },
			  error: function(){
			  		objApp.error('Ocurrio un error. (error 1)');
			  		objApp.ocultarCargador()
			  }
			});
	}


	this.conectar = function($callback){

		callback = $callback
		objApp.mostrarCargador()

		 inter =  setTimeout(function (){
		 	objApp.ocultarCargador()
		 }, 3000);
		 
     	 FB.getLoginStatus(function(response) {
     			console.log(response)
	          	if (response.status == 'connected') {

						access_token = response.authResponse.accessToken;
						objApp.ocultarCargador()
						get_obj_user()

				} else {
						
		            FB.login(function(response2) {

		            	console.log(response2)

						  if (response2.authResponse) {

								access_token = response2.authResponse.accessToken;
								objApp.ocultarCargador()
						    	get_obj_user()

						   } else {

							 objApp.ocultarCargador()
						     objApp.error('User cancelled login or did not fully authorize.');

						   }
					}, {scope: 'user_birthday, user_hometown, email, publish_actions'})
	         	}
         });

		
	}

	
}