import React from 'react';
import css from './search.module.css';

export default function Search() {
  const handleClick = () => {};
  return (
    <div className={css.flexRow}>
      <div className={css.btnAdd}>
        <button
          className="waves-effect btn green darken-4"
          onClick={handleClick}
        >
          NOVO LANÇAMENTO
        </button>
      </div>
      <div className="input-field s8">
        <input
          placeholder="Filtro de lançamentos"
          type="text"
          className="validate"
        />
      </div>
    </div>
  );
}
