import TransactionModel from '../models/TransactionModel.js';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

async function create(req, res) {
  try {
    const transaction = await new TransactionModel(req.body).save();
    res.send(transaction);
  } catch (error) {
    logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
    res.status(400).send({ error: error.message });
  }
}

async function retrieve(req, res) {
  try {
    const period = req.query.period;
    if (!period) {
      throw new Error('Request param "period" required. Format: yyyy-mm');
    }
    const condition = { yearMonth: period };
    const transactions = await TransactionModel.find(condition).exec();
    res.send(transactions);
  } catch (error) {
    logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
    res.status(400).send({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    } = req.body;

    const transactionUpdated = {};

    if (description) {
      transactionUpdated.description = description;
    }
    if (value) {
      transactionUpdated.value = parseFloat(value);
    }
    if (category) {
      transactionUpdated.category = category;
    }
    if (year) {
      transactionUpdated.year = parseInt(year);
    }
    if (month) {
      transactionUpdated.month = parseInt(month);
    }
    if (day) {
      transactionUpdated.day = parseInt(day);
    }
    if (yearMonth) {
      transactionUpdated.yearMonth = yearMonth;
    }
    if (yearMonthDay) {
      transactionUpdated.yearMonthDay = yearMonthDay;
    }
    if (type) {
      transactionUpdated.type = type;
    }
    const options = { new: true };
    const transaction = await TransactionModel.findByIdAndUpdate(
      id,
      transactionUpdated,
      options
    ).exec();
    res.send(transaction);
  } catch (error) {
    logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
    res.status(400).send({ error: error.message });
  }
}

async function remove(req, res) {
  try {
    const id = req.params.id;
    await TransactionModel.findByIdAndRemove(id).exec();
    res.send({ message: `Transaction id=${id} was deleted` });
  } catch (error) {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
  }
}

async function findById(req, res) {
  try {
    const id = req.params.id;
    const transaction = await TransactionModel.findById(id);
    res.send(transaction);
  } catch (error) {
    logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
    res.status(400).send({ error: error.message });
  }
}

async function retrieveAllPeriod(req, res) {
  try {
    const array = await TransactionModel.distinct('yearMonth');
    res.send(array);
  } catch (error) {
    logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);
    res.status(400).send({ error: error.message });
  }
}

export default {
  create,
  retrieve,
  update,
  remove,
  findById,
  retrieveAllPeriod,
};
