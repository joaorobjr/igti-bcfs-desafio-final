import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const months = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

async function getAllPeriods() {
  const res = await axios.get(`${API_URL}/all/period`);
  const allPeriods = res.data.map((item) => {
    const period = new Date(Date.parse(item));
    const month = period.getMonth();
    const year = period.getFullYear();
    return { value: item, label: `${months[month]}/${year}` };
  });
  return allPeriods;
}

async function getTransactions(period) {
  const res = await axios.get(`${API_URL}?period=${period}`);
  const allTransactions = res.data;
  return allTransactions;
}

async function insertTransaction(transaction) {
  const response = await axios.post(API_URL, transaction);
  return response.data;
}

async function updateTransaction(id, transaction) {
  const response = await axios.patch(`${API_URL}/${id}`, transaction);
  return response.data;
}

async function deleteTransaction(transaction) {
  const response = await axios.delete(`${API_URL}/${transaction.id}`);
  return response.data;
}

export {
  getAllPeriods,
  getTransactions,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
};
