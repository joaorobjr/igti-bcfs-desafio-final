import React from 'react';
import Action from './Action';
import Day from './Day';
import Description from './Description';
import Value from './Value';
import Category from './Category';
import css from './transaction.module.css';

export default function Transaction(props) {
  const { id, day, category, type, description, value } = props;
  const color = type === '+' ? '#44b39d' : '#cc6055';

  const handleActionClick = (id, type) => {
    props.onActionClick(id, type);
  };

  return (
    <div style={{ backgroundColor: color }} className={css.defaultFlexRow}>
      <div className={css.leftFlexRow}>
        <Day>{day}</Day>
        <div>
          <Category>{category}</Category>
          <Description>{description}</Description>
        </div>
      </div>
      <div className={css.rightFlexRow}>
        <Value>{value}</Value>
        <div className={css.action}>
          <Action id={id} type="edit" onActionClick={handleActionClick} />
          <Action id={id} type="delete" onActionClick={handleActionClick} />
        </div>
      </div>
    </div>
  );
}
