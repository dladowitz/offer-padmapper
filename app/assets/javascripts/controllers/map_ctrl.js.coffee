offerPad.controller 'MapCtrl', [$scope, pusher, ($scope, pusher) ->
  $scope.locations = []

  pusher.bind 'new_location', (data) ->
    $scope.messages.push data
]
