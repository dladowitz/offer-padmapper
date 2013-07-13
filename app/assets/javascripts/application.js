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

offerPad.controller('MapCtrl', function($scope, $timeout, pusher) {
  var map;
  var us_center = new google.maps.LatLng(37.09024, -95.712891);
  $scope.markers = [];
  $scope.infoWindows =[];
  $scope.locations = [];

  pusher.bind('new_location', function(data) {
    $scope.locations.push(data);
  });

  var delay = 1
  $scope.$watch('locations', function(newVal, oldVal) {
    // Check diff between oldVal and newVal
    var diff = newVal.slice(oldVal.length, newVal.length);
    if  (diff.length >0) {
      // Iterate over diff and create markers
      $timeout(function() {
        addMarkerAndWindow(diff[0], diff.length);
        delay--;
      }, 2000 * delay++);
    }
  }, true)

  // Display map
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
      "<strong>Offer:</strong> " + offer.offer_name,
      "<strong>Device Type: </strong>" + offer.device_type  ,
      "<strong>Dollar Value: </strong> $" + (offer.revenue),
    ].join('<br>');
  }

  function addMarkerAndWindow(offer) {
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

    $scope.markers.push(marker);

    if ($scope.markers.length >= 11){
      $scope.markers[($scope.markers.length - 11)].setMap(null);
    }

    // Add InfoWindow to map
    var infoWindow = new google.maps.InfoWindow({
      position: site,
      content: createInfoWindowContent(offer),
      zIndex: $scope.locations.length
    });

    infoWindow.open(map);
    $scope.infoWindows.push(infoWindow)

    if ($scope.infoWindows.length >= 11){
      $scope.infoWindows[($scope.infoWindows.length - 11)].close();
    }
  }

  google.maps.event.addDomListener(window, 'load', initialize);

});
