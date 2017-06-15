function isToday(d) {
  return utc(d) == utc(new Date());
}

function isTomorrow(d) {
  return utc(d) - (24 * 60 * 60 * 1000) === utc(new Date());
}

function isYesterday(d) {
  return utc(d) + (24 * 60 * 60 * 1000) === utc(new Date());
}

function utc(d) {
  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
}

function padTime(i) {
  // Pad with a leading zero if i < 10
  if (i < 10) {
    return "0" + i;
  }
  return i 
}


function getPrettyDate(d, includeDate, includeTime) {
  d = new Date(d);

  var locale = {
    "timeDelimiter": ".",
    "now": "nu",
    "prettyDateFormat": "DAY, DD MONTH",
    "today": "idag",
    "tomorrow": "i morgon",
    "yesterday": "igår",
    "days": ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"],
    "months": ["Jan", "Feb", "Mar", "Apr", "Maj", "Juni", "Juli", "Aug", "Sep", "Okt", "Nov", "Dec"]
  };

  // If we don't have a date, let's just embrace the moment and return "now"
  if (!d) {
    return locale.now;
  }

  var str = "";

  if (includeDate) {
    if (isToday(d)) {
      str = locale.today;
    } else if (isTomorrow(d)) {
      str = locale.tomorrow;
    } else if (isYesterday(d)) {
      str = locale.yesterday;
    } else {
      str = locale.prettyDateFormat;
      str = str.replace(/DAY/, locale.days[d.getDay()]);
      str = str.replace(/MONTH/, locale.months[d.getMonth()]);
      str = str.replace(/DD/, d.getDate());
      str = str.replace(/MM/, d.getMonth() + 1);
    }
  }

  if (includeTime) {
    str += " " + padTime(d.getHours()) + locale.timeDelimiter + padTime(d.getMinutes());
  }
  return str.trim();
};

module.exports = {
  prettyTimeSpan: function(d1, d2) {
    return getPrettyDate(d1, true, false) + " – " + getPrettyDate(d2, false, false);
  },
  prettyDay: function(d) {
    return getPrettyDate(d, true, false);
  }
}
