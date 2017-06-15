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


var tagsToRemove = [
  "Annat",
  "Ansvar",
  "Arbetskraftsbrist",
  "Arbetslivsmuseum",
  "Assistansersättning",
  "BEPS",
  "Barn/ungdom",
  "Barnrätt",
  "Bemötande",
  "Bil",
  "Bostäder",
  "Brott",
  "Bränslen",
  "Bygga broar",
  "Byggregler",
  "Chef",
  "Cirkulär ekonomi",
  "Colombia",
  "Autonomous",
  "Arbetsmarknadsinriktad rehabilitering",
  "Affärsmässig samhällsnytta",
  "Affärsmöjligheter",
  "Anhörig",
  "Betyg",
  "Bränsle",
  "Debatt",
  "Dialog",
  "Drivmedel",
  "Elit",
  "Etablering",
  "Flygskatt",
  "Folk",
  "Framtid",
  "Förebyggande",
  "Förmaksflimmer",
  "Förnybart",
  "Förpackningar",
  "Förändring",
  "Global",
  "Hemmasittare",
  "Humaniora",
  "Hälsoekonomiskt",
  "Högflourerande ämnen",
  "Idéburen",
  "Integritet",
  "Partiets dag",
  "Partiledare",
  "PFAS",
  "Politik",
  "Politiker",
  "Medborgare",
  "Könsstympning",
  "Kött",
  "LSS",
  "Laddbara fordon",
  "Lagstiftning",
  "Landsting",
  "Kommunalt monopol",
  "Kontanter",
  "Konvertit",
  "Koordinering",
  "Kosmetika",
  "Kostnadsutveckling",
  "Kristdemokraterna",
  "Kryssning",
  "Kränkningar",
  "Likvärdighet",
  "Logopeder",
  "Matchningsproblematik",
  "Mindfulness",
  "Mjukvara",
  "Musik",
  "Miljonprogram",
  "Myndigheter",
  "Osteoporos",
  "Paradigmskifte",
  "Patientorganisation",
  "Penningreform",
  "Påverkan",
  "Reduktionsplikt",
  "Reell kompetens",
  "Regelverk",
  "Regeringen",
  "Nevroledarskap",
  "NoNetLoss",
  "Nya svenskar",
  "Nyanlända",
  "Offentlig säljverksamhet",
  "Omställning",
  "Organskörd",
  "Resolution 2250",
  "Reseavdrag",
  "Representativitet",
  "Resor",
  "Resurstilldelning",
  "Reumatism",
  "Revision",
  "Robot",
  "Rädsla påverkar",
  "Rättvisa",
  "Samskapande",
  "Samtal",
  "Samverkan",
  "Samverkande myndigheter",
  "Samvetsfångar",
  "Sexuella övergrepp",
  "Sexuella trakasserier",
  "Seyfo",
  "Testbädd",
  "TMK-17",
  "Tal",
  "Tillit",
  "Tillit förändrar",
  "Tillitsbyggande",
  "Tillitsdelegationen",
  "Tillstånd",
  "Trump",
  "Trähus",
  "Tvångsarbete",
  "Unga Vuxna",
  "Tvångsarbete",
  "Utsläpp",
  "Utveckling",
  "Validering",
  "Vattenförvaltning",
  "Vinstdrivande företag",
  "Välfärdsföretag",
  "Välgörenhet",
  "Vätgas",
  "Yrkeskategorier",
  "Yrkesutbildning",
  "innovationspartnerskap",
  "Öppenhet",
  "Subvention",
  "Syrianer",
  "Solel",
  "Social investering",
  "Sjuksköterska",
  "Sjukvårdsförsäkring",
  "Statligt huvudmannaskap",
  "Stillasittande",
  "Stresshantering",
  "Stroke",
  "Studenter",
  "Styrmedel",
  "Styrning",
  "Styrsystem",
  "Centerpartiet"
];

