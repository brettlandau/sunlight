
var autocomplete;
var lat;
var lng;
var tmh;
var tmm;
var tmDif;

function initAutocomplete() {

  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */ (
          document.getElementById('autocomplete')), {
        types: ['(cities)'],
        componentRestrictions: {country: "us"}
      });

  autocomplete.addListener('place_changed', onPlaceChanged);

}
function onPlaceChanged() {
  var place = autocomplete.getPlace();
  lat = place.geometry.location.lat();
  lng = place.geometry.location.lng();
  weatherReport(lat,lng);

}
function weatherReport(latitude, longitude){
  var apiKey       = 'bad628854dd417a33b9c80d7365f1e53';
	var url          = 'https://api.darksky.net/forecast/';
	var lati         = latitude;
	var longi        = longitude;
	var api_call     = url + apiKey + "/" + lati + "," + longi + "?extend=hourly&callback=?";

  $.getJSON(api_call, function(forecast) {
    tmDif = forecast.daily.data[0].sunsetTime - forecast.currently.time;
    tmm = Math.floor(tmDif/60)%60;
    tmh = Math.floor(tmDif/3600);
    alert("Sun will set in " + tmh + " hours and " + tmm + " minutes.");
  });



}
