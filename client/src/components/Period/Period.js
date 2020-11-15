import React, { useEffect, useState } from 'react';
import ButtonNext from './ButtonNext.js';
import ButtonPrevious from './ButtonPrevious.js';
import SelectPeriod from './SelectPeriod.js';
import css from './period.module.css';

export default function Period(props) {
  const { periods, selected, onPeriodChange, onNavigationClick } = props;

  const [selectedPeriod, setSelectedPeriod] = useState(selected);
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrevious, setDisablePrevious] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const index = periods.findIndex((item) => item.value === selected);
    setSelectedIndex(index);
  }, [selectedIndex, periods, selected]);

  useEffect(() => {
    if (selectedIndex === 0) {
      setDisableNext(false);
      setDisablePrevious(true);
    } else if (selectedIndex === periods.length - 1) {
      setDisableNext(true);
      setDisablePrevious(false);
    } else {
      setDisableNext(false);
      setDisablePrevious(false);
    }
  }, [selectedIndex, periods]);

  const handleButtonClick = (direction) => {
    let index = selectedIndex;
    if (direction === '>' && selectedIndex < periods.length - 1) {
      index += 1;
    }
    if (direction === '<' && selectedIndex > 0) {
      index -= 1;
    }
    setSelectedIndex(index);
    const newSelectedPeriod = periods[index].value;
    setSelectedPeriod(newSelectedPeriod);
    onNavigationClick(newSelectedPeriod);
  };

  const handleChange = (value) => {
    setSelectedPeriod(value);
    onPeriodChange(value);
  };

  return (
    <div className={css.flexRow}>
      <ButtonPrevious click={handleButtonClick} disable={disablePrevious} />
      <SelectPeriod
        periods={periods}
        value={selectedPeriod}
        change={handleChange}
      />
      <ButtonNext click={handleButtonClick} disable={disableNext} />
    </div>
  );
}
