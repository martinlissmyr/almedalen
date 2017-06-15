"use strict";

var fs = require("fs");
var eventsDir = __dirname + "/events";
var eventFiles = fs.readdirSync(eventsDir);
var events = [];
var tags = [];
var days = [];

function registerTags(tagsToAdd) {
  if (tagsToAdd) {
    tags = [...new Set([...tags ,...tagsToAdd])];
  }
}

function registerDays(timesToAdd) {
  var daysToAdd = [];
  if (timesToAdd) {
    timesToAdd.forEach(function(time) {
      var date = new Date(time.start);
      var y = date.getUTCFullYear();
      var m = date.getUTCMonth() + 1;
      var d = date.getUTCDate();
      daysToAdd.push(y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d));
    })
    days = [...new Set([...days ,...daysToAdd])];
  }
}

function registerEvent(event) {
  events.push(event);
}

for (var i = 0, l = eventFiles.length; i < l; i++) {
  var eventData = JSON.parse(fs.readFileSync(eventsDir + "/" + eventFiles[i]));

  if (!eventData.tags) { eventData.tags = []; }
  eventData.tags.push(eventData.area);

  registerEvent(eventData);
  registerTags(eventData.tags);
  registerDays(eventData.times);
}

function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
};


function filterEvents(filters) {
  var filteredEvents = [];

  filteredEvents = events.filter(function(event) {
    if (filters.tags && filters.tags.length > 0) {
      var matching = false;
      filters.tags.forEach(function(tag) {
        if (event.tags.indexOf(tag) >= 0) {
          matching = true;
        }
      });
      if (!matching) {
        return false;
      }
    }

    if (filters.days && filters.days.length > 0) {
      var matching = false;

      filters.days = filters.days.map(function(d) {
        return new Date(d);
      });

      filters.days.forEach(function(day) {
        var matchingDays = event.times.map(function(time) {
          return isSameDay(new Date(time.start), day);
        });
        if (matchingDays.length > 0) {
          matching = true;
        }
      });
      if (!matching) {
        return false;
      }
    }

    return true;
  });

  return filteredEvents;
}

module.exports = {
  events: events,
  days: days.sort(),
  tags: tags.sort().filter(function(item) {
    if (!item) { return false; }
    return item.trim() != "";
  }),
  filterEvents: filterEvents
};
