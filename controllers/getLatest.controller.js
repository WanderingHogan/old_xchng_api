'use strict';
module.exports =function(ExchangeRecord) {
    let module = {};

    // TODO: standardize response with response codes, something like:
    // {status: success, data: <data>} or {status: fail, message: 'something fucked up'}
    module.getLatest = function(req, res){
        var exchange = req.params.exchange;
        if (!exchange) {
            // TODO: Currently this returns just the most recent 3 records, it should return the most recent records with a distinct exchange (in case one api blocks me)
            ExchangeRecord.find().sort({_id:-1}).limit(3).lean().exec(function (err, data) {
                return res.jsonp(data);
            });
        }
        if(exchange){
            // TODO: figure out if people have figured out how to inject malicious things in params
            // TODO: add validators, send different message if exchange not distinct in db
            ExchangeRecord.find({'exchange': exchange}).sort({_id:-1}).limit(1).lean().exec(function (err, data) {
                return res.jsonp(data);
            });
        }
    }

    return module;
}