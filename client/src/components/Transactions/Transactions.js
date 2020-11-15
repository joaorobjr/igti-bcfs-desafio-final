import React from 'react';
import Transaction from './Transaction';
import { formatMoney, leftPad } from '../../helpers/formatNumberHelper.js';

export default function Transactions(props) {
  const { transactions, onDelete, onEdit } = props;

  const handleActionClick = (id, type) => {
    const transaction = transactions.find((item) => item.id === id);
    if (type === 'edit') {
      onEdit(transaction);
    }
    if (type === 'delete') {
      onDelete(transaction);
    }
  };

  return (
    <div>
      {transactions.map((transaction, index) => {
        const { id, day, category, type, description, value } = transaction;
        return (
          <div key={index}>
            <Transaction
              id={id}
              day={leftPad(day)}
              category={category}
              type={type}
              description={description}
              value={formatMoney(value)}
              onActionClick={handleActionClick}
            />
          </div>
        );
      })}
    </div>
  );
}
