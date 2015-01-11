var Session = require('./session');
var BettingApi = require('./betting');
var AccountApi = require('./accounts');
var HeartbeatApi = require('./heartbeat');

module.exports = {
  login: login
};

function login(options, cb) {
  options = options || {};
  if (!options.username && !options.password) {
    return cb(new Error('username and password has been defined!'));
  }
  if (!options.applicationKey) {
    return cb(new Error('applicationKey should been defined!'));
  }

  Session(options, function (err, session) {
    if (err) {
      return cb(err);
    }
    cb(null, Betfair(session));
  });
}

function Betfair(session) {
  return {
    session: session,
    betting: BettingApi(session),
    account: AccountApi(session),
    heartbeat: HeartbeatApi(session)
  };
}