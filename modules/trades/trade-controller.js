const winston = require('winston');
const response = require('../../utils/hasResponse');
const MongoService = require('../../services/mongoService');
const { successMessages, errorMessages } = require('../../constants');
const Trade = require('./trade-model');

const createTrade = async (data, res) => {
  try {
    await MongoService.createNew(data, Trade);
    response.handleSuccess(res, successMessages.TRADE_ADD_SUCCESS, 200);
  } catch (error) {
    winston.log('error', error);
    response.handleServerError(res, errorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

const editTrade = async (data, res) => {
  try {
    const trade = await MongoService.findRecordById(data.tradeId, Trade);
    if (trade) {
      const updatedTrade = await MongoService.updateData(data.tradeId, data.tradeDetail, Trade);
      return response.handleSuccess(res, successMessages.UPDATE_TRADE_SUCCESS, 200, updatedTrade);
    }
    response.handleError(res, errorMessages.NOT_FOUND, 404);
  } catch (error) {
    winston.log('error', error);
    response.handleServerError(res, errorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

const removeTrade = async (data, res) => {
  try {
    const deletedTrade = await MongoService.removeById(data.tradeId, Trade);
    if (deletedTrade) {
      return response.handleSuccess(res, successMessages.REMOVE_TRADE_SUCCESS, 200);
    }
    response.handleError(res, errorMessages.NOT_FOUND, 404);
  } catch (error) {
    winston.log('error', error);
    response.handleServerError(res, errorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

const portfolio = async (res) => {
  try {
    const portfolioData = await Trade.aggregate([
      {
        $group: {
          _id: '$stock',
          trades: { $push: '$$ROOT' },
        },
      },
    ]);
    response.handleSuccess(res, successMessages.PORTFOLIO, 200, portfolioData);
  } catch (error) {
    winston.log('error', error);
    response.handleServerError(res, errorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

const holding = async (res) => {
  try {
    let totalQuantity;
    let totalPrice;
    let buyCount;

    const saveData = [];
    const data = await Trade.aggregate([
      {
        $group: {
          _id: '$stock',
          trades: { $push: '$$ROOT' },
        },
      },
    ]);

    data.forEach((i) => {
      totalQuantity = 0;
      totalPrice = 0;
      buyCount = 0;
      i.trades.forEach((t) => {
        if (t.type === 'BUY') {
          totalQuantity += t.quantity;
          totalPrice += t.price;
          buyCount += 1;
        } else {
          totalQuantity -= t.quantity;
        }
      });
      saveData.push({ stock: i._id, quantity: totalQuantity, price: totalPrice / buyCount });
    });

    response.handleSuccess(res, 'Holding', 200, saveData);
  } catch (error) {
    winston.log('error', error);
    response.handleServerError(res, errorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

const returnVal = async (res) => {
  try {
    const data = await Trade.aggregate([
      {
        $project: {
          stock: 1,
          price: { $subtract: [100, '$price'] },
          type: 1,
          quantity: 1,
        },
      },
    ]);
    data.forEach((trade) => {
      if (trade.price > 0) {
        trade.message = `${successMessages.PROFIT} ${trade.price}`;
      } else {
        trade.message = `${errorMessages.LOSS} ${trade.price}`;
      }
    });
    response.handleSuccess(res, 'Holding', 200, data);
  } catch (error) {
    winston.log('error', error);
    response.handleServerError(res, errorMessages.INTERNAL_SERVER_ERROR, 500, error);
  }
};

module.exports = {
  createTrade,
  editTrade,
  removeTrade,
  portfolio,
  holding,
  returnVal,
};
