import React from 'react';

export default function SelectPeriod(props) {
  const { periods, value, change } = props;

  const handleChange = (event) => {
    change(event.target.value);
  };

  return (
    <div style={{ width: '130px' }}>
      <select value={value} className="browser-default" onChange={handleChange}>
        {periods.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
