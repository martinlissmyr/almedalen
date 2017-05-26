var icons = {
  "100": "1F550",
  "130": "1F55C",
  "200": "1F551",
  "230": "1F55D",
  "300": "1F552",
  "330": "1F55E",
  "400": "1F553",
  "430": "1F55F",
  "500": "1F554",
  "530": "1F560",
  "600": "1F555",
  "630": "1F561",
  "700": "1F556",
  "730": "1F562",
  "800": "1F557",
  "830": "1F563",
  "900": "1F558",
  "930": "1F564",
  "1000": "1F559",
  "1030": "1F565",
  "1100": "1F55A",
  "1130": "1F566",
  "1200": "1F55B",
  "1230": "1F567"
}

module.exports = function(d) {
  d = new Date(d);

  var hour = d.getHours();
  var minutes = d.getMinutes();

  if (minutes < 15) {
    minutes = "00";
  } else if (minutes < 45){
    minutes = "30";
  } else {
    minutes = "00";
    ++hour;
  }

  if (hour > 23) {
    hour = 12;
  } else if (hour > 12) {
    hour = hour - 12;
  } else if (hour == 0) {
    hour = 12;
  }

  return "&#x" + icons[hour + minutes] + ";";
}
