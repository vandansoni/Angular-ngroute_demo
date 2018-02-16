
var app = angular.module('myApp', ['ngRoute']);
console.log("app loaded...");
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : './pages/home.html',
            controller  : 'mainController'
        })

        .when('/employees', {
            templateUrl : './pages/employee.html',
            controller  : 'empController'
        })
        
        .when('/contact', {
            templateUrl : './pages/contact.html',
            controller  : 'contactController'
        });
});
console.log("after config...");
app.controller('mainController', function($scope) {
    $scope.message = 'Everyone come and see how good I look!';
    console.log("In main controller...");
});

app.controller('empController', function($scope,$http) {
    console.log("In employee controller...");

    $scope.employeess={id:'',name:'',age:'',department:'',currentEmp:''};
    $scope.employee=[];
    $scope.emps=[];
    $scope.emps=$scope.employeess;
    
    //Initialization

    function _init(){
       _getEmployee();
    }
    _init();

    //Getting data

    function _getEmployee(){
        $http.get("http://localhost:3000/employees", 
    ).then(function(response){
        console.log(response);
        $scope.employee=response.data;
        },function(response){
            console.log(response);
        })
    }

    //Add data

    $scope.addEmployee= function(){
        console.log($scope.employeess);
        $http.post("http://localhost:3000/employees/",$scope.employeess).then(function(response){
           _getEmployee();
            $scope.employeess={id:'',name:'',age:'',department:'',currentEmp:''};
            alert("Employee added successfully....");
          //  console.log("Adding into json");
        }, function(response){
            console.log(response);
        })
    }

    });
    

app.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
    console.log("In contact controller...");
});