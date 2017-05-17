var DDPClient = require('ddp');
var request = require('request');

var ddpclient = new DDPClient({
  host : "localhost",
  port : 3000,
  ssl  : false,
  autoReconnect : true,
  autoReconnectTimer : 500,
  maintainCollections : true,
  ddpVersion : '1',
  useSockJs: true,
});

ddpclient.connect((err, wasReconnect) => {
  if (err) {
    console.log('DDP connection error!');
    return;
  }
  if (wasReconnect) {
    console.log('Reestablishment of a connection.');
    return;
  }
  console.log('Connected!');

  getWeather();

});

function getWeather() {
  ddpclient.call('fetchMasterTransactions', [], (err, result) => {
    result.forEach((transaction) => {
      transaction = {
        start: moment.unix(masterTransactions.tx.timeRequested),
        end: moment.unix(masterTransactions.tx.timeRequested),
        lon: masterTransactions.deliveryX,
        lat: masterTransactions.deliveryY
      };
      request('http://history.openweathermap.org/data/2.5/history/city?lat=transaction.lat&lon=transaction.lon&type=hour&start=transaction.start&end=transaction.end',
        (err, response, body) => {
          console.log('error:', err);
          console.log('statusCode:', response && response.statusCode);
          console.log('body:', body);
      });
    });
  });
}
