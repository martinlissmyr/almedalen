"use strict";

const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");
const sass = require("koa-sass");
const serve = require("koa-static");

const helpers = require("./helpers");
const program = require("./program");

const port = 3000;
const app = new Koa();
const router = new Router();

// Set up SASS
app.use(sass({
  src: __dirname + "/stylesheets/",
  dest: __dirname + "/public/"
}));

// Set up templates
app.use(views(__dirname + "/templates", {
  map: {
    hbs: "handlebars"
  },
  options: {
    partials: {
      "event": "event",
      "events": "events"
    },
    helpers: helpers
  },
  extension: "hbs",
}));

// Set up serving of static files
app.use(serve("./public"));

// Set up routes
router.get("/", async function(ctx) {
  var selectedTags = ctx.request.query.tags ? ctx.request.query.tags.split("|") : [];
  var selectedDays = ctx.request.query.days ? ctx.request.query.days.split("|") : [];

  await ctx.render("index", {
    tags: program.tags,
    days: program.days,
    events: program.filterEvents({
      tags: selectedTags,
      days: selectedDays
    }),
    selectedTags: selectedTags,
    selectedDays: selectedDays
  });
});

router.get("/events", async function(ctx) {
  var selectedTags = ctx.request.query.tags ? ctx.request.query.tags.split("|") : [];
  var selectedDays = ctx.request.query.days ? ctx.request.query.days.split("|") : [];

  console.log("\"" + selectedTags.join("\",\n\"") + "\"");

  await ctx.render("events", program.filterEvents({
    tags: selectedTags,
    days: selectedDays
  }));
});


// Start the app
console.log("App now available at localhost:" + port);
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port);
