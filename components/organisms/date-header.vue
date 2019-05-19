<i18n src="@/assets/locales/components/organisms/date-header.json" />

<template>
  <content-header>
    <date-heading :title="title" @left="left" @right="right" />
    <nav>
      <transition name="fade">
        <btn
          v-if="!hasToday"
          ref="today-button"
          class="has-dropshadow today-button"
          @click="today"
        >
          <icon name="rotate-ccw-icon" class="is-primary" />
        </btn>
      </transition>

      <marshmallow-select
        ref="period-select"
        :value="$t(`${period.key}.label`)"
        :aria-label="$t('ariaLabels.selectPeriod')"
        @change="changePeriod"
      >
        <option
          v-for="(period, index) in periods"
          :key="index"
          :value="index"
          :selected="index === periodIndex"
        >
          {{ $t(`${period.key}.label`) }}
        </option>
      </marshmallow-select>
    </nav>
  </content-header>
</template>

<script>
import Icon from '@/components/atoms/icon';
import ContentHeader from '@/components/organisms/content-header';
import Btn from '@/components/atoms/btn';
import MarshmallowSelect from '@/components/molecules/marshmallow-select';
import DateHeading from '@/components/molecules/date-heading';
import {
  format,
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
  endOfYear,
  isEqual
} from 'date-fns';

export const periods = {
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

export default {
  components: {
    Icon,
    ContentHeader,
    DateHeading,
    Btn,
    MarshmallowSelect
  },
  props: {
    date: {
      type: String,
      required: true
    },
    periodIndex: {
      type: Number,
      default: 0
    },
    periods: {
      type: Array,
      required: true
    },
    cacheKey: {
      type: String,
      required: true
    }
  },
  computed: {
    title() {
      const formatString = this.$t(`${this.period.key}.format`);
      return format(this.date, formatString);
    },
    period() {
      return this.periods[this.periodIndex];
    },
    hasToday() {
      return isEqual(
        this.period.startOf(new Date()),
        this.period.startOf(this.date)
      );
    }
  },
  watch: {
    periodIndex() {
      localStorage.setItem(this.cacheKey, this.periodIndex);
    }
  },
  mounted() {
    const cached = localStorage.getItem(this.cacheKey);
    if (cached) this.changePeriod(cached);
  },
  methods: {
    left() {
      this.$emit('left');
    },
    right() {
      this.$emit('right');
    },
    today() {
      this.$emit('update:date', `${new Date()}`);
    },
    changePeriod(index) {
      this.$emit('update:periodIndex', Number(index));
    }
  }
};
</script>

<style scoped lang="scss">
nav {
  display: flex;
}
.today-button {
  margin-right: 20px;
}
@media print {
  .date-heading span {
    display: inline;
    color: $grey-333;
    font-size: 26px;
    margin-right: 15px;
  }
}
</style>
