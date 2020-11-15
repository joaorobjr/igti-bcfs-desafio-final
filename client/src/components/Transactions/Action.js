import React from 'react';

export default function Action(props) {
  const { id, type, onActionClick } = props;

  const handleClick = () => {
    onActionClick(id, type);
  };

  return (
    <span
      className="material-icons"
      onClick={handleClick}
      style={styles.cursorPointer}
    >
      {type}
    </span>
  );
}

const styles = {
  cursorPointer: {
    cursor: 'pointer',
  },
};
