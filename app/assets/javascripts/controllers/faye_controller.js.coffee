@FayeCtrl = ($scope, $http, Faye) ->
  $scope.messages = [{latitute: "blah"}]
  $scope.messages.add = (message) ->
    $scope.messages.push message

  Faye.subscribe "/lat_long_stream", (msg) ->
    $scope.$apply ->
      $scope.messages.add  msg
