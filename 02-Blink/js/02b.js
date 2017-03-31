// NW.js must be fixed to work with J5
nw.require("nwjs-j5-fix").fix();

// Open Chromium's development tools so we can see log output.
nw.Window.get().showDevTools();

// Import the Johnny-Five library and create a new Board object to work with.
var five = nw.require("johnny-five");
var board = new five.Board(); // Mac
// var board = new five.Board({port: "COM6"}); // Windows

// Add a callback to be executed when the board is ready.
board.on("ready", function() {

  // If we see this in the console, we know the board is ready!
  console.log("Board Ready for Blink Off!");

  var pin = 13,
      interval = 250;

  // Create a LED object and make it blink
  var led = new five.Led(pin);
  led.blink(interval);

  // 02b
  QuickSettings.create(100, 100, "LED Settings")

    .addRange("Interval", 50, 500, 250, 5, function(value) {
      interval = value;
      led.blink(interval);
    })

    .addButton("Toggle", function() {
      if (led.isRunning) {
        led.stop().off();
      } else {
        led.blink(interval);
      }
    });

});
