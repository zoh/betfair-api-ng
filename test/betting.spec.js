var expect = require('chai').expect;
var _ = require('lodash');
var nock = require('nock');
var Betting = require('../lib/betting');


describe('Spec on betting api', function () {
  var betting;
  var sessionCfg = {
    applicationKey: 'Lv3oIsDhPgiSUHVL',
    token: 'test_token'
  };
  beforeEach(function () {
    betting = Betting(sessionCfg);
  });

  it('listCompetitions', function (done) {
    var scope = nock('https://api.betfair.com/', {
      reqheaders: {
        'X-Application': sessionCfg.applicationKey,
        'X-Authentication': sessionCfg.token,
        'Content-Type': 'application/json'
      }
    })
      .post('/exchange/betting/rest/v1.0/listCompetitions/', _.extend({filter: {}}, {locale: 'ru'}))
      .reply(200, [{eventId: 1}]);

    betting.listCompetitions({}, function (err, res) {
      expect(err).to.not.true;
      expect(res).to.be.eqls([{eventId: 1}]);
      scope.done();
      done();
    }, 'ru')
  });

  it('listCountries', function (done) {
    var scope = nock('https://api.betfair.com/', {
      reqheaders: {
        'X-Application': sessionCfg.applicationKey,
        'X-Authentication': sessionCfg.token,
        'Content-Type': 'application/json'
      }
    })
      .post('/exchange/betting/rest/v1.0/listCountries/',
      _.extend({filter: {eventId: 1}}, {locale: 'ru'}))
      .reply(200, [{cntId: 1}]);

    betting.listCountries({eventId: 1}, function (err, res) {
      expect(err).to.not.true;
      expect(res).to.be.eqls([{cntId: 1}]);
      scope.done();
      done();
    }, 'ru')
  });

  it('listCurrentOrders', function (done) {
    var scope = nock('https://api.betfair.com/', {
      reqheaders: {
        'X-Application': sessionCfg.applicationKey,
        'X-Authentication': sessionCfg.token,
        'Content-Type': 'application/json'
      }
    }).post('/exchange/betting/rest/v1.0/listCurrentOrders/', {})
      .reply(200, {currentOrders: [], moreAvailable: false});

    betting.listCurrentOrders(null, function (err, res) {
      expect(err).to.not.true;
      expect(res).to.be.eqls({currentOrders: [], moreAvailable: false});
      scope.done();
      done();
    });
  });

  it('listMarketBook check marketIds', function () {
    betting.listMarketBook(null, function (err, res) {
      expect(err).to.be.eql('marketIds has been array with id"s');
    });
  });

  describe('place new order', function () {
    it('should check market id defined', function () {
      betting.placeOrders(null, null, null, function (err, res) {
        expect(err).to.be.eql('marketId has been defined');
      });
    });

    it('should check instructions for bets', function () {
      betting.placeOrders('1.23234234', null, null, function (err, res) {
        expect(err).to.be.eq('instructions for bets should be defined!');
      });
    });

    it('should send request', function (done) {
      var uu = betting.$unique();
      var scope = nock('https://api.betfair.com/', {
        reqheaders: {
          'X-Application': sessionCfg.applicationKey,
          'X-Authentication': sessionCfg.token,
          'Content-Type': 'application/json'
        }
      }).post('/exchange/betting/rest/v1.0/placeOrders/', {
        marketId: '1.23234234',
        instructions: [{}],
        customerRef: uu
      })
        .reply(200, {});

      betting.placeOrders('1.23234234', [{}], uu, function (err, res) {
        expect(err).to.not.ok;
        console.log(arguments);
        done();
        scope.done();
      });
    });

  });
});