/**
 * Betting operations API
 */
var requestBetFair = require('./request');
var _ = require('lodash');

module.exports = function (session) {

  return {
    /**
     * Returns a list of Competitions (i.e., World Cup 2013)
     * associated with the markets selected by the MarketFilter.
     * Currently only Football markets have an associated competition.
     *
     * @param filter
     * @param cb
     * @param [locale]
     */
    listCompetitions: function (filter, cb, locale) {
      var data = _.extend({}, {filter: filter || {}}, {locale: locale});
      var req = {
        action: 'listCompetitions',
        data: data
      };
      requestBetFair.send(session, req, cb);
    },

    /**
     * Returns a list of Countries associated with the markets selected by the MarketFilter
     * @param filter
     * @param cb
     * @param [locale]
     */
    listCountries: function (filter, cb, locale) {
      var data = _.extend({}, {filter: filter || {}}, {locale: locale});
      var req = {
        action: 'listCountries',
        data: data
      };
      requestBetFair.send(session, req, cb);
    },

    /**
     * Returns a list of your current orders
     * @link https://api.developer.betfair.com/services/webapps/docs/display/1smk3cen4v3lu3yomq5qye0ni/listCurrentOrders
     * @param params
     * @param cb
     */
    listCurrentOrders: function (params, cb) {
      var req = {
        action: 'listCurrentOrders',
        data: params || {}
      };
      requestBetFair.send(session, req, cb);
    },

    /**
     * Returns a list of settled bets based on the bet status, ordered by settled date.
     * @param params
     * @param cb
     */
    listClearedOrders: function (params, cb) {
      var req = {
        action: 'listClearedOrders',
        data: params || {betStatus: 'SETTLED'}
      };
      requestBetFair.send(session, req, cb);
    },

    /**
     * Returns a list of Events
     * @param filter
     * @param cb
     * @param [locale]
     */
    listEvents: function (filter, cb, locale) {
      var data = _.extend({}, {filter: filter || {}}, {locale: locale});
      var req = {
        action: 'listEvents',
        data: data
      };
      requestBetFair.send(session, req, cb);
    },

    /**
     * Returns a list of Event Types (i.e. Sports) associated with the markets selected by the MarketFilter
     * @param filter
     * @param cb
     * @param [locale]
     */
    listEventTypes: function (filter, cb, locale) {
      var data = _.extend({}, {filter: filter || {}}, {locale: locale});
      var req = {
        action: 'listEventTypes',
        data: data
      };
      requestBetFair.send(session, req, cb);
    },

    /**
     * Returns a list of dynamic data about markets.
     * Dynamic data includes prices, the status of the market, the status of selections,
     * the traded volume, and the status of any orders you have placed in the market.
     *
     * @example
     {
        "marketIds": ['1.116810299'],
        "priceProjection": {
          "priceData": ["EX_BEST_OFFERS"],
          "exBestOfferOverRides": {
            "bestPricesDepth": 20,
            "rollupModel": "STAKE",
            "rollupLimit": 20
          },
          "virtualise": false,
          "rolloverStakes": false
        }
     }
     * @param params
     * @param cb
     * @returns {*}
     */
    listMarketBook: function (params, cb) {
      params = params || {};
      if (!_.isArray(params.marketIds)) {
        return cb('marketIds has been array with id"s');
      }
      var req = {
        action: 'listMarketBook',
        data: params
      };
      requestBetFair.send(session, req, cb);
    },

    /**
     * Returns a list of information about markets that does not change (or changes very rarely).
     * @param params
     * @param cb
     */
    listMarketCatalogue: function (params, cb) {
      params = params || {};
      params.maxResults = params.maxResults || 1000;  // 0 to 1000
      params.filter = params.filter || {};
      var req = {
        action: 'listMarketCatalogue',
        data: params
      };
      requestBetFair.send(session, req, cb);
    },

    /**
     * Retrieve profit and loss for a given list of markets.
     * The values are calculated using matched bets and optionally settled bets.
     * Only odds (MarketBettingType = ODDS) markets  are implemented, markets of other types
     * are silently ignored.
     *
     * @param params
     * @param cb
     * @returns {*}
     */
    listMarketProfitAndLoss: function (params, cb) {
      if (!_.isArray(params.marketIds)) {
        return cb('marketIds has been array with id"s');
      }
      var req = {
        action: 'listMarketProfitAndLoss',
        data: params
      };
      requestBetFair.send(session, req, cb);
    },

    /**
     * Returns a list of market types (i.e. MATCH_ODDS, NEXT_GOAL)
     *  associated with the markets selected by the MarketFilter
     * @param filter
     * @param cb
     * @param [locale]
     */
    listMarketTypes: function (filter, cb, locale) {
      var data = _.extend({}, {filter: filter || {}}, {locale: locale});
      var req = {
        action: 'listMarketTypes',
        data: data
      };
      requestBetFair.send(session, req, cb);
    },

    /**
     *
     * @param filter
     * @param cb
     * @param [granularity]  DAYS  HOURS MINUTES
     */
    listTimeRanges: function (filter, cb, granularity) {
      var data = _.extend({}, {filter: filter || {}}, {granularity: granularity || 'MINUTES'});
      var req = {
        action: 'listTimeRanges',
        data: data
      };
      requestBetFair.send(session, req, cb);
    },

    /**
     * Returns a list of Venues (i.e. Cheltenham, Ascot)
     * associated with the markets selected by the MarketFilter
     * @param filter
     * @param cb
     * @param [locale]
     */
    listVenues: function (filter, cb, locale) {
      var data = _.extend({}, {filter: filter || {}}, {locale: locale});
      var req = {
        action: 'listVenues',
        data: data
      };
      requestBetFair.send(session, req, cb);
    }
  };
};