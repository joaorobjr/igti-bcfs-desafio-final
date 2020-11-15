import React from 'react';

export default function ButtonNext(props) {
  const { click, disable } = props;

  const handleClick = () => {
    click('>');
  };

  return (
    <button
      className="waves-effect waves-light btn green darken-4"
      onClick={handleClick}
      disabled={disable}
    >
      {'>'}
    </button>
  );
}
