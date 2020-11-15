import React from 'react';
import css from './transaction.module.css';

export default function Values(props) {
  return <div className={css.value}>{props.children}</div>;
}
