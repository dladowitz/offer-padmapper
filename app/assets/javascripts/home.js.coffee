app = angular.module('myApp', [])

app.factory 'Faye', ->
  client = new Faye.Client("http://localhost:3000/faye")

  subscribe: (channel, message) ->
    client.subscribe(channel, message)

