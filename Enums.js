
const Enums = {
    OrderStatus: {
        'NEW': 'NEW',
        'PARTIALLY_FILLED': 'PARTIALLY_FILLED',
        'FILLED': 'FILLED',
        'CANCELED': 'CANCELED',
        'PENDING_CANCEL': 'PENDING_CANCEL',
        'REJECTED': 'REJECTED',
        'EXPIRED': 'EXPIRED'
    },
    SymbolType: {
        'SPOT': 'SPOT'
    },
    OrderTypes: {
        'LIMIT': 'LIMIT',
        'MARKET': 'MARKET'
    },
    OrderSide: {
        'BUY': 'BUY',
        'SELL': 'SELL'
    },
    TimeInForce: {
        'GTC': 'GTC',
        'IOC': 'IOC'
    },
    KlineIntervals: {
        '1m': '1m',
        '3m': '3m',
        '5m': '5m',
        '15m': '15m',
        '30m': '30m',
        '1h': '1h',
        '2h': '2h',
        '4h': '4h',
        '6h': '6h',
        '8h': '8h',
        '12h': '12h',
        '1d': '1d',
        '3d': '3d',
        '1w': '1w',
        '1M': '1M'
    }
}

module.exports = Enums;