import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    description: { type: String, required: true },
    value: { type: Number, required: true },
    category: { type: String, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    yearMonth: { type: String, required: true },
    yearMonthDay: { type: String, required: true },
    type: { type: String, required: true },
  },
  { toJSON: { virtuals: true } }
);

const TransactionModel = mongoose.model('transactions', schema);

export default TransactionModel;
