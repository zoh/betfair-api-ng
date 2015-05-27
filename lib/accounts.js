/**
 * Accounts api for betfair
 */

var requestBetFair = require('./request');
var _ = require('lodash');

module.exports = function (session) {

  return {
    /**
     * Returns the details relating your account,
     * including your discount rate and Betfair point balance
     * @param cb
     */
    getAccountDetails: function (cb) {
      requestBetFair.sendAccount(session, {action: 'getAccountDetails'}, cb);
    },

    /**
     * Create 2 application keys for given user; one active and the other delayed
     * @param appName
     * @param cb
     */
    createDeveloperAppKeys: function (appName, cb) {
      requestBetFair.sendAccount(session, {
        data: {appName: appName},
        action: 'createDeveloperAppKeys'
      }, cb);
    },

    /**
     * Get available to bet amount. The getAccounts service will return the
     * UK wallet balance by default from either the UK or AUS Accounts API
     * endpoint if the wallet parameter is not specified.
     */
    getAccountFunds: function (wallet, cb) {
      requestBetFair.sendAccount(session, {
        data: {wallet: wallet || 'UK'},
        action: 'getAccountFunds'
      }, cb);
    },

    /**
     * Get all application keys owned by the given developer/vendor
     * @param cb
     */
    getDeveloperAppKeys: function (cb) {
      requestBetFair.sendAccount(session, {action: 'getDeveloperAppKeys'}, cb);
    },

    /**
     * Get account statement
     * @param cb
     */
    getAccountStatement: function (params, cb) {
      requestBetFair.sendAccount(session, {
        action: 'getAccountStatement',
        data: params
      }, cb);
    },

    /**
     * Returns a list of currency rates based on given currency
     * @param fromCurrency
     * @param cb
     */
    listCurrencyRates: function (fromCurrency, cb) {
      requestBetFair.sendAccount(session, {
        action: 'listCurrencyRates',
        data: {fromCurrency: fromCurrency}
      }, cb);
    },

    /**
     * Transfer funds between the UK Exchange and Australian Exchange wallets.
     * You require funds in the Australian Exchange wallet to bet on Australian markets.
     * @param from
     * @param to
     * @param amount
     * @param cb
     */
    transferFunds: function (from, to, amount, cb) {
      requestBetFair.sendAccount(session, {
        action: 'transferFunds',
        data: {
          from: from,
          to: to,
          amount: amount
        }
      }, cb);
    }
  };
};
