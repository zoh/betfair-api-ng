var expect = require('chai').expect;
var _ = require('lodash');
var nock = require('nock');
var Accounts = require('../lib/accounts');


describe('Spec on account api', function () {
  var account;
  var sessionCfg = {
    applicationKey: 'Lv3oIsDhPgiSUHVL',
    token: 'test_token'
  };
  beforeEach(function () {
    account = Accounts(sessionCfg);
  });

  it('should getAccountDetails', function (done) {
    var $res;
    var scope = nock('https://api.betfair.com/', {
      reqheaders: {
        'X-Application': sessionCfg.applicationKey,
        'X-Authentication': sessionCfg.token,
        'Content-Type': 'application/json'
      }
    })
      .post('/exchange/account/rest/v1.0/getAccountDetails/')
      .reply(200, $res = {
        "currencyCode": "USD",
        "firstName": "Iliya",
        "lastName": "Zaharov",
        "localeCode": "en",
        "region": "GBR",
        "timezone": "EET",
        "discountRate": 0.0,
        "pointsBalance": 724
      });

    account.getAccountDetails(function (err, res) {
      expect(err).to.not.true;
      expect(res).to.be.eqls($res);
      scope.done();
      done();
    })
  });
});