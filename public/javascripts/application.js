// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults


var map;
var city1 = new google.maps.LatLng(37.850033,-110.4183);
var city2 = new google.maps.LatLng(37.850033,-100.4183);
var us_center = new google.maps.LatLng(37.09024, -95.712891);

var offer1 = {name: "Battle Cats Video", reward_amount: 10, currency: "Cat Food", dollar_value: 50, latitude: 37.850033, longitude: -120.4183}
var offer2 = {name: "Dorritos Commercial ", reward_amount: 20, currency: "Gold", dollar_value: 10, latitude: 40.850033, longitude: -90.4183}
var offer3 = {name: "American Express", reward_amount: 5, currency: "Diamonds", dollar_value: 450, latitude: 35.850033, longitude: -85.4183}
var offer4 = {name: "Ford Focus", reward_amount: 30, currency: "Start", dollar_value: 150, latitude: 42.850033, longitude: -71.4183}
var offer5 = {name: "CitiCard", reward_amount: 8, currency: "Cat Food", dollar_value: 250, latitude: 31.850033, longitude: -110.4183}
var offer6 = {name: "Clash of the clans", reward_amount: 10, currency: "Suns", dollar_value: 90, latitude: 40.850033, longitude: -110.4183}
var offer7 = {name: "Ninja Warroirs", reward_amount: 9, currency: "Silver", dollar_value: 10, latitude: 37.850033, longitude: -100.4183}
var offer8 = {name: "Battle Cats Video 4", reward_amount: 10, currency: "Cat Food", dollar_value: 20, latitude: 33.850033, longitude: -80.4183}
var offer9 = {name: "Virgin Atlantic", reward_amount: 30, currency: "Cat Food", dollar_value: 350, latitude: 34.850033, longitude: -90.4183}
var offer10 = {name: "Battle Cats Video 2", reward_amount: 10, currency: "Mice", dollar_value: 540, latitude: 32.850033, longitude: -100.4183}
var offer11 = {name: "McDonald's", reward_amount: 40, currency: "Cat Food", dollar_value: 150, latitude: 31.850033, longitude: -85.4183}
var offer12 = {name: "Battle Cats Video 4", reward_amount: 9, currency: "Dollars", dollar_value: 220, latitude: 45.850033, longitude: -100.4183}

var offers = [offer1, offer2, offer3, offer4, offer5, offer6, offer7, offer8, offer9, offer10, offer11, offer12,offer1, offer2, offer3, offer4, offer5, offer6, offer7, offer8, offer9, offer10, offer11, offer12,offer1, offer2, offer3, offer4, offer5, offer6, offer7, offer8, offer9, offer10, offer11, offer12,offer1, offer2, offer3, offer4, offer5, offer6, offer7, offer8, offer9, offer10, offer11, offer12]

var markers = [];
var infoWindows =[];
var iterator = 0

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

function drop() {
  for (var i = 0; i < offers.length; i++) {
    setTimeout(function() {
      addMarker();
    }, i * 4000);
  }
}

function addMarker() {
  var site = position(offers[iterator].latitude, offers[iterator].longitude)

  var marker = new google.maps.Marker({
    position: site,
    map: map,
    draggable: true,
    icon: 'images/t_icon.ico',
    animation: google.maps.Animation.DROP,
    visible: true
  });

  markers.push(marker)
  if (iterator >= 9){
    markers[(iterator - 9)].setMap(null);
  }


  var infoWindow = new google.maps.InfoWindow({
    position: site,
    content: createInfoWindowContent(offers[iterator]),
    zIndex: iterator
  })
    infoWindow.open(map);
    infoWindows.push(infoWindow)

    if (iterator >= 9){
      infoWindows[(iterator - 9)].close();
    }

  iterator++;
}

google.maps.event.addDomListener(window, 'load', initialize);
window.onload = function ()
{
  drop();
}
