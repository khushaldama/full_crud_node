var myapp = angular.module('myApp', []);

myapp.controller('myCtrl', function ($scope, $http) {
    $scope.userdata=[]
    $scope.newuserdata={}
    $scope.checkuser=[]
    $scope.flag=0
    $scope.getTodoList = function () {
        $http.get('/api/getdata').then((response)=>{
            $scope.role='staff'
            $scope.userdata.role=$scope.role
            $scope.userdata = response.data;
            
        });
    }
    $scope.adduser=function(){
        $http.post('/api/adddata',$scope.newuserdata).then((response)=>{
            $scope.userdata.push(response.data)
            $scope.newuserdata={}

        });
    }
    $scope.checkuser=function(){
        $scope.flag=1
    }


    $scope.getTodoList();
    
});