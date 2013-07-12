// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
var offerPad = angular.module('offerPad', []);

offerPad.factory('pusher', function($rootScope) {
  var pusher = new Pusher('265c8065bb95051d0a67');
  var channel = pusher.subscribe('long_lat_stream');

  Pusher.log = function(message) {
    if(window.console && window.console.log) {
      window.console.log(message);
    }
  };

  return {
    bind: function(event, callback) {
      channel.bind(event, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(channel, args);
        });
      });
    }
  };
});

offerPad.controller('MapCtrl', function($scope, pusher) {
  $scope.locations = [];

  pusher.bind('new_location', function(data) {
    $scope.locations.push(data);
  });

  $scope.$watch('locations', function(oldVal, newVal) {
    // Check diff between oldVal and newVal
    var diff = newVal.slice(oldVal.length, newVal.length);
    if (diff.length > 0) {
    // Iterate over diff and create markers
      drop(diff);
    }

  })

  // Display map
  var map;
  var us_center = new google.maps.LatLng(37.09024, -95.712891);
  var markers = [];
  var infoWindows =[];
  var iterator = 0;

  function initialize() {
    var mapOptions = {
      zoom: 6,
      center: us_center,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
  }

  function position(latitude, longitude) {
    return new google.maps.LatLng(latitude, longitude)
  }

  function createInfoWindowContent(offer) {
    return [
      "<strong>Offer:</strong> " + offer.name,
      "<strong>Reward: </strong>" + offer.reward_amount + ' ' + offer.currency,
      "<strong>Real Value: </strong> $" + ((offer.dollar_value) * .01).toFixed(2),
    ].join('<br>');
  }

  function drop(diff) {
    for (var i = 0; i < diff.length; i++) {
      $timeout(function() {
        addMarkerAndWindow(diff[i], diff.length);
      }, i * 4000);
    }
  }

  function addMarkerAndWindow(offer, iterator) {
    var site = position(offer.latitude, offer.longitude)

    // Add Google Marker using custom icon
    var marker = new google.maps.Marker({
      position: site,
      map: map,
      draggable: true,
      icon: 'images/t_icon.ico',
      animation: google.maps.Animation.DROP,
      visible: true
    });

    markers.push(marker);

    if (iterator >= 9){
      markers[(iterator - 9)].setMap(null);
    }

    // Add InfoWindow to map
    var infoWindow = new google.maps.InfoWindow({
      position: site,
      content: createInfoWindowContent(offer),
      zIndex: iterator
    });

    infoWindow.open(map);
    infoWindows.push(infoWindow)

    if (iterator >= 9){
      infoWindows[(iterator - 9)].close();
    }
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  // window.onload = function () {
  //   drop();
  // };
});
