import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { leftPad } from '../../helpers/formatNumberHelper.js';

Modal.setAppElement('#root');

export default function ModalTransaction(props) {
  const { transaction, isEditMode, onSave, onClose } = props;

  if (!isEditMode) {
    transaction.description = '';
    transaction.category = '';
    transaction.value = '';
    const date = new Date();
    const dd = leftPad(date.getDate());
    const mm = leftPad(date.getMonth() + 1);
    const yyyy = date.getFullYear();
    transaction.dateFormatted = `${dd}/${mm}/${yyyy}`;
  } else {
    const dd = leftPad(transaction.day);
    const mm = leftPad(transaction.month);
    const yyyy = transaction.year;
    transaction.dateFormatted = `${leftPad(dd)}/${leftPad(mm)}/${yyyy}`;
  }

  const { id, category, type, description, value, dateFormatted } = transaction;

  const [transactionType, setTransactionType] = useState(type);
  const [transactionDesc, setTransactionDesc] = useState(description);
  const [transactionCategory, setTransactionCategory] = useState(category);
  const [transactionValue, setTransactionValue] = useState(value);
  const [transactionDate, setTransactionDate] = useState(dateFormatted);
  const [errorMessage, setErrorMessage] = useState('');
  const [enableSaveButton, setEnableSaveButton] = useState(false);

  /* useEffect(() => {
    console.log(transaction);
    let dateFormatted = ''
    if(day && month && year){
      dateFormatted = `${leftPad(day)}/${leftPad(month)}/${year}`;
    }else{
      const date = new Date();
      const dd = leftPad(date.getDate());
      const mm = leftPad(date.getMonth() + 1);
      const yyyy = date.getFullYear();
      dateFormatted = `${dd}/${mm}/${yyyy}`;
    }
    setTransactionDate(dateFormatted);
   
    setTransactionDate(dateFormatted);
  }, [day, month, year]); */

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      if (
        transactionDesc === '' ||
        transactionCategory === '' ||
        transactionValue === '' ||
        transactionDate === ''
      ) {
        setEnableSaveButton(false);
        setErrorMessage('Informe todos os dados do lançamento');
      } else {
        setEnableSaveButton(true);
        setErrorMessage('');
      }
    } else {
      if (
        transactionType &&
        transactionDesc &&
        transactionCategory &&
        transactionValue &&
        transactionDate
      ) {
        setEnableSaveButton(true);
        setErrorMessage('');
      } else {
        setEnableSaveButton(false);
      }
    }
  }, [
    transactionType,
    transactionDesc,
    transactionCategory,
    transactionValue,
    transactionDate,
    isEditMode,
  ]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    /* if (!transactionType) {
      setErrorMessage('Deve ser informado o tipo de lançamento');
      return;
    }
    if (!transactionDesc) {
      setErrorMessage('Deve ser informada uma descrição para lançamento');
      return;
    }
    if (!transactionCategory) {
      setErrorMessage('Deve ser informada uma categoria para o lançamento');
      return;
    }
    if (!transactionValue) {
      setErrorMessage('Deve ser informado o valor do lançamento');
      return;
    }
    if (!transactionDate) {
      setErrorMessage('Deve ser informado a data do lançamento');
      return;
    } */
    const formData = {
      id,
      type: transactionType,
      description: transactionDesc,
      category: transactionCategory,
      value: transactionValue,
      date: transactionDate,
    };
    setErrorMessage('');
    onSave(formData);
  };

  const handleChangeType = (event) => {
    setTransactionType(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setTransactionDesc(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setTransactionCategory(event.target.value);
  };

  const handleChangeValue = (event) => {
    console.log(event.target.id);
    setTransactionValue(event.target.value);
  };

  const handleChangeDate = (event) => {
    //console.log(event.target.value);
    setTransactionDate(event.target.value);
  };

  const handleModalClose = () => {
    onClose(null);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>
            {isEditMode && 'Atualizar Lançamento'}
            {!isEditMode && 'Cadastrar Lançamento'}
          </span>
          <button
            className="waves-effect waves-light btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>
              <input
                id="inputType"
                name="inputType"
                type="radio"
                value="-"
                onChange={handleChangeType}
                checked={transactionType === '-'}
                disabled={isEditMode}
              />
              <span>Despesas</span>
            </label>
            <label>
              <input
                name="inputType"
                type="radio"
                value="+"
                onChange={handleChangeType}
                checked={transactionType === '+'}
                disabled={isEditMode}
              />
              <span>Receitas</span>
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputDescription"
              type="text"
              value={transactionDesc}
              onChange={handleChangeDescription}
            />
            <label className="active" htmlFor="inputDescription">
              Descrição :
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputCategory"
              type="text"
              value={transactionCategory}
              onChange={handleChangeCategory}
            />
            <label className="active" htmlFor="inputCategory">
              Categoria:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputValue"
              type="text"
              value={transactionValue}
              onChange={handleChangeValue}
            />
            <label className="active" htmlFor="inputValue">
              Valor:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputDate"
              type="text"
              value={transactionDate}
              onChange={handleChangeDate}
            />
            <label className="active" htmlFor="inputDate">
              Data do Lançamento:
            </label>
          </div>
          <div style={styles.flexRow}>
            <button
              className="waves-effect waves-light btn"
              disabled={!enableSaveButton}
            >
              Salvar
            </button>
            <span style={styles.errorMessage}>{errorMessage}</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },
  flexStart: {
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
