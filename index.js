import Enums from './Enums';
import Methods from './Methods';
import Validator from './MethodValidator';
//const WebSocket = require("ws");
const CryptoJS = require("crypto-js");

export default class Services {

    /**
     * Set the config variable
     * @param {*} configs config object should have these keys APIKey,secretKey
     */
    constructor(configs) {
        this._configs = configs;
        if (!this._configs.endPointUrl) {
            this._configs.endPointUrl = 'https://www.binance.com/api/';
        }

    }

    /**
     * constructs the query string with signature
     *
     * @param {Object} args Arguments.
     * @param {Method} method
     * @returns {String} String represrents the querystring with signature
     * @private
     */
    _constructPayload(args, method) {
        let payload = '';

        Object.keys(args).forEach(function (key) {
            payload += key + '=' + args[key] + '&';
        });

        if (method.signed) {
            payload += 'signature=' + CryptoJS.HmacSHA256(payload.replace(/\&$/, ''), this._configs.secretKey);
        }

        return '?' + payload;
    }

    /**
     * Concatinate the endpoint API with version number and method name
     *
     * @param {Object} args Arguments
     * @param {Method} method 
     * @returns {String} String represrents the URL for the API call
     * @private
     */
    _constructEndPoint(args, method) {

        let url = this._configs.endPointUrl + method.version + '/' + method.name;
        if (method.verb === 'GET') {
            url += this._constructPayload(args, method);
        }
        return url;
    }

    /**
     * Creates the rest call object
     *
     * @param {Object} args Arguments.
     * @param {Method} method 
     * @returns {Object}  Object represrents Rest call headers and url
     * @private
     */
    _constructRestCall(args, method) {

        var reqHeaders = {}

        if (method.apikey) {
            reqHeaders["X-MBX-APIKEY"] = this._configs.APIKey;
        }

        let restObj = {
            method: method.verb,
            headers: reqHeaders
        };


        if (method.verb === 'POST' || method.verb === 'PUT' || method.verb === 'DELETE') {
            restObj.body = JSON.stringify(this._constructPayload(args, method));
        }

        return restObj;


    }

