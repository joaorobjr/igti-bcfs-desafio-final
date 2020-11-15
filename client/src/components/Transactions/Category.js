import React from 'react';
import css from './transaction.module.css';

export default function Category(props) {
  return <div className={css.category}>{props.children}</div>;
}