var tagsMergeMappings = {
  "Civila samhället": "Civilsamhället",
  "Byggande": "Bostadsbyggande",
  "Cyberhot": "Dataskydd",
  "Djurskydd": "Djurrätt",
  "Digital hälsa": "E-hälsa",
  "EU-kommissionen": "EU",
  "Ekonomiska styrmedel": "Ekonomi",
  "El": "Energi",
  "Fake news": "Falska nyheter",
  "Fastighetsbranschen": "Bostadsbyggande",
  "Finansiering": "Finans",
  "Investeringar": "Finans",
  "Fonder": "Finans",
  "Barnäktenskap": "Barns rättigheter",
  "Flickors rättigheter": "Barns rättigheter",
  "Flyktingar": "Flyktingpolitik",
  "Flyktingmottagande": "Flyktingpolitik",
  "Energilösningar": "Energi",
  "Försvarspolitik": "Försvar",
  "Företagsutveckling": "Företag",
  "Forskning": "Forskning och innovation",
  "Forskning och utbildning": ["Forskning och innovation", "Utbilding"],
  "Funktionsrätt": "Funktionsnedsättning",
  "Företag": "Företagande",
  "Grundskola": "Skola",
  "Friskola": "Skola",
  "Gymnasieskola": "Skola",
  "Hyrläkare": "Hälso- och sjukvård",
  "Hållbar investering": "Hållbarhet",
  "Hållbar konsumtion": "Hållbarhet",
  "Hållbar livsstil": "Hållbarhet",
  "Hållbar matkonsumtion": "Hållbarhet",
  "Hållbar stadsutveckling": ["Hållbarhet", "Stadsutveckling"],
  "Hållbar utveckling": "Hållbarhet",
  "Hållbarhetsmål": "Hållbarhet",
  "Hållbart samhälle": "Hållbarhet",
  "Hållbart samhällsbyggande": "Hållbarhet",
  "Högskola": "Högre utbildning",
  "Universitet": "Högre utbildning",
  "Hyressättning": "Bostadspolitik",
  "Innovationssystem": "Innovation",
  "Integration": "Integration/mångfald",
  "Jämlik vård": ["Jämlikhet", "Vård"],
  "Klimat": "Klimat/miljö",
  "Klimatanpassning": "Klimat/miljö",
  "Klimatmål": "Klimat/miljö",
  "Klimatpolitik": "Klimat/miljö",
  "Klimatpolitikens 2030-mål": "Klimat/miljö",
  "Klimatpolitiska transportmål": ["Klimat/miljö", "Transport"],
  "Klimatsmart": "Klimat/miljö",
  "Miljö": "Klimat/miljö",
  "Miljögifter": "Klimat/miljö",
  "Miljömålsberedning": "Klimat/miljö",
  "PPM": "Pension",
  "Pensionsgruppen": "Pension",
  "Premiepension": "Pension",
  "Tjänstepension": "Pension",
  "Vård": "Vård och omsorg",
  "Primärvård": "Vård och omsorg",
  "Vårdföretag": "Vård och omsorg",
  "Sjukvård": "Vård och omsorg",
  "Hälso- och sjukvård": "Vård och omsorg",
  "Hälsa": "Vård och omsorg",
  "Rehabilitering": "Vård och omsorg",
  "Cannabis": "Missbruk",
  "Narkotika": "Missbruk",
  "Lärare": "Läraryrket",
  "Mathantverk": "Mat",
  "Matkultur": "Mat",
  "Media": "Media/journalistik",
  "Medieutredningen": "Media/journalistik",
  "Medier": "Media/journalistik",
  "Kulturarv": "Kultur",
  "Utbildningspolitik": "Utbildning",
  "Kunskapsmål": "Utbildning",
  "Kvinnofrid": "Våld",
  "Liberalism": "Ideologi",
  "Kompetensbrist": "Kompetens",
  "Kompetensförsörjning": "Kompetens",
  "Konfliktlösning": "Konflikt",
  "Konkurrenskraft": "Konkurrens",
  "Konsumenter": "Konsumption",
  "Konsumtionens klimatpåverkan": ["Konsumption", "Klimat"],
  "Nazism": "Extremism",
  "Regionfrågor": "Regional utveckling",
  "Religionsfrihet": ["Religion", "Mänskliga rättigheter"],
  "Rättsväsende": "Rättsväsende/brott",
  "Samhällsanalyser": "Samhälle",
  "Samhällsbyggande": "Samhälle",
  "Samhällsekonomi": "Samhälle",
  "Samhällsnytta": "Samhälle",
  "Samhällsutveckling": "Samhälle",
  "Transport": "Transporter",
  "Transportekonomi": "Transporter",
  "Våldsbejakande extremism": ["Extremism", "Våld"],
  "sänkt arbetstid": "Samhälle",
  "Sysselsättning": "Sysselsättning/arbetsmarknad",
  "Arbetsmarknadsfrågor": "Sysselsättning/arbetsmarknad",
  "Jobb": "Sysselsättning/arbetsmarknad",
  "Arbetsmarknad": "Sysselsättning/arbetsmarknad",
  "Stadspolitik": "Stadsutveckling",
  "Specialpedagogik": "Pedagogik",
  "Småföretag": "Småföretagande",
  "Småföretagare": "Småföretagande",
  "Skolutveckling": "Skola",
  "Skolpolitik": "Skola",
  "Skogsbruk": "Skog",
  "Bildning": "Utbildning",
  "Akademi": "Forskning och innovation",
  "Alkohol": "Missbruk"
};
var tagsToMerge = Object.keys(tagsMergeMappings);

function cleanTags(tags) {
  tags = tags.filter(function(tag) {
    return tagsToRemove.indexOf(tag) < 0;
  });

  var newTags = [];
  tags = tags.map(function(tag) {
    if (tagsMergeMappings[tag]) {
      if (Array.isArray(tagsMergeMappings[tag])) {
        newTags.concat(tagsMergeMappings[tag]);
        return tagsMergeMappings[tag][0];
      } else {
        return tagsMergeMappings[tag];
      }
    } else {
      return tag;
    }
  });

  return [...new Set([...tags ,...newTags])];
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
  eventData.tags = cleanTags(eventData.tags);

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
