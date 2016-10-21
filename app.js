// Code goes here

var myApp = angular.module('myApp', []);

function MyController($scope, $http) {



//Esporta dati
$scope.getJson=function () {
//var json = JSON.stringify($scope.entity);
var json= angular.toJson($scope.entity, true);
var blob = new Blob([json], {type: "application/json"});
var url  = URL.createObjectURL(blob);

var a =document.getElementById('getJson');
a.download    = "configbot.json";
a.href        = url;
a.style.visibility="visible";
}

$scope.hideJson=function () {
var a =document.getElementById('getJson');
a.style.visibility="hidden";	
}

$scope.getGitHubJson=function () {
	if ($scope.selectedItem != null){
	if (confirm("Caricare la configurazione " + $scope.selectedItem.name) == true) {
 $http.get("https://raw.githubusercontent.com/IperBOT/" + $scope.selectedItem.name + "/master/configbot.json")
    .then(function(response) {
        $scope.entity = response.data;
    });	}}
}
	
 //Carica dati


 $http.get("https://api.github.com/orgs/iperbot/repos")
    .then(function(response) {
        $scope.reps = response.data;
	for (var i = 0; i < $scope.reps.length; i++) {
	  var key = $scope.reps[i];
	  if (key.name==='iperbot.github.io'){$scope.reps.splice(i,1)}
	}		
    });
	
$scope.uploadedFile = function(element) {
 $scope.$apply(function($scope) {
 $scope.files = element.files; 
 var reader = new FileReader();
    reader.onload = function(){
      var text = $scope.files;
      //console.log(reader.result);
	  $scope.entity=JSON.parse(reader.result);
	  $scope.$apply();
    };
	reader.readAsText($scope.files[0]);
 });
}

	
  $scope.pageChangeHandler = function(num) {
      
  };
}

function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
  
  };
}

  var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;
      console.log(reader.result);
    };
    reader.readAsText(input.files[0]);
  };

myApp.controller('MyController', MyController);
myApp.controller('OtherController', OtherController);
