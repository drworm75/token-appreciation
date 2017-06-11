var app = angular.module("TokenApp", ["ngRoute"]);

app.controller('games', function($scope) {
    $scope.gameTitle = "Tapper";
});

app.controller('kidGames', function($scope) {
    $scope.gameTitle = "Root Beer Tapper";
});