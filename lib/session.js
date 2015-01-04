/**
 * ala configurator object
 *
 * Get session token
 * @param options
 *  to options applicationKey, username, password, methodAuth, crt/key files
 */
var requestBetFair = require('./request');
var _ = require('lodash');


module.exports = function (options, cb) {

  requestBetFair.login(options, function (err, token) {
    if (err) {
      return cb(err);
    }
    var session = _.extend({}, options, {token: token});
    cb(null, session);
  });
};
