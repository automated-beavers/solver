var
  drone = require('ar-drone'),
  client = drone.createClient();

client.disableEmergency();

client.takeoff();

client
  .after(15000, function () {
    console.log('>>stopping');
    this.land();
  });

