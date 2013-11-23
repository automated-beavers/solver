var
  drone = require('ar-drone'),
  client = drone.createClient(),
  fs = require('fs'),
  prettyjson = require('prettyjson');

fs.writeFile('data.txt', '');

client.disableEmergency();

var meter = function () {
  return 1;
};

var dataCollector = function (data) {
  var demo = data.demo;
  fs.appendFile('data.txt', prettyjson.render(JSON.stringify(demo)));
  fs.appendFile('data.txt', "\n\n");
};

client.takeoff();

client
  .on('navdata', dataCollector)
  .after(7000, function () {
    this.front(0.3);
  })
  .after(2000, function () {
    this.stop();
  })
  .after(1500, function () {
    this.clockwise(0.65);
  })
  .after(1000, function () {
    this.stop();
  })
  .after(500, function () {
    this.front(0.3);
  })
  .after(2000, function () {
    this.stop();
  })
  .after(1000, function () {
    this.land();
  });

