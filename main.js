// Colors from: https://www.colourlovers.com/palette/827696/Sunset
// Weather api from: https://fcc-weather-api.glitch.me/
// Code inspiration from: https://codepen.io/freeCodeCamp/pen/bELRjV
// Shoutouts w3schools

var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat;
var lng;
var tmh;
var tmm;
var tmDif;
var timeInfo;
var colorCycle;
var colors = ["#40284A","#F7DE55","#F07E07","#B34D25","#73434B", "#40284A"];
// 0: 402 purp
// 1: F7 yel
// 2: f07 or
// 3: b34 dor
// 4: 734 bro

window.onload = function() {
  getLoc();
};

function getLoc(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
    var lat = "lat=" + position.coords.latitude;
    var lon = "lon=" + position.coords.longitude;

    weatherReport(lat, lon);
  });
  }
  else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function weatherReport(lat, lon){
	var url = api + lat + "&" + lon;
  $.getJSON(url, function(forecast) {
    tmDif = forecast.sys.sunset - forecast.dt;
    if(tmDif < 0){
      tmDif = -1 * tmDif
      tmm = Math.floor(tmDif/60)%60;
      tmh = Math.floor(tmDif/3600);
      timeInfo = "The sun set " + tmh + " hours and " + tmm + " minutes ago.";
      colorCycle = 4;
    }
    else{
      tmm = Math.floor(tmDif/60)%60;
      tmh = Math.floor(tmDif/3600);
      timeInfo = "Sun will set in " + tmh + " hours and " + tmm + " minutes.";
      if(tmh < 12){
        // Sun sets in less than 12 hours, use 0th colorCycle
        colorCycle = 0;
      }
      else if (tmh < 9) {
        colorCycle = 1;
      }
      else if (tmh < 6) {
        colorCycle = 2;
      }
      else if (tmh < 3){
        colorCycle = 3;
      }
      else{
        colorCycle = 4;
      }
    }
    document.getElementById("h1").innerHTML = timeInfo;
    document.body.style.backgroundImage =
    'linear-gradient(' + colors[colorCycle+1] + ',' + colors[colorCycle] +')';
  });
}
