offerPad = angular.module('offerPad', []).
  factory 'pusher', ($rootScope) ->
    # Sets up pusher credentials
    pusher     = new Pusher('265c8065bb95051d0a67')
    channel    = pusher.subscribe('long_lat_stream')
    Pusher.log = (message) ->
      if window.console && window.console.log
        window.console.log message

    # Binds to an event on a channel
    bind: (event, callback) ->
      channel.bind event, ->
        args = arguments
        $rootScope.$apply ->
          callback.apply(channel, args)
