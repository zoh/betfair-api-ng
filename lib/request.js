/**
 * Request maker for BetFair api.
 */
var request = require('request');
var fs = require('fs');


module.exports = {

  login: function (sessionConfig, cb) {
    var options = sessionConfig;
    var cfg = {
      url: 'https://identitysso-cert.betfair.com/api/certlogin',
      headers: {
        'X-Application': options.applicationKey,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true,
      form: {
        username: options.username,
        password: options.password
      }
    };

    if (!options.certFile || !options.keyFile) {
      cfg.url = 'https://identitysso.betfair.com/api/login';
    } else {
      cfg.agentOptions = {
        cert: fs.readFileSync(options.certFile),
        key: fs.readFileSync(options.keyFile),
        securityOptions: 'SSL_OP_NO_SSLv3'
      };
    }

    request.post(cfg, function (err, http, body) {
      if (err) {
        return cb(err);
      }
      if (body.status == 'SUCCESS') {
        // save token
        cb(null, body.token)
      } else {
        cb(body)
      }
    });
  },

  /**
   * Send request on REST Api
   * @param session
   * @param params
   * @param cb
   */
  send: function (session, params, cb) {
    var action = params.action;
    var data = params.data;
    cb = cb || new Function;

    var optionsRequest = {
      url: 'https://api.betfair.com/exchange/betting/rest/v1.0/' + action + '/',
      json: data,
      headers: {
        'X-Application': session.applicationKey,
        'X-Authentication': session.token,
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    };
    request.post(optionsRequest, function (err, httpResp, body) {
      if (httpResp && httpResp.statusCode == 200) {
        cb(null, body)
      } else {
        cb(body)
      }
    });
  },
  
  keepAlive: function (session, cb) {
    cb = cb || new Function;

    var optionsRequest = {
      url: 'https://identitysso.betfair.com/api/keepAlive',
      json: true,
      headers: {
        'X-Application': session.applicationKey,
        'X-Authentication': session.token,
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    };
    request.post(optionsRequest, function (err, httpResp, body) {
      if (httpResp && httpResp.statusCode == 200) {
        cb(null, body)
      } else {
        cb(body)
      }
    });
  },

  sendAccount: function (session, params, cb) {
    var action = params.action;
    var data = params.data;
    cb = cb || new Function;

    var optionsRequest = {
      url: 'https://api.betfair.com/exchange/account/rest/v1.0/' + action + '/',
      json: data || true,
      headers: {
        'X-Application': session.applicationKey,
        'X-Authentication': session.token,
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    };
    request.post(optionsRequest, function (err, httpResp, body) {
      if (httpResp && httpResp.statusCode == 200) {
        cb(null, body)
      } else {
        cb(body)
      }
    });
  },

  heartbeat: function (session, params, cb) {
    cb = cb || new Function;

    var optionsRequest = {
      url: 'https://api.betfair.com/exchange/heartbeat/json-rpc/v1',
      json: {
        "params": params,
        "jsonrpc": "2.0",
        "method": "HeartbeatAPING/v1.0/heartbeat",
        "id": 1
      },
      headers: {
        'X-Application': session.applicationKey,
        'X-Authentication': session.token,
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    };
    request.post(optionsRequest, function (err, httpResp, body) {
      if (httpResp && httpResp.statusCode == 200) {
        cb(null, body)
      } else {
        cb(body)
      }
    });
  },

  sendRPC: function (session, params, cb) {
    cb = cb || new Function;

    var optionsRequest = {
      url: 'https://api.betfair.com/exchange/betting/json-rpc/v1',
      json: params,
      headers: {
        'X-Application': session.applicationKey,
        'X-Authentication': session.token,
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    };
    console.log(JSON.stringify(optionsRequest, 4, 4));
    request.post(optionsRequest, function (err, httpResp, body) {
      if (httpResp && httpResp.statusCode == 200) {
        cb(null, body)
      } else {
        cb(body)
      }
    });
  }
};
