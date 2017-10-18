import Enums from './Enums';
import Methods from './Methods';
import Validator from './MethodValidator';
const WebSocket = require("ws");
const CryptoJS = require("crypto-js");

export default class Services {

    constructor(configs) {
        this.Configs = configs;
        this.Configs.endPointUrl = 'https://www.binance.com/api/';
    }
    constructPayload(args, method) {
        let payload = '';


        Object.keys(args).forEach(function (key) {
            payload += key + '=' + args[key] + '&';
        });

        if (method.signed) {
            payload += 'signature=' + CryptoJS.HmacSHA256(payload.replace(/\&$/, ''), this.Configs.secretKey);
        }

        return '?' + payload;
    }

    constructEndPoint(args, method) {

        let url = this.Configs.endPointUrl + method.version + '/' + method.name;
        if (method.verb === 'GET') {
            url += this.constructPayload(args, method);
        }
        return url;
    }


    constructRestCall(args, method) {

        var reqHeaders = {}


        if (method.apikey) {
            reqHeaders["X-MBX-APIKEY"] = this.Configs.APIKey;
        }

        let restObj = {
            method: method.verb,
            headers: reqHeaders
        };


        if (method.verb === 'POST' || method.verb === 'PUT' || method.verb === 'DELETE') {
            restObj.body = JSON.stringify(this.constructPayload(args, method));
        }

        return restObj;


    }

    test() {
        const method = Methods.ping;
        let args = {};
        if (Validator(args, method.parameters)) {
            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    time() {
        const method = Methods.time;
        let args = {};
        if (Validator(args, method.parameters)) {
            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    orderBook(args) {
        const method = Methods.order_book;

        if (typeof args === 'undefined') {
            args = {};
        }

        if (Validator(args, method.parameters)) {
            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    tradesList(args) {
        const method = Methods.trades_List;

        if (typeof args === 'undefined') {
            args = {};
        }

        if (Validator(args, method.parameters)) {
            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    klines(args) {
        const method = Methods.klines;

        if (typeof args === 'undefined') {
            args = {};
        }

        if (Validator(args, method.parameters)) {
            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    ticker24hr(args) {
        const method = Methods.ticker24hr;

        if (typeof args === 'undefined') {
            args = {};
        }

        if (Validator(args, method.parameters)) {
            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    allPricesTickers(args) {
        const method = Methods.allPrices_tickers;

        if (typeof args === 'undefined') {
            args = {};
        }

        if (Validator(args, method.parameters)) {
            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    allBookTickers(args) {
        const method = Methods.allBook_tickers;

        if (typeof args === 'undefined') {
            args = {};
        }

        if (Validator(args, method.parameters)) {
            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }


    accountInfo(args) {
        const method = Methods.account_information;
        if (typeof args === 'undefined') {
            args = {};
        }
        args.timestamp = new Date().getTime();
        args.recvWindow = '6000000';

        if (Validator(args, method.parameters)) {

            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            )
                .then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    newOrder(args) {
        const method = Methods.new_order;
        if (typeof args === 'undefined') {
            args = {};
        }
        args.timestamp = new Date().getTime();
        args.recvWindow = '6000000';

        if (Validator(args, method.parameters)) {

            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    testNewOrder(args) {
        const method = Methods.test_new_order;
        if (typeof args === 'undefined') {
            args = {};
        }
        args.timestamp = new Date().getTime();
        args.recvWindow = '6000000';

        if (Validator(args, method.parameters)) {

            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }


    queryOrder(args) {
        const method = Methods.query_order;
        if (typeof args === 'undefined') {
            args = {};
        }
        args.timestamp = new Date().getTime();
        args.recvWindow = '6000000';

        if (Validator(args, method.parameters)) {

            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    cancelOrder(args) {
        const method = Methods.cancel_order;
        if (typeof args === 'undefined') {
            args = {};
        }
        args.timestamp = new Date().getTime();
        args.recvWindow = '6000000';

        if (Validator(args, method.parameters)) {

            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    allOrders(args) {
        const method = Methods.all_orders;
        if (typeof args === 'undefined') {
            args = {};
        }
        args.timestamp = new Date().getTime();
        args.recvWindow = '6000000';

        if (Validator(args, method.parameters)) {

            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }


    accountTradeList(args) {
        const method = Methods.account_trade_list;
        if (typeof args === 'undefined') {
            args = {};
        }
        args.timestamp = new Date().getTime();
        args.recvWindow = '6000000';

        if (Validator(args, method.parameters)) {

            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    userDataStream() {
        const method = Methods.user_data_stream;

        let args = {};

        if (Validator(args, method.parameters)) {

            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }


    keepaliveUserDataStream(args) {
        const method = Methods.ka_user_data_stream;
        if (typeof args === 'undefined') {
            args = {};
        }

        if (Validator(args, method.parameters)) {

            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }


    closeUserDataStream(args) {
        const method = Methods.close_user_data_stream;
        if (typeof args === 'undefined') {
            args = {};
        }

        if (Validator(args, method.parameters)) {

            return fetch(
                this.constructEndPoint(args, method),
                this.constructRestCall(args, method)
            ).then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;

                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }
}
