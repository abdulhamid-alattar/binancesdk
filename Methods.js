
const Methods = {
    'ping': {
        name: 'ping',
        version: 'v1',
        verb: 'GET',
        signed: false,
        parameters: null,
        desciption: 'Test connectivity'
    },
    'time': {
        name: 'time',
        version: 'v1',
        verb: 'GET',
        signed: false,
        parameters: null,
        desciption: 'Check server time'
    },
    'order_book': {
        name: 'depth',
        version: 'v1',
        verb: 'GET',
        signed: false,
        parameters: {
            symbol: {
                isMandatory: true,
                type: 'STRING',
                desciption: null
            },
            limit: {
                isMandatory: false,
                type: 'INT',
                desciption: 'Default 100; max 100.'
            }
        },
        desciption: ''
    },
    'trades_List': {
        name: 'aggTrades',
        version: 'v1',
        verb: 'GET',
        signed: false,
        parameters: {
            symbol: {
                isMandatory: true,
                type: 'STRING',
                desciption: null
            },
            fromId: {
                isMandatory: false,
                type: 'LONG',
                desciption: 'ID to get aggregate trades from INCLUSIVE.'
            },
            startTime: {
                isMandatory: false,
                type: 'LONG',
                desciption: 'Timestamp in ms to get aggregate trades from INCLUSIVE.'
            },
            endTime: {
                isMandatory: false,
                type: 'LONG',
                desciption: 'Timestamp in ms to get aggregate trades until INCLUSIVE.'
            },
            limit: {
                isMandatory: false,
                type: 'INT',
                desciption: 'Default 500; max 500.'
            }
        },
        desciption: 'Get compressed, aggregate trades. Trades that fill at the time, from the same order, with the same price will have the quantity aggregated.'
    },
    'klines': {
        name: 'klines',
        version: 'v1',
        verb: 'GET',
        signed: false,
        parameters: {
            symbol: {
                isMandatory: true,
                type: 'STRING',
                desciption: null
            },
            interval: {
                isMandatory: true,
                type: 'ENUM',
                desciption: null
            },
            startTime: {
                isMandatory: false,
                type: 'LONG',
                desciption: 'Timestamp in ms to get aggregate trades from INCLUSIVE.'
            },
            endTime: {
                isMandatory: false,
                type: 'LONG',
                desciption: 'Timestamp in ms to get aggregate trades until INCLUSIVE.'
            },
            limit: {
                isMandatory: false,
                type: 'INT',
                desciption: 'Default 500; max 500.'
            }
        },
        desciption: 'Kline/candlestick bars for a symbol. Klines are uniquely identified by their open time.'
    },
    'ticker24hr': {
        name: 'ticker/24hr',
        version: 'v1',
        verb: 'GET',
        signed: false,
        parameters: {
            symbol: {
                isMandatory: true,
                type: 'STRING',
                desciption: null
            }
        },
        desciption: '24 hour price change statistics.'
    },
    'allPrices_tickers': {
        name: 'ticker/allPrices',
        version: 'v1',
        verb: 'GET',
        signed: false,
        parameters: null,
        desciption: 'Latest price for all symbols.'
    },
    'allBook_tickers': {
        name: 'ticker/allBookTickers',
        version: 'v1',
        verb: 'GET',
        signed: false,
        parameters: null,
        desciption: 'Best price/qty on the order book for all symbols.'
    },
    'new_order': {
        name: 'order',
        version: 'v3',
        verb: 'POST',
        signed: true,
        apikey: true,
        parameters: {
            symbol: {
                isMandatory: true,
                type: 'STRING',
                desciption: null
            },
            side: {
                isMandatory: true,
                type: 'ENUM',
                desciption: null
            },
            type: {
                isMandatory: true,
                type: 'ENUM',
                desciption: null
            },
            timeInForce: {
                isMandatory: true,
                type: 'ENUM',
                desciption: null
            },
            quantity: {
                isMandatory: true,
                type: 'DECIMAL',
                desciption: null
            },
            price: {
                isMandatory: true,
                type: 'DECIMAL',
                desciption: null
            },
            newClientOrderId: {
                isMandatory: false,
                type: 'STRING',
                desciption: 'A unique id for the order. Automatically generated if not sent.'
            },
            stopPrice: {
                isMandatory: false,
                type: 'DECIMAL',
                desciption: 'Used with stop orders'
            },
            icebergQty: {
                isMandatory: false,
                type: 'DECIMAL',
                desciption: 'Used with iceberg orders'
            },
            timestamp: {
                isMandatory: true,
                type: 'LONG',
                desciption: null
            }
        },
        desciption: 'Send in a new order'
    },
    'test_new_order': {
        name: 'order/test',
        version: 'v3',
        verb: 'POST',
        signed: true,
        apikey: true,
        parameters: {
            symbol: {
                isMandatory: true,
                type: 'STRING',
                desciption: null
            },
            side: {
                isMandatory: true,
                type: 'ENUM',
                desciption: null
            },
            type: {
                isMandatory: true,
                type: 'ENUM',
                desciption: null
            },
            timeInForce: {
                isMandatory: true,
                type: 'ENUM',
                desciption: null
            },
            quantity: {
                isMandatory: true,
                type: 'DECIMAL',
                desciption: null
            },
            price: {
                isMandatory: true,
                type: 'DECIMAL',
                desciption: null
            },
            newClientOrderId: {
                isMandatory: false,
                type: 'STRING',
                desciption: 'A unique id for the order. Automatically generated if not sent.'
            },
            stopPrice: {
                isMandatory: false,
                type: 'DECIMAL',
                desciption: 'Used with stop orders'
            },
            icebergQty: {
                isMandatory: false,
                type: 'DECIMAL',
                desciption: 'Used with iceberg orders'
            },
            recvWindow: {
                isMandatory: false,
                type: 'LONG',
                desciption: null
            },
            timestamp: {
                isMandatory: true,
                type: 'LONG',
                desciption: null
            }
        },
        desciption: 'Test new order creation and signature/recvWindow long. Creates and validates a new order but does not send it into the matching engine.'
    },
    'query_order': { 
        name: 'order', 
        version: 'v3', 
        verb: 'GET', 
        signed: true, 
        apikey: true,
        parameters: {
            symbol: {
                isMandatory: true,
                type: 'LONG',
                desciption: null
            },
            orderId: {
                isMandatory: false,
                type: 'LONG',
                desciption: null
            },
            origClientOrderId: {
                isMandatory: false,
                type: 'STRING',
                desciption: null
            },
            recvWindow: {
                isMandatory: false,
                type: 'LONG',
                desciption: null
            },
            timestamp: {
                isMandatory: true,
                type: 'LONG',
                desciption: null
            }
        },
        desciption: 'Check an order status.Either orderId or origClientOrderId must be sent.' 
    },
    'cancel_order': { 
        name: 'order', 
        version: 'v3', 
        verb: 'DELETE', 
        signed: true, 
        apikey: true,
        parameters: {
            symbol: {
                isMandatory: true,
                type: 'LONG',
                desciption: null
            },
            orderId: {
                isMandatory: false,
                type: 'LONG',
                desciption: null
            },
            origClientOrderId: {
                isMandatory: false,
                type: 'STRING',
                desciption: null
            },
            newClientOrderId: {
                isMandatory: false,
                type: 'STRING',
                desciption: 'Used to uniquely identify this cancel. Automatically generated by default.'
            },
            recvWindow: {
                isMandatory: false,
                type: 'LONG',
                desciption: null
            },
            timestamp: {
                isMandatory: true,
                type: 'LONG',
                desciption: null
            }
        },
        desciption: 'Cancel an active order.' 
    },
    'open_orders': { 
        name: 'openOrders', 
        version: 'v3', 
        verb: 'GET', 
        signed: true, 
        apikey: true,
        parameters: {
            symbol: {
                isMandatory: true,
                type: 'LONG',
                desciption: null
            },
            recvWindow: {
                isMandatory: false,
                type: 'LONG',
                desciption: null
            },
            timestamp: {
                isMandatory: true,
                type: 'LONG',
                desciption: null
            }
        },
        desciption: 'Get all open orders on a symbol.' 
    },
    'all_orders': { 
        name: 'allOrders', 
        version: 'v3', 
        verb: 'GET', 
        signed: true, 
        apikey: true,
        parameters: {
            symbol: {
                isMandatory: true,
                type: 'LONG',
                desciption: null
            },
            orderId: {
                isMandatory: false,
                type: 'LONG',
                desciption: null
            },
            limit: {
                isMandatory: false,
                type: 'INT',
                desciption: 'Default 500; max 500.'
            },
            recvWindow: {
                isMandatory: false,
                type: 'LONG',
                desciption: null
            },
            timestamp: {
                isMandatory: true,
                type: 'LONG',
                desciption: null
            }
        },
        desciption: 'Get all account orders; active, canceled, or filled.If orderId is set, it will get orders >= that orderId. Otherwise most recent orders are returned.' 
    },
    'account_information': { 
        name: 'account', 
        version: 'v3', 
        verb: 'GET', 
        signed: true, 
        apikey: true,
        parameters: {
            recvWindow: {
                isMandatory: false,
                type: 'LONG',
                desciption: null
            },
            timestamp: {
                isMandatory: true,
                type: 'LONG',
                desciption: null
            }
        },
        desciption: 'Get current account information.' 
    },
    'account_trade_list': { 
        name: 'myTrades', 
        version: 'v3', 
        verb: 'GET', 
        signed: true,
        apikey: true,
        parameters: {
            symbol: {
                isMandatory: true,
                type: 'STRING',
                desciption: null
            },
            fromId: {
                isMandatory: false,
                type: 'LONG',
                desciption: 'TradeId to fetch from. Default gets most recent trades.'
            },
            limit: {
                isMandatory: false,
                type: 'INT',
                desciption: 'Default 500; max 500.'
            },
            recvWindow: {
                isMandatory: false,
                type: 'LONG',
                desciption: null
            },
            timestamp: {
                isMandatory: true,
                type: 'LONG',
                desciption: null
            }
        },
        desciption: 'Get trades for a specific account and symbol.' 
    },
    'user_data_stream': { 
        name: 'userDataStream', 
        version: 'v1', 
        verb: 'POST', 
        signed: false,
        apikey: true,
        parameters: null,
        desciption: 'Start a new user data stream.' 
    },
    'ka_user_data_stream': { 
        name: 'userDataStream', 
        version: 'v1', 
        verb: 'PUT', 
        signed: false,
        apikey: true,
        parameters: {
            listenKey: {
                isMandatory: true,
                type: 'STRING',
                desciption: null
            }
        },
        desciption: 'PING a user data stream to prevent a time out.' 
    },
    'close_user_data_stream': { 
        name: 'userDataStream', 
        version: 'v1', 
        verb: 'DELETE', 
        signed: false,
        apikey: true,
        parameters: {
            listenKey: {
                isMandatory: true,
                type: 'STRING',
                desciption: null
            }
        },
        desciption: 'Close out a user data stream.' 
    },
};


module.exports = Methods;