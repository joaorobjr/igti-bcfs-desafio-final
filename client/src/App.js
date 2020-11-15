import React, { useState, useEffect } from 'react';
import * as apiService from './services/api.service.js';
import Period from './components/Period/Period.js';
import Summary from './components/Summary/Summary.js';
import Transactions from './components/Transactions/Transactions.js';
import { formatMoney, leftPad } from './helpers/formatNumberHelper.js';
import Spinner from './components/Spinner/Spinner.js';
import ModalTransaction from './components/Modal/ModalTransaction.js';

export default function App() {
  const today = new Date();
  const currentPeriod = `${today.getFullYear()}-${today.getMonth() + 1}`;

  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(currentPeriod);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [summary, setSummary] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPeriods = async () => {
      const allPeriods = await apiService.getAllPeriods();
      setPeriods(allPeriods);
    };
    fetchPeriods();
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      if (selectedPeriod !== '') {
        const allTransactions = await apiService.getTransactions(
          selectedPeriod
        );
        allTransactions.sort((a, b) => {
          return a.day - b.day;
        });
        setTransactions(allTransactions);
        setFilteredTransactions(Object.assign([], allTransactions));
        const resultSummary = calculateSummary(allTransactions);
        setSummary(resultSummary);
      }
    };
    fetchTransactions();
  }, [selectedPeriod]);

  useEffect(() => {
    const resultSummary = calculateSummary(filteredTransactions);
    setSummary(resultSummary);
  }, [filteredTransactions]);

  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
  };

  const handleNavigationClick = (value) => {
    setSelectedPeriod(value);
  };

  const handleSearchChange = (event) => {
    const newText = event.target.value;
    const filterLowerCase = newText.toLowerCase();
    const newFilteredTransactions = transactions.filter((transaction) => {
      return transaction.description.toLowerCase().includes(filterLowerCase);
    });
    setFilteredTransactions(newFilteredTransactions);
    const resultSummary = calculateSummary(newFilteredTransactions);
    setSummary(resultSummary);
  };

  function calculateSummary(arrayTransactions) {
    const totalRevenue = arrayTransactions.reduce((acc, curr) => {
      return curr.type === '+' ? acc + curr.value : acc;
    }, 0);

    const totalExpenses = arrayTransactions.reduce((acc, curr) => {
      return curr.type === '-' ? acc + curr.value : acc;
    }, 0);

    const totalBalance = totalRevenue - totalExpenses;
    return {
      count: arrayTransactions.length,
      revenue: formatMoney(totalRevenue),
      expenses: formatMoney(totalExpenses),
      balance: formatMoney(totalBalance),
    };
  }

  const handleDelete = async (transaction) => {
    const isDeleted = await apiService.deleteTransaction(transaction);
    if (isDeleted) {
      const index = filteredTransactions.findIndex(
        (item) => item.id === transaction.id
      );
      const newTransactions = Object.assign([], filteredTransactions);
      newTransactions.splice(index, 1);
      setFilteredTransactions(newTransactions);
      const newSummary = calculateSummary(newTransactions);
      setSummary(newSummary);
    }
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleNewTransaction = () => {
    setSelectedTransaction({});
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handlePersistData = async (formData) => {
    const { id, type, description, category, value, date } = formData;

    const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    const dt = new Date(date.replace(pattern, '$3-$2-$1'));
    const day = dt.getDate();
    const month = dt.getMonth() + 1;
    const year = dt.getFullYear();

    const transactionToPersist = {
      type,
      description,
      category,
      value: parseFloat(value),
      day: day,
      month: month,
      year: year,
      yearMonth: `${year}-${leftPad(month)}`,
      yearMonthDay: `${year}-${leftPad(month)}-${leftPad(day)}`,
    };

    if (isEditMode) {
      const updatedTransaction = await apiService.updateTransaction(
        id,
        transactionToPersist
      );
      const newTransactions = Object.assign([], filteredTransactions);
      const index = newTransactions.findIndex((item) => item.id === id);
      newTransactions.splice(index, 1, updatedTransaction);
      newTransactions.sort((a, b) => {
        return a.day - b.day;
      });
      setFilteredTransactions(newTransactions);
    } else {
      const insertedTransaction = await apiService.insertTransaction(
        transactionToPersist
      );
      const newTransactions = Object.assign([], filteredTransactions);
      newTransactions.push(insertedTransaction);
      newTransactions.sort((a, b) => {
        return a.day - b.day;
      });
      setFilteredTransactions(newTransactions);
    }
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="row">
        <h3>Desafio Final do Bootcamp Full Stack</h3>
        <h5>Controle de Finanças Pessoais</h5>
      </div>
      {periods.length === 0 && <Spinner />}
      {periods.length > 0 && (
        <div className="row">
          <Period
            periods={periods}
            selected={selectedPeriod}
            onPeriodChange={handlePeriodChange}
            onNavigationClick={handleNavigationClick}
          />
        </div>
      )}
      {transactions.length === 0 && <Spinner />}
      {transactions.length > 0 && (
        <div className="row">
          <div className="row">
            <Summary summary={summary} />
          </div>
          <div className="row">
            <div className="default-flex-row">
              <button
                className="waves-effect btn green darken-4 btn-add"
                onClick={handleNewTransaction}
              >
                NOVO LANÇAMENTO
              </button>
              <div className="input-field s12">
                <input
                  placeholder="Filtro de lançamentos"
                  type="text"
                  className="validate"
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <Transactions
              transactions={filteredTransactions}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </div>
      )}
      {isModalOpen && (
        <ModalTransaction
          onSave={handlePersistData}
          onClose={handleClose}
          isEditMode={isEditMode}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
}
