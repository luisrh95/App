/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var resultDiv;

document.addEventListener("deviceready", init, false);
function init() {
    document.querySelector("#startScan").addEventListener("touchend", startScan, false);
    resultDiv = document.querySelector("#results");
}

function startScan() {

    cordova.plugins.barcodeScanner.scan(
        function (result) {
		var qr_scan = result.text;
			
		if(qr_scan == 'AppStar'){
			
		 	 $("#old_pass").val('');
			 $("#new_pass").val('');
			 $("#re_pass").val('');
			
		 var url_qr = 'https://targetmedios.com/plataform/phps/app_server.php?reporte='+ localStorage.loginus +' ';
		  $.getJSON(url_qr, function(result) {
		  
		  console.log(result);
		  $.each(result, function(i, field) {
			 
		   //traemos informacion de usuario
		   var alerta = field.alerta;
		   var hora = field.hora;
		   var server = field.server;
		   //ejecutamos accion
		   $("#msm_repor").html(''+ alerta +'');
		   $(".reprt_date").html(''+ hora +'');
		   $("#msm_ok").html(''+ server +'');
		    
		  });

		 });
			
		}else{
			$('#msm_repor').text('Error en QR');
		}		
			
        },
        function (error) {
            alert("Scanning failed: " + error);
        }
    );

}
