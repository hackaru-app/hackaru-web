import Vue from 'vue';
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
  endOfDay,
  endOfWeek,
  endOfMonth,
  endOfYear
} from 'date-fns';

const install = function(Vue, options) {
  Vue.prototype.$periods = {
    day: {
      key: 'day',
      startOf: startOfDay,
      endOf: endOfDay,
      add: addDays
    },
    week: {
      key: 'week',
      startOf: startOfWeek,
      endOf: endOfWeek,
      add: addWeeks
    },
    month: {
      key: 'month',
      startOf: startOfMonth,
      endOf: endOfMonth,
      add: addMonths
    },
    year: {
      key: 'year',
      startOf: startOfYear,
      endOf: endOfYear,
      add: addYears
    }
  };
};

Vue.use({ install });
