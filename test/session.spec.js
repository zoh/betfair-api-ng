var expect = require('chai').expect;
var nock = require('nock');
var Session = require('../lib/session');

describe('Spec on session configuration object', function () {
  it('should get session token', function (done) {
    var scope = nock('https://identitysso.betfair.com', {
      reqheaders: {
        'X-Application': 'Lv3oIsDhPgiSUHVL',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .post('/api/login', {username: 'test', password: 'test'})
      .reply(200, {status: 'SUCCESS', token: 'sdfsdfsdf'});
    Session({
      applicationKey: 'Lv3oIsDhPgiSUHVL',
      username: 'test',
      password: 'test'
    }, function (err, session) {
      expect(session).to.be.eqls({
        applicationKey: 'Lv3oIsDhPgiSUHVL',
        username: 'test',
        password: 'test',
        token: 'sdfsdfsdf'
      });
      scope.done();
      done();
    })
  })
});