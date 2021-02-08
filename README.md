
#Simple Betfair API-NG
Login maybe how non-interactive/interactive endpoint.

Contains:
* Betting API
* Accounts API
* Heartbeat API
* Keep-Alive Request

## Install
```
npm install betfair-api-ng
```
For "Non-Interactive (bot) login" add crt and key file in root or ./crt/ directory

## Examples
```js
// login with certificate.
Betfair.login({
  applicationKey: 'your_api_key',
  username: 'your_username',
  password: 'your_password',

  certFile: './crt/client.crt',
  keyFile: './crt/client.key'
}, function (err, betfair) {
  // ...
});
```
How to create  [Application Keys](https://api.developer.betfair.com/services/webapps/docs/display/1smk3cen4v3lu3yomq5qye0ni/Application+Keys) 

```js
Betfair.login(optionsLogin, function (err, betfair) {
  if (err) {
    return console.error(err);
  }
  // listCurrencyRates
  betfair.account.listCurrencyRates('GBP', console.log.bind(console));
  
  // get markets matchOdss, over/Under 0.5 from event 'Sunderland v Liverpool'
  betfair.betting.listEvents({
    textQuery: 'Sunderland v Liverpool'
  }, function (err, res) {
    var event = _.first(res);
    betfair.betting.listMarketCatalogue({
      filter: {
        marketTypeCodes: ['MATCH_ODDS', 'OVER_UNDER_05'],
        eventIds: [event.event.id]
      },
      sort: 'FIRST_TO_START'
    }, function (err, res) {
      console.log(JSON.stringify(res, null, 4));
    });
  });
});
```

You should also implement a [Keep-Alive Request](https://docs.developer.betfair.com/pages/viewpage.action?pageId=3834909#Login&SessionManagement-KeepAlive) and keep an open connection (sessions will close after 24 hours)

```js
betfair.account.keepAlive(function (err, res) {
  return console.log((err ? res.error : res.status));
});
```

## Tests
run unit tests
install mocha and dependencies
and :
```
$ npm test
```
