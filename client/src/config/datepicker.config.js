const weekdaysFull = [
  'Domingo',
  'Segunda-Feira',
  'Terca-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sabado',
];
const weekdaysLetter = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const weekdaysShort = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const monthsFull = [
  'Janeiro',
  'Fevereiro',
  'Marco',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];
const monthsShort = [
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

//const today = new Date();

/*const strWeekday = weekdaysFull[today.getDay()]
const strMonth = monthsFull[today.getMonth()]
const strYear = today.getFullYear()
const strToday =`${strWeekday}, ${today.getDay()} de ${strMonth} de ${strYear}`
*/

const datepickerConfig = {
  autoClose: true,
  format: 'dd/mm/yyyy',
  //defaultDate: new Date(),
  setDefaultDate: true,
  min: new Date(new Date().getFullYear() - 1, 0, 1),
  max: new Date(new Date().getFullYear() + 1, 11, 31),
  showMonthAfterYear: true,
  showClearBtn: true,
  i18n: {
    months: monthsFull,
    monthsShort: monthsShort,
    weekdays: weekdaysFull,
    weekdaysShort: weekdaysShort,
    weekdaysAbbrev: weekdaysLetter,
    cancel: 'Cancelar',
    clear: 'Limpar',
    done: 'Confirmar',
  },
  selectMonths: true,
  selectYears: true,
  //clear: false,
  today: 'Hoje',
  close: 'X',
  //done: 'Confirmar',
  //cancel: 'Sair',
  labelMonthNext: 'Próximo mês',
  labelMonthPrev: 'Mês anterior',
  labelMonthSelect: 'Selecione um mês',
  labelYearSelect: 'Selecione um ano',
  //min: new Date(today.getFullYear() - 1, 0, 1),
  //max: new Date(today.getFullYear() + 1, 11, 31),
  //closeOnSelect: true,
};

export default datepickerConfig;
