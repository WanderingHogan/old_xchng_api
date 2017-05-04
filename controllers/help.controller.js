'use strict';
module.exports =function(ExchangeRecord) {
    let module = {};

    // TODO: standardize response with response codes, something like:
    // {status: success, data: <data>} or {status: fail, message: 'something fucked up'}
    module.exchanges = function(req, res){
        ExchangeRecord.find().distinct('exchange', function (err, data) {
            return res.jsonp(data);
        });
    }

    module.help = function(req, res){
        res.send('Add some detailed docs here in plaintext or something later')
    }

    return module;
}