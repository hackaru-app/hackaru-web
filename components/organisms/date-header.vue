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

      <marshmallow-select :value="$t(`${period.key}.label`)" @change="change">
        <option v-for="period in allowPeriods" :key="period" :value="period">
          {{ $t(`${period}.label`) }}
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
import { format, isEqual } from 'date-fns';

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
      type: Date,
      required: true
    },
    allowPeriods: {
      type: Array,
      required: true
    },
    currentPeriod: {
      type: String,
      required: true
    }
  },
  computed: {
    period() {
      return this.$periods[this.currentPeriod];
    },
    title() {
      return format(this.date, this.$t(`${this.period.key}.format`));
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
      this.$emit('update:date', `${new Date()}`);
    },
    change(currentPeriod) {
      this.$emit('update:currentPeriod', currentPeriod);
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
