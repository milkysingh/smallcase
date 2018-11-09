const controller = require('./trade-controller');

module.exports = (app) => {
  app.post('/portfolio/addTrade', (req, res) => {
    const data = req.body;
    controller.createTrade(data, res);
  });
  app.patch('/portfolio/updateTrade/:tradeId', (req, res) => {
    const data = {
      tradeDetail: req.body,
      tradeId: req.params.tradeId,
    };
    controller.editTrade(data, res);
  });
  app.delete('/portfolio/removeTrade/:tradeId', (req, res) => {
    const data = req.params;
    controller.removeTrade(data, res);
  });
  app.get('/portfolio', (req, res) => {
    controller.portfolio(res);
  });
  app.get('/portfolio/holding', (req, res) => {
    controller.holding(res);
  });
  app.get('/portfolio/returns', (req, res) => {
    controller.returnVal(res);
  });
};
