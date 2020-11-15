function formatNumber(value, locale = 'pt-BR') {
  return Intl.NumberFormat(locale).format(value);
}

function formatMoney(value, locale = 'pt-BR') {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function formatPercentage(value) {
  return `${value.toFixed(2).replace('.', ',')}%`;
}

function leftPad(value, count = 2, char = '0') {
  const stringValue = value.toString();
  let newValue = stringValue;

  if (stringValue.length < count) {
    for (let i = 0; i < count - stringValue.length; i++) {
      newValue = char + stringValue;
    }
  }

  return newValue;
}
export { formatNumber, formatMoney, formatPercentage, leftPad };
