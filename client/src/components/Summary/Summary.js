import React from 'react';
import css from './summary.module.css';

export default function Summary(props) {
  const { count, revenue, expenses, balance } = props.summary;
  return (
    <div className={css.flexRow}>
      <span className={css.label}>
        Lançamento: <strong>{count}</strong>
      </span>
      <span className={css.label}>
        Receitas: <strong className={css.green}>{revenue}</strong>
      </span>
      <span className={css.label}>
        Despesas: <strong className={css.red}>{expenses}</strong>
      </span>
      <span className={css.label}>
        Saldo: <strong className={css.green}>{balance}</strong>
      </span>
    </div>
  );
}