    /**
        * Function to initiate the API call from the methods object
        *
        * @param {Object} args Name of the event.
        * @param {Method} method Name of the event.
        * @returns {Object}  Object represrents Rest call headers
        * @private
        */
    _methodCall(method, args) {
        if (Validator(args, method.parameters)) {
            return fetch(
                this._constructEndPoint(args, method),
                this._constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    throw error;
                });
        }
    }
    /**
     * Test connectivity to the Rest API.
     *
     * @returns {Promise<ResponseJson>} Empty Json object {} if its success
     * @public
     */
    test() {
        return this._methodCall(Methods.ping);
    }

    /**
     * Test connectivity to the Rest API and get the current server time.
     *
     * @returns {Promise<ResponseJson>} Json Object contains {"serverTime": 1499827319559}
     * @public
     */
    time() {
        return this._methodCall(Methods.time);
    }

    /**
     * Returns order book depth.
     *
     * @param {String} symbol The currency pair symbol ex. LTCBTC.
     * @param {Int} limit result limit.
     * @returns {Promise<ResponseJson>} Last update and asks/bids as object
     * @public
     */
    orderBook(symbol, limit) {

        if (typeof limit === 'undefined') {
            limit = 100;
        } else if (limit > 100) {
            limit = 100;
        }

        let args = { 'symbol': symbol, 'limit': limit };

        return this._methodCall(Methods.order_book, args);
    }

    /**
     * Get compressed, aggregate trades. Trades that fill at the time, from the same order, with the same price will have the quantity aggregated.
     * If frondId, startTime, and endTime are not sent, the most recent aggregate trades will be returned.
     * 
     * @param {String} symbol The currency pair symbol ex. LTCBTC.
     * @param {Number} fromId ID to get aggregate trades from INCLUSIVE.
     * @param {Number} startTime Timestamp in ms to get aggregate trades from INCLUSIVE.
     * @param {Number} endTime Timestamp in ms to get aggregate trades until INCLUSIVE.
     * @param {Int} limit result limit.
     * @returns {Promise<ResponseJson>} Trades list as array Json object [{...},{...},...] if its success
     * @public
     */
    tradesList(symbol, fromId, startTime, endTime, limit) {

        //If both startTime and endTime are sent, limit should not be sent
        if (typeof startTime !== 'undefined' && typeof endTime !== 'undefined') {
            limit = undefined;
        } else {
            if (typeof limit === 'undefined') {
                limit = 500; //default value
            } else if (limit > 500) {
                limit = 500; // max 
            }
        }



        let args = {
            'symbol': symbol,
            'fromId': fromId,
            'startTime': startTime,
            'endTime': endTime,
            'limit': limit
        };

        return this._methodCall(Methods.trades_List, args);
    }

    /**
     * Kline/candlestick bars for a symbol. Klines are uniquely identified by their open time.
     * If startTime and endTime are not sent, the most recent klines are returned.
     * 
     * @param {String} symbol The currency pair symbol ex. LTCBTC.
     * @param {Enums.KlineIntervals} interval interval from the enums.
     * @param {Number} startTime Timestamp in ms to get aggregate trades from INCLUSIVE.
     * @param {Number} endTime Timestamp in ms to get aggregate trades until INCLUSIVE.
     * @param {Int} limit result limit.
     * @returns {Promise<ResponseJson>} Klines as array or arrays object [[...],[...],...] if its success
     * @public
     */
    klines(symbol, interval, startTime, endTime, limit) {

        if (typeof limit === 'undefined') {
            limit = 500; //default value
        } else if (limit > 500) {
            limit = 500; // max 
        }

        let args = {
            'symbol': symbol,
            'interval': interval,
            'startTime': startTime,
            'endTime': endTime,
            'limit': limit
        };
        return this._methodCall(Methods.klines, args);
    }
    /**
      * 24 hour price change statistics.
      * 
      * @param {String} symbol The currency pair symbol ex. LTCBTC.
      * @returns {Promise<ResponseJson>} object {...} if its success
      * @public
      */
    ticker24hr(symbol) {
        return this._methodCall(Methods.ticker24hr, { 'symbol': symbol });
    }

    /**
     * Latest price for all symbols.
     *
     * @returns {Promise<ResponseJson>} Array of objects [{...},{...},{....}] if its success
     * @public
     */
    allPricesTickers() {
        return this._methodCall(Methods.allPrices_tickers);
    }

    /**
     * Best price/qty on the order book for all symbols.
     *
     * @returns {Promise<ResponseJson>} Array of objects [{...},{...},{....}] if its success
     * @public
     */
    allBookTickers() {
        return this._methodCall(Methods.allBook_tickers);
    }

    /**
     * Get current account information.
     * 
     * @param {Number} recvWindow Timestamp in ms to get aggregate trades until INCLUSIVE.
     * @returns {Promise<ResponseJson>}  object represents account info {...} if its success
     * @public
     */
    accountInfo(recvWindow) {

        let args = {
            'timestamp': new Date().getTime(),
            'recvWindow': recvWindow ? recvWindow : '6000000'
        };

        return this._methodCall(Methods.account_information, args);

    }

    /**
     * Send in a new order
     * 
     * @param {String} symbol (Required) The currency pair symbol ex. LTCBTC.
     * @param {Enums.OrderSide} side (Required) order side from the enums.
     * @param {Enums.OrderTypes} type (Required) order type from the enums.
     * @param {Enums.TimeInForce} timeInForce (Required) time inforce from the enums.
     * @param {Decimal} quantity (Required) 
     * @param {Decimal} price (Required) 
     * @param {String} newClientOrderId A unique id for the order. Automatically generated if not sent.
     * @param {Decimal} stopPrice Used with stop orders
     * @param {Decimal} icebergQty Used with iceberg orders
     * @returns {Promise<ResponseJson>} Object representing the new order id and time {...} if its success
     * @public
     */
    newOrder(symbol, side, type, timeInForce, quantity, price, newClientOrderId, stopPrice, icebergQty) {


        let args = {
            'symbol': symbol,
            'side': side,
            'type': type,
            'timeInForce': timeInForce,
            'quantity': quantity,
            'price': price,
            'timestamp': new Date().getTime(),
            'newClientOrderId': newClientOrderId,
            'stopPrice': stopPrice,
            'icebergQty': icebergQty
        };

        return this._methodCall(Methods.new_order, args);

    }

    /**
     * Test new order creation and signature/recvWindow long. Creates and validates a new order but does not send it into the matching engine.
     * 
     * @param {String} symbol (Required) The currency pair symbol ex. LTCBTC.
     * @param {Enums.OrderSide} side (Required) order side from the enums.
     * @param {Enums.OrderTypes} type (Required) order type from the enums.
     * @param {Enums.TimeInForce} timeInForce (Required) time inforce from the enums.
     * @param {Decimal} quantity (Required) 
     * @param {Decimal} price (Required) 
     * @param {String} newClientOrderId A unique id for the order. Automatically generated if not sent.
     * @param {Decimal} stopPrice Used with stop orders
     * @param {Decimal} icebergQty Used with iceberg orders
     * @param {Number} recvWindow 
     * @returns {Promise<ResponseJson>} Empty object {} if its success
     * @public
     */
    testNewOrder(symbol, side, type, timeInForce, quantity, price, newClientOrderId, stopPrice, icebergQty, recvWindow) {


        let args = {
            'symbol': symbol,
            'side': side,
            'type': type,
            'timeInForce': timeInForce,
            'quantity': quantity,
            'price': price,
            'timestamp': new Date().getTime(),
            'newClientOrderId': newClientOrderId,
            'stopPrice': stopPrice,
            'recvWindow': recvWindow ? recvWindow : '6000000',
            'icebergQty': icebergQty
        };

        return this._methodCall(Methods.test_new_order, args);

    }

    /**
     * Check an order's status.
     * Either orderId or origClientOrderId must be sent.
     * 
     * @param {String} symbol (Required) The currency pair symbol ex. LTCBTC.
     * @param {Number} orderId 
     * @param {String} origClientOrderId 
     * @param {Number} recvWindow 
     * @returns {Promise<ResponseJson>} Empty object {} if its success
     * @public
     */
    queryOrder(symbol, orderId, origClientOrderId, recvWindow) {
        let args = {
            'symbol': symbol,
            'orderId': orderId,
            'origClientOrderId': origClientOrderId,
            'timestamp': new Date().getTime(),
            'recvWindow': recvWindow ? recvWindow : '6000000'
        };

        if (typeof orderId === 'undefined' && typeof origClientOrderId === 'undefined') {
            throw new Error('Either orderId or origClientOrderId must be sent');
        }

        return this._methodCall(Methods.query_order, args);

    }

    /**
     * Cancel an active order.
     * Either orderId or origClientOrderId must be sent
     * 
     * @param {String} symbol (Required) The currency pair symbol ex. LTCBTC.
     * @param {Number} orderId 
     * @param {String} origClientOrderId 
     * @param {String} newClientOrderId Used to uniquely identify this cancel. Automatically generated by default. 
     * @param {Number} recvWindow 
     * @returns {Promise<ResponseJson>} Empty object {} if its success
     * @public
     */
    cancelOrder(symbol, orderId, origClientOrderId, newClientOrderId, recvWindow) {
        let args = {
            'symbol': symbol,
            'orderId': orderId,
            'origClientOrderId': origClientOrderId,
            'timestamp': new Date().getTime(),
            'recvWindow': recvWindow ? recvWindow : '6000000'
        };
        if (typeof orderId === 'undefined' && typeof origClientOrderId === 'undefined') {
            throw new Error('Either orderId or origClientOrderId must be sent');
        }
        return this._methodCall(Methods.openOrders, args);
    }

    /**
     * Get all open orders on a symbol.
     * 
     * @param {String} symbol (Required) The currency pair symbol ex. LTCBTC.
     * @param {Number} recvWindow 
     * @returns {Promise<ResponseJson>} Array of objects [{...},{...},{...}...] if its success
     * @public
     */
    openOrders(symbol, recvWindow) {

        let args = {
            'symbol': symbol,
            'timestamp': new Date().getTime(),
            'recvWindow': recvWindow ? recvWindow : '6000000'
        };
        return this._methodCall(Methods.open_orders, args);

    }

    /**
     * Get all account orders; active, canceled, or filled.
     * If orderId is set, it will get orders >= that orderId. Otherwise most recent orders are returned.
     * 
     * @param {String} symbol (Required) The currency pair symbol ex. LTCBTC.
     * @param {Number} orderId
     * @param {Integer} limit Default 500; max 500.
     * @param {Number} recvWindow 
     * @returns {Promise<ResponseJson>} Array of objects [{...},{...},{...}...] if its success
     * @public
     */
    allOrders(symbol, orderId, limit, recvWindow) {

        if (typeof limit === 'undefined') {
            limit = 500; //default value
        } else if (limit > 500) {
            limit = 500; // max 
        }

        let args = {
            'symbol': symbol,
            'orderId': orderId,
            'limit': limit,
            'timestamp': new Date().getTime(),
            'recvWindow': recvWindow ? recvWindow : '6000000'
        };

        return this._methodCall(Methods.all_orders, args);

    }

    /**
     * Get trades for a specific account and symbol.
     * 
     * @param {String} symbol (Required) The currency pair symbol ex. LTCBTC.
     * @param {Number} fromId TradeId to fetch from. Default gets most recent trades.
     * @param {Integer} limit Default 500; max 500.
     * @param {Number} recvWindow 
     * @returns {Promise<ResponseJson>} Array of objects [{...},{...},{...}...] if its success
     * @public
     */
    accountTradeList(symbol,fromId,limit,recvWindow) {
        if (typeof limit === 'undefined') {
            limit = 500; //default value
        } else if (limit > 500) {
            limit = 500; // max 
        }
        let args = {
            'symbol': symbol,
            'fromId': fromId,
            'limit': limit,
            'timestamp': new Date().getTime(),
            'recvWindow': recvWindow ? recvWindow : '6000000'
        };
        return this._methodCall(Methods.account_trade_list, args);
    }

    /**
    * Start a new user data stream.
    * 
    * @returns {Promise<ResponseJson>} object with lic key {...} if its success
    * @public
    */
    userDataStream() {
        return this._methodCall(Methods.user_data_stream);
    }

    /**
      * PING a user data stream to prevent a time out.
      * 
      * @param {String} listenKey (Required)
      * @returns {Promise<ResponseJson>} empty object {} if its success
      * @public
      */
    keepaliveUserDataStream(listenKey) {
        return this._methodCall(Methods.ka_user_data_stream, { 'listenKey': listenKey });
    }

    /**
      * Close out a user data stream.
      * 
      * @param {String} listenKey (Required)
      * @returns {Promise<ResponseJson>} empty object {} if its success
      * @public
      */
    closeUserDataStream(args) {
        return this._methodCall(Methods.close_user_data_stream);
    }

    //TODO: Websocket APIs
    //TODO: Caching
}
