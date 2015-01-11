/**
 * Hearbeat api for betfair
 */

var requestBetFair = require('./request');

module.exports = function (session) {

  /**
   * This Heartbeat operation is provided to allow customers
   * to automatically cancel their unmatched bets in the event
   * of their API client/s losing connectivity with the Betfair API.
   */
  return function (preferredTimeoutSeconds, cb) {
    requestBetFair.heartbeat(session, {
      preferredTimeoutSeconds: preferredTimeoutSeconds || 10 // 10 to 300
    }, cb);
  }
};