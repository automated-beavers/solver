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
  .after(8000, function () {
    console.log('>>forward');
    this.front(0.7);
  })
  .after(2000, function () {
    console.log('>>stopping');
    this.stop();
  })
  .after(5000, function () {
    console.log('>>backing');
    this.back(0.7);
  })
  .after(2000, function () {
    console.log('>>stoping');
    this.stop();
  })
  .after(5000, function () {
    console.log('>>stopping');
    this.land();
  });

