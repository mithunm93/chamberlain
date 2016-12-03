var casper = require('casper').create({
  verbose: true,
  logLevel: 'debug',
  pageSettings: {
      loadImages:  false,         // The WebPage instance used by Casper will
      loadPlugins: false,         // use these settings
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
});

casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

casper.on("error", function(msg, trace) {
    this.echo("Error: " + msg, "ERROR");
});

const private = require("./private");
const constants = require("./constants");
const a = casper.cli.get(0);

casper.echo("Request to " + a + " action on garage");
casper.start("https://www.mychamberlain.com/");

// 1. Login
casper.waitForSelector('form#loginForm', function() {
  this.echo("main page loaded");
  this.fill('form#loginForm', {
    'Email': private.username,
    'Password': private.password,
  }, true);
});

// 2. Click image to open/close garage
casper.waitForSelector('div.imgContainer', function() {
  this.echo("logged in successfully");
  var page = this.getPageContent();

  // Only click if the proper image is displayed
  if ((a === constants.actions.open && page.indexOf(constants.closedDoorImg) !== -1)
    || (a === constants.actions.close && page.indexOf(constants.openDoorImg) !== -1)) {

    this.echo("Performing " + a + " on garage");
    this.click('div.imgContainer', "50%", "50%");
  } else this.echo("Something bad happened :(\na: " + a + "\n\n" + page);
}).wait(1000); // wait a bit for the event to go through

casper.run();
