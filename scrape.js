"use strict";

var scraperjs = require("scraperjs");
var write = require("fs").writeFile;

var router = new scraperjs.Router();

process.on('uncaughtException', function (err) {
  //console.error(err.stack);
  //console.log("Node NOT Exiting...");
});


var map = {
  "Arrangör:": "arranger",
  "Dag:": "times",
  "Evenemangskategori": "category",
  "Evenemangstyp:": "type",
  "Ämnesområde:": "area",
  "Språk:": "language",
  "Plats:": "location",
  "Sökord:": "tags"
}

var getStartAndEndTimes = function(str) {
  var parts = str.split(" ");
  var dateParts = parts[0].split("/");
  var startTimeParts = parts[2].split(":");
  var endTimeParts = parts[4].split(":");
  
  return {
    start: new Date(parts[1], dateParts[1]-1, dateParts[0], startTimeParts[0]-1, startTimeParts[1]).toISOString(),
    end: new Date(parts[1], dateParts[1]-1, dateParts[0], endTimeParts[0]-1, endTimeParts[1]).toISOString()
  }
}

var transformers = {
  "times": function(str) {
    var s = str.split(", ");
    var slots = [];
    for (var i = 0, l = s.length; i < l; i++) {
      slots.push(getStartAndEndTimes(s[i]));
    }

    return slots;
  },
  "tags": function(str) {
    return str.split(", ");
  }
}

var almedalenEventScraper = function($) {
  var data = {
    title: ""
  };

  data.title = $(".content_inner h1").text().trim();

  if (data.title && (data.title != "Program 2017" && data.title != "")) {
    $(".infobox .row").map(function() {
      var infoType = $(this).find(".leftcol").text().trim();
      var info = $(this).find(".rightcol").text().trim();

      if (map[infoType]) {
        if (transformers[map[infoType]]) {
          info = transformers[map[infoType]](info);
        }
        data[map[infoType]] = info;
      }
    });

    $(".eventview p").map(function(index) {
      if (index === 0) {
        data.description = $(this).text();
      } else {
        data.extendedDescription = $(this).text();
      }
    });

    return data;
  }

  return;
}

var storeQueue = [];
function store(json) {
  storeQueue.push(json);
  runQueue();
}

var queueIsBusy = false;
function runQueue() {
  if (queueIsBusy) {
    return;
  } 

  if (storeQueue.length > 0) {
    var blobToStore = storeQueue.shift();
    queueIsBusy = true;
    write("./events/" + blobToStore.id + ".json", JSON.stringify(blobToStore, null, 2), function() {
      queueIsBusy = false;
      runQueue();
    });
  }
}

router.on("http://www.almedalsveckan.info/event/user-view/:id").createStatic().scrape(almedalenEventScraper).then(function(data, utils) {
  if (data) {
    data.id = utils.params.id;
    console.log("Scraped " + data.id);
    write("./events/" + data.id + ".json", JSON.stringify(data, null, 2));
  }
});

for (var i = 45000;i < 46000; i++) {
  router.route("http://www.almedalsveckan.info/event/user-view/" + i);
}

