import React from 'react';
import css from './transaction.module.css';

export default function Day(props) {
  return <div className={css.day}>{props.children}</div>;
}
