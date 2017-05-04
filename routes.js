module.exports = function(app, ExchangeRecord) {
    const helpController = require('./controllers/help.controller.js')(ExchangeRecord),
          getLatestController = require('./controllers/getLatest.controller.js')(ExchangeRecord),
          getConvertedValuesController = require('./controllers/getConvertedValues.controller.js')(ExchangeRecord);

    app.get("/api", helpController.help);
    app.get("/api/help", helpController.help);
    app.get("/api/listExchanges", helpController.exchanges);
    app.get("/api/getBestRate/:btc", getConvertedValuesController.getBestConvertedValue)
};