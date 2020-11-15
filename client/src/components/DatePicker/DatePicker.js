import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import datepickerConfig from '../../config/datepicker.config.js';

export default function DatePicker(props) {
  const { label, date, onDateChange } = props;

  const [selectedDate, setSelectedDate] = useState({ value: date });

  useEffect(() => {
    //M.AutoInit();
    //const context = this;
    const elems = document.querySelectorAll('.datepicker');
    datepickerConfig.onSelect = (newDate) => {
      setSelectedDate({ value: newDate });
      console.log(newDate);
    };
    M.Datepicker.init(elems, datepickerConfig);

    /* M.Datepicker.init(elems, {
      defaultDate: date,
      setDefaultDate: true,
      format: 'dd/mm/yyyy',
      //container: inputDate,
      onSelect: function (newDate) {
        //context.setSelectedDate({ value: context.inputDate.current.value });
        setSelectedDate({ value: newDate });
        console.log(newDate);
      }, 
      autoClose: false,
    }); */
  });

  const handleOnChange = () => {
    onDateChange(selectedDate.value);
  };

  return (
    <div>
      <label className="active" htmlFor="date">
        {label}
      </label>
      <input
        id="date"
        type="text"
        value={selectedDate.value}
        className="datepicker"
        onChange={handleOnChange}
      />
    </div>
  );
}
