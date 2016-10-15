angular.module('starter.controllers', [])

.controller('instrumentosCtrl', function($scope,$cordovaNativeAudio, 
          $cordovaVibration,$ionicPlatform,$cordovaFile,$state) {
     var arrySecuencia=[];
     var arrayJSON;
    
    $ionicPlatform.ready(function(){

      $scope.mostrarInstrumentos = true;
       $scope.showBtnGuardar = true;
      $scope.showBtnVolver = false;


 // $scope.arrySecuencia = "";
 // $scope.lista= "";

       try{
    
           $cordovaFile.createFile(cordova.file.externalApplicationStorageDirectory, "sonidosPiano.txt", true)
         .then(function (success) {
           alert("archivo creado"+path);
        }, function (error) {
           alert("archivo no creado"+path);
      });

       $cordovaNativeAudio
      .preloadSimple('guitarra', 'sonidos/guitarraElectrica.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.error(error);
       }); 
         $cordovaNativeAudio
      .preloadSimple('flauta', 'sonidos/flauta.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.error(error);
       }); 
      $cordovaNativeAudio
      .preloadSimple('arpa', 'sonidos/arpa.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.error(error);
       }); 
     $cordovaNativeAudio
      .preloadSimple('platillos', 'sonidos/platillos.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.error(error);
       }); 
     $cordovaNativeAudio
      .preloadSimple('violin', 'sonidos/violin.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.error(error);
       });  
     $cordovaNativeAudio
      .preloadSimple('piano', 'sonidos/piano.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.error(error);
       });
       } catch(ex){
        alert(ex);
       }


    });

   $scope.reproducir=function(rep){
         

    if(rep==0){
         arrySecuencia.push("guitarra");
          //$cordovaVibration.vibrate(500);
     $cordovaNativeAudio.play('guitarra');
    }
        if(rep==1){   
         arrySecuencia.push("flauta");
        //  $cordovaVibration.vibrate(500);
        $cordovaNativeAudio.play('flauta');
    
    }
        if(rep==2){
           arrySecuencia.push("arpa");
        //  $cordovaVibration.vibrate(500);
          $cordovaNativeAudio.play('arpa');
    
    }
    if(rep==3){
 
        arrySecuencia.push("platillos");
        // $cordovaVibration.vibrate(500);
        $cordovaNativeAudio.play('platillos');
    
   
    }
        if(rep==4){
     arrySecuencia.push("violin");
     //$cordovaVibration.vibrate(500);
       $cordovaNativeAudio.play('violin');
   
    }
        if(rep==5){
        arrySecuencia.push("piano");
     //$cordovaVibration.vibrate(500);
       $cordovaNativeAudio.play('piano');

    }

     $scope.arrySecuencia = arrySecuencia;

    arrayJSON=JSON.stringify(arrySecuencia);
    
    try{
           $cordovaFile.createFile(cordova.file.externalApplicationStorageDirectory, "SecuenciaPiano.txt", true)
      .then(function (success) {
  
      }, function (error) {
        // error
      });
        $cordovaFile.writeFile(cordova.file.externalApplicationStorageDirectory, "SecuenciaPiano.txt", arrayJSON,true)
      .then(function (success) {
      }, function (error) {
      });
    }
    catch(ex){
      alert(ex);
    }

   };

  $scope.repSecuencia=function(){

      $scope.mostrarInstrumentos = false;
      $scope.showBtnGuardar = false;
      $scope.showBtnVolver = true;

      var fecha = new Date();
      var fechaActual =  fecha.getDay()+ "-"+fecha.getMonth() + "-" +fecha.getFullYear() ;
      $scope.lista= "Instrumentos tocados:" + $scope.arrySecuencia;
      var ref = new Firebase("https://practicasupervisada2016-f74f7.firebaseio.com/pianito");
      ref.push({
          usuario:firebase.auth().currentUser.email,     
          fecha:fechaActual,
          listaMelodias :$scope.arrySecuencia
      });
  

      var array=[];
      $cordovaFile.readAsText(cordova.file.externalApplicationStorageDirectory, "SecuenciaPiano.txt")
      .then(function (success) {
       array=JSON.parse(success);  
          $state.go('tab.secuencia',{nombres:array});   

         }, function (error) {
        alert("error");
      });
  };

  $scope.volverJugar=function(){
      $scope.lista= "";
      $scope.arrySecuencia = [];
      arrySecuencia = [];
            $scope.mostrarInstrumentos = true;
       $scope.showBtnGuardar = true;
      $scope.showBtnVolver = false;  }


})

.controller('infoCtrl', function($scope){
    $scope.showBrowser=function(){
      var ref = window.open('https://github.com/pabloigoldi/TpPianoTematicoIonic2016', '_blank', 'location=yes');
      ref.addEventListener('loadstart', function() { alert(event.url); });
    };
})
          

.controller('loginCtrl', function($scope, $state) {
  
  $scope.loginData = {};
  $scope.loginData.username ="pablo.emanuel.ig@gmail.com";
  $scope.loginData.password = "hola06";

  $scope.doLogin= function()
  {
      firebase.auth().signInWithEmailAndPassword($scope.loginData.username,$scope.loginData.password).catch(function(error)
        {          
          console.info("error: " + error);
           var errorCode = error.code;
           var errorMessage = error.message;
          if(errorCode== 'auth/wrong-password')
          {
            $scope.mensajeLogin = "wrong-password";
          }
          else
          {
          $scope.mensajeLogin = "errores:" + errorMessage;
          }


        }).then(function(respuesta){

              if(respuesta)
              {             
                  $state.go('tab.instrumentos');
              }
              else
              {
                   $scope.mensajeLogin = "Error en el logueo";
              }

        });
  }

  $scope.salir= function()
  {
      ionic.Platform.exitApp();
  }


});
