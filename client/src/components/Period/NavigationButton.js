import React from 'react';

export default function NavigationButton(props) {
  const { label, click, flag } = props;

  const handleClick = () => {
    click(label);
  };

  return (
    <button
      onClick={handleClick}
      className="waves-effect waves-light btn green darken-4"
      disabled={!flag}
    >
      {''}
    </button>
  );
}
