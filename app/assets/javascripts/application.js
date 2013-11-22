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
  $scope.InfoBoxes =[];
  $scope.locations = [];
  var locations = $scope.locations
  var z_counter = 0

  // conversion are recieved in batches of 10
  pusher.bind('new_location', function(data) {
    for (var i = 0; i < data.length; i++){
      $scope.locations.push(data[i]);

    }
  });


  $scope.$watch('locations', function() {
    var delay = 1
    // If needed use newVal and oldVal as parameters for this function

    console.log("<< Watcher Triggered >>")

    console.log("locations: ")
    console.log(locations)

    if (locations.length > 30){
      locations.splice(29, locations.length);
      console.log("Forced deletion. Over 30 conversions in locations")
    }

    // setTimeout is quirky in a loop. All loops will run until the stop condition. Then the function in
    // setTimeout will fire for each loop that ran. This is why we need to increase the delay on each loop
    console.log("<< For Loop Starting >>")

    for (var i = 0; i < locations.length-1; i++) {
      console.log("    i before timeout: " + i);
      console.log("    current delay: " + delay);

      setTimeout(function() {
        console.log("<< Dropping Offer >>")
        console.log("    offername:" + locations[0].offer_name)
        console.log("    current locations length: " + locations.length)
        console.log("    i inside of timeout: " + i);
        console.log("    current delay: " + delay);
        console.log("    z_counter: " + z_counter);
        addMarkerAndInfoBox(locations[0]);
        console.log("-- Dropping Offer --")
        console.log("                     ")

        // remove used offer from locations so it doesn't grow
        locations.splice(0,1)
      }, 3000 * delay++);
    };

    console.log("-- For Loop Ending --")
    console.log("                 ")

    console.log("-- Watcher Ending --")
    console.log("                    ")
  }, true)

  // Display map
  function initialize() {
    var mapOptions = {
      zoom: 5,
      center: us_center,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
  }

  function position(latitude, longitude) {
    return new google.maps.LatLng(latitude, longitude)
  }

  // function get_icon (offer_id) {
  //   var ICON_HASH_SALT = 'Gi97taauc9VFnb1vDbxWE1ID8Jjv06Il0EehMIKQ'
  //   Digest::SHA2.hexdigest(ICON_HASH_SALT + offer_id)
  //  }

  //creates html using join method
  function createInfoWindowContent(offer) {
    return [
      "<div style='white-space: nowrap; border:2px solid black; overflow: hidden; padding: 10px 13px 10px 13px; margin: 10px; background:#333; color:#EEE; font-family: Helvetica, Arial, sans-serif; font-size:14px; font-weight: 100; border-radius: 4px; box-shadow: 2px 3px 12px #000' >",
       "<div style='float:left; margin-right: 12px; padding-top: 10px;'>",
          "<img src='" + offer.icon_url + "' height=57 width=57 style='border-radius:15px'>",
        "</div>",
        "<div style='float:right;'>",
          "<span style='white-space: nowrap;'><span style='font-size: 17px; color: white;'>Offer</span >:  " + offer.offer_name + "</span>",
          "<br>",
          "<span style='white-space: nowrap;'><span style='font-size: 17px; color: white;'>Device Type</span >:  " + offer.device_type + "</span>",
          // "<br>",
          // "<span style='white-space: nowrap;'><span style='font-size: 17px; color: white;'>Dollar Value</span >:  $" + (offer.revenue) + "</span>",
          "<br>",
          "<span style='white-space: nowrap;'><span style='font-size: 17px; color: white;'>Location</span >:  " + (offer.address) + "</span>",
        "</div>",
      "</div>"
    ].join('');
  }

  function addMarkerAndInfoBox(offer) {
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

    //removes markers from map so they don't clutter
    if ($scope.markers.length >= 11){
      $scope.markers[($scope.markers.length - 11)].setMap(null);
    }

    // Old version - using infobox instead
    // var infoWindow = new google.maps.InfoWindow({
    //   position: site,
    //   content: createInfoWindowContent(offer),
    //   zIndex: $scope.locations.length
    // });

    // Add InfoBox to map
    infobox = new InfoBox({
         position: site,
         pixelOffset: new google.maps.Size(-140, 0),
         content: createInfoWindowContent(offer),
         zIndex: $scope.locations.z_counter,
         boxStyle: {
            background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
            opacity: 0.85,
            // width: "400px"
        },
        closeBoxMargin: "0px",
        closeBoxURL: "",
    });

    z_counter++

    infobox.open(map);
    $scope.InfoBoxes.push(infobox)

    //removes boxes from map so they dont clutter
    if ($scope.InfoBoxes.length >= 11){
      $scope.InfoBoxes[($scope.InfoBoxes.length - 11)].close();
    }
  }

  google.maps.event.addDomListener(window, 'load', initialize);

});
