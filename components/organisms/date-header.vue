<i18n src="@/assets/locales/components/organisms/date-header.json" />

<template>
  <content-header>
    <div class="date-heading">
      <btn
        :aria-label="$t('ariaLabels.previous')"
        class="left-arrow-button has-icon"
        @click="left"
      >
        <icon name="chevron-left-icon" class="is-primary is-large" />
      </btn>

      <no-ssr>
        <v-date-picker
          :formats="{ input: ['YYYY-MM-DD'] }"
          :value="date"
          show-caps
          @input="setDate"
        >
          <heading slot-scope="props" class="heading">
            {{ format(date, $t(`${period.key}.format`)) }}
          </heading>
        </v-date-picker>
      </no-ssr>

      <btn
        :aria-label="$t('ariaLabels.next')"
        class="right-arrow-button has-icon"
        @click="right"
      >
        <icon name="chevron-right-icon" class="is-primary is-large" />
      </btn>
    </div>

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
import Heading from '@/components/atoms/heading';
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
    Heading,
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
    }
  },
  data() {
    return {
      format
    };
  },
  computed: {
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
  methods: {
    left() {
      this.$emit('left');
    },
    right() {
      this.$emit('right');
    },
    today() {
      this.setDate(new Date());
    },
    setDate(date) {
      this.$emit('update:date', date);
    },
    changePeriod(index) {
      this.$emit('update:periodIndex', Number(index));
    }
  }
};
</script>

<style scoped lang="scss">
.date-heading {
  display: flex;
  .heading {
    margin: 0 15px;
    margin-bottom: 2px;
  }
}
nav {
  display: flex;
}
.today-button {
  margin-right: 20px;
}
</style>
