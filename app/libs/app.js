var app = angular.module('todoApp',['ngRoute','ngAnimate']);
app.config(function($routeProvider){
  $routeProvider
  .when('/home', {
    templateUrl: 'app/views/list.html'
  })
  .when('/add', {
    templateUrl: 'app/views/add.html'
  })
  .otherwise({
    redirectTo: '/home'
  })
});

app.controller('listController', function($scope, $location, tasks){
  $scope.addTask = function(){
    $location.path('/add')
  }
  $scope.todoList = tasks; /* from factory */
})

app.controller('addController', function($scope, $location, $timeout, tasks){
  $scope.goBack = function(){
    $location.path('/home');
  }
  $scope.submit = function(){
    tasks.push($scope.newTaskLabel);
    $location.path('/home');
  }

  $scope.viewLoaded = false;

  $timeout(function(){
      $scope.viewLoaded = true;
  });

  $scope.$watch(function(){
    return $scope.viewLoaded
  }, function(newValue, oldValue){
    if(newValue){
      angular.element(jsInput)[0].focus();
    }
  })

})

app.factory('tasks', function(){
  return ['Create a to-do list app using angular js'];
})
