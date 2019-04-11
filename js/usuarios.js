// JavaScript Document
$(document).ready(function(){
//+ dt.getMinutes()  + dt.getSeconds()
$.support.cors = true;
	
setInterval( function() {
var horas = new Date().getHours();
var minutos = new Date().getMinutes();
var segundos = new Date().getSeconds();
var time = (( horas < 10 ? "0" : "" ) + horas) + ":" + (( minutos < 10 ? "0" : "" ) + minutos) + ":" + (( segundos < 10 ? "0" : "" ) + segundos) ;	
$('#horas').html(''+ time +'');	
},100);
	

	
var url_login = 'https://targetmedios.com/plataform/phps/app_server.php';
//iniciar sesion
$('#loguear').click(function(){
	var email = $.trim($('#email').val());
	var pass = $.trim($('#contrasena').val());
    if($.trim(email).length>0 && $.trim(pass).length>0){
	$('#status').text('Cargando...');
	
	var loginString = 'email='+ email +'&pass='+ pass +'&logins=';
	$.ajax({
	 type: "POST",
	 crossDomain: true,
	 cache: false,
     url: url_login,
	 data: loginString,
     success: function(data){
        if(data == "success") {
             $("#status").text("Bienvenido");
             localStorage.loginstatus = "true";
             localStorage.loginus = email;
             window.location.href = "menu.html";
        }
        else if(data == "error"){
             $("#status").text("Datos invalidos");
        }	
    }
	});
	}return false;
});
	


//cerrar sesion
$('#logout').click(function(){
    	localStorage.loginstatus = "false";
    	window.location.href = "index.html";
});
	
$("#password_refresh").click(function(){
   var url_repass = 'https://targetmedios.com/plataform/phps/app_server.php';
   var old_password=$("#old_pass").val();
   var new_password=$("#new_pass").val();
   var rew_password = $("#re_pass").val();
   var dataString="old_password="+old_password+"&new_password="+new_password+"&rew_password="+rew_password+"&email="+localStorage.loginus+"&change_password=";
    	if($.trim(old_password).length>0 && $.trim(new_password).length>0 && $.trim(rew_password).length>0)
		{
			$.ajax({
				type: "POST",
				url: url_repass,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){ $("#msm_pss").text('Cargando...');},
				success: function(data){
					if(data == "incorrect")
					{
						$('#msm_pss').text("Contraseña incorrecta");
						   $("#old_pass").val('');
						   $("#new_pass").val('');
						   $("#re_pass").val('');
					}
					else if(data == "new_re"){
						$('#msm_pss').text("Las contraseñas no coinciden");
						   $("#old_pass").val('');
						   $("#new_pass").val('');
						   $("#re_pass").val('');
					}
					else if(data == "success")
					{
						$('#msm_pss').text("Contraseña actualizada");
						   $("#old_pass").val('');
						   $("#new_pass").val('');
						   $("#re_pass").val('');
					}
					else if(data == "failed")
					{
						$('#msm_pss').text("Error, intenta más tarde");
						   $("#old_pass").val('');
						   $("#new_pass").val('');
						   $("#re_pass").val('');
					}
				}
			});
		}return false;

});	

//usuario sesion
if(localStorage.loginstatus == 'true'){
	
 var url_us = 'https://targetmedios.com/plataform/phps/app_server.php?userlog='+ localStorage.loginus +' ';
   $.getJSON(url_us, function(result) {
   console.log(result);
   $.each(result, function(i, field) {
   //traemos informacion de usuario
    var bd_email = field.email;
	var bd_nombre = field.nombre;
	var bd_photo = field.foto;
	var bd_trabajo = field.cargo;
	localStorage.id = field.id;
	//imprimirmos datos
	$('#us_name').html(''+ bd_nombre +'');
	$('#us_email').html(''+ bd_email +'');
	$('#us_cargo').html(''+ bd_trabajo +'');
	$('#us_photo').attr('src', 'img/'+ bd_photo +'');
   });
		  
   });
	

	

}else{

	$('#us_nombre').html('NONE');
	$('#us_email').html('NONE');
	$('#us_cargo').html('NONE');
	$('#us_photo').attr('src', 'img/logo_home.png');
	
}
	
if(localStorage.loginstatus == 'true'){	
//traemos reportes
var url = 'https://targetmedios.com/plataform/phps/app_server.php?articulos='+ localStorage.loginus +' ';
$.getJSON(url, function(result) {
console.log(result);
$.each(result, function(i, fieldb) {
  var etiqueta = fieldb.etiqueta;
  var hora = fieldb.hora;
  var fecha = fieldb.fecha;
  var dia = fieldb.dia
  $(".n_registro").append("<article><h2>Registro de "+etiqueta+"</h2><p>Hora : "+ hora +"<br/>Fecha :"+ fecha +"/"+ dia +"</p></article>");
  });
});
}else{
	
}
	
});

