import React from 'react';

export default function FilterInput(props) {
  const { placeholder, filter, onChangeFilter } = props;

  const handleInputOnChange = (event) => {
    const newText = event.target.value;
    onChangeFilter(newText);
  };

  return (
    <div>
      <input
        placeholder={placeholder}
        type="text"
        className="validate"
        value={filter}
        onChange={handleInputOnChange}
      />
    </div>
  );
}
