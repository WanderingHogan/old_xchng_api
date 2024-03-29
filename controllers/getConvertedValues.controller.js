'use strict';

module.exports =function(ExchangeRecord) {
    let module = {};

    // TODO: standardize response with response codes, something like:
    // {status: success, data: <data>} or {status: fail, message: 'something fucked up'}
    module.getBestConvertedValue = function(req, res){
        const btc = Number(req.params.btc);
        let maxLTC = {
            'exchange': undefined,
            'exchangeRate': null,
            'exchangedValue': null
        };
        let maxETH = {
            'exchange': undefined,
            'exchangeRate': null,
            'exchangedValue': null
        };
        let maxDASH = {
            'exchange': undefined,
            'exchangeRate': null,
            'exchangedValue': null
        };
        if (!btc) {
            return res.jsonp({status: 'fail', message: 'You forgot to put a bitcoin value'});
        }
        if((btc > 0) && (btc !== NaN) && (btc !== undefined)){
            // TODO: figure out if people have figured out how to inject malicious things in params
            // TODO: add validators, send different message if exchange not distinct in db
            ExchangeRecord.find().sort({_id:-1}).limit(3).lean().exec(function (err, data) {
                // return res.jsonp(data);
                let btc2eth = []
                let btc2dash = []
                let btc2ltc = []
                let utcTimestamp;
                for(var a in data){
                    // console.log(data)
                    utcTimestamp = data[a].timeRecorded;
                    let exchange = data[a].exchange;
                    let latestRatesObject = data[a].values;
                    for(var b in latestRatesObject){
                        if(latestRatesObject[b].currency === 'BTC-LTC'){
                            if((maxLTC.exchangeRate === null) || (maxLTC.exchangeRate > latestRatesObject[b].buy)){
                                maxLTC.exchange = exchange,
                                maxLTC.exchangeRate = Number(latestRatesObject[b].buy);
                                maxLTC.exchangedValue = Number(btc) / Number(latestRatesObject[b].buy);
                            }
                            btc2ltc.push({'exchange': exchange, 'utcTimeUpdated': utcTimestamp, 'value': latestRatesObject[b].buy, 'exchangeValue': Number(btc) /  latestRatesObject[b].buy})
                        }
                        if(latestRatesObject[b].currency === 'BTC-DSH'){
                            if((maxDASH.exchangeRate === null) || (maxDASH.exchangeRate > latestRatesObject[b].buy)){
                                maxDASH.exchange = exchange,
                                maxDASH.exchangeRate = Number(latestRatesObject[b].buy);
                                maxDASH.exchangedValue = Number(btc) / Number(latestRatesObject[b].buy);
                            }
                            btc2dash.push({'exchange': exchange, 'utcTimeUpdated': utcTimestamp, 'value': latestRatesObject[b].buy, 'exchangeValue': Number(btc) /  latestRatesObject[b].buy})
                        }
                        if(latestRatesObject[b].currency === 'BTC-ETH'){
                            if((maxETH.exchangeRate === null) || (maxETH.exchangeRate > latestRatesObject[b].buy)){
                                maxETH.exchange = exchange,
                                maxETH.exchangeRate = Number(latestRatesObject[b].buy);
                                maxETH.exchangedValue = Number(btc) / Number(latestRatesObject[b].buy);
                            }
                            btc2eth.push({'exchange': exchange, 'utcTimeUpdated': utcTimestamp, 'value': latestRatesObject[b].buy, 'exchangeValue': Number(btc) /  latestRatesObject[b].buy})
                        }
                    }
                }
                res.jsonp({
                    'BTC-ETH': {
                        'updateTime': utcTimestamp,
                        'bestRate': maxETH.exchangeRate,
                        'bestExchange': maxETH.exchange,
                        'bestExchangeValue': maxETH.exchangedValue,
                        'allRates': btc2eth
                    },
                    'BTC-DSH': {
                        'updateTime': utcTimestamp,
                        'bestRate': maxDASH.exchangeRate,
                        'bestExchange': maxDASH.exchange,
                        'bestExchangeValue': maxDASH.exchangedValue,
                        'allRates': btc2dash
                    },
                    'BTC-LTC': {
                        'updateTime': utcTimestamp,
                        'bestRate': maxLTC.exchangeRate,
                        'bestExchange': maxLTC.exchange,
                        'bestExchangeValue': maxLTC.exchangedValue,
                        'allRates': btc2ltc
                    }
                })
            });
        }
        else {
            res.jsonp({status: 'fail', message: 'Check your BTC value or something'})
        }
    }

    return module;
}