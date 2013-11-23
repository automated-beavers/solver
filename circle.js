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
    this.front(0.6);
  })
  .after(800,function () {
    this.clockwise(0.8);
  })
  .after(500, function () {
    this.front(0.6);
  })
  .after(800,function () {
    this.clockwise(0.8);
  })
  .after(500, function () {
    this.front(0.6);
  })
  .after(800,function () {
    this.clockwise(0.8);
  })
  .after(500, function () {
    this.front(0.6);
  })
  .after(800,function () {
    this.clockwise(0.8);
  })
  .after(200,function () {
    this.stop();
  })
  .after(2000, function () {
    console.log('>>stopping');
    this.land();
  });

