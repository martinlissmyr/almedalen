"use strict";

var fs = require("fs");
var eventsDir = __dirname + "/events";
var eventFiles = fs.readdirSync(eventsDir);
var events = [];
var tags = [];

function registerTags(tagsToAdd) {
  if (tagsToAdd) {
    tags = [...new Set([...tags ,...tagsToAdd])];
  }
}

for (var i = 0, l = eventFiles.length; i < l; i++) {
  var eventData = JSON.parse(fs.readFileSync(eventsDir + "/" + eventFiles[i]));
  events.push(eventData);
  registerTags(eventData.tags);
}

module.exports = {
  events: events,
  tags: tags.sort().filter(function(item) {
    return item != "";
  }),
  filterEvents: function(tags) {
    if (!tags || tags.length === 0) {
      return events;
    }

    return events.filter(function(event) {
      if (event.tags) {
        for (var i = 0, l = tags.length; i < l; i++) {
          if (event.tags.indexOf(tags[i]) >= 0) {
            return true;
          }
        }
      }
      return false;
    });
  }
};
