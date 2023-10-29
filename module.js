var app = angular.module("myApp", []);
app.controller("myCTRL", function ($scope, $http) {
  $scope.list = [];
  $scope.newData = {};
  $scope.new = {};
  $scope.display = 0;

  $scope.getData = () => {
    $http.get("/api/get").then((res) => {
      $scope.list = res.data;
    });
  };

  $scope.addData = () => {
    if ($scope.newData.age < 20) {
      alert("You are Underaged!");
      $scope.newData = {};
    } else {
      $http.post("/api/post", $scope.newData).then((res) => {
        $scope.list = res.data;
        $scope.getData();
      });
      $scope.newData = {};
    }
  };

  $scope.delete = (item) => {
    $http.delete(`/api/delete/${item.empID}`).then((res) => {
      $scope.list = res.data;
      $scope.getData();
    });
  };

  $scope.change = (item) => {
    if ($scope.display === 1) {
      $scope.display = 0;
    } else {
      $scope.new.empID = item.empID;
      $scope.new.empName = item.empName;
      $scope.new.age = item.age;
      $scope.new.salary = item.salary;
      $scope.display = 1;
    }
  };

  $scope.changeData = () => {
    $http.put("/api/put", $scope.new).then((res) => {
      $scope.list = res.data;
      $scope.getData();
    });
    $scope.new = {};
    $scope.display = 0;
  };
  $scope.getData();
});
