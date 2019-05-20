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

      <base-select :value="$t(`${currentPeriod}.label`)" @change="change">
        <option
          v-for="period in periods"
          :key="period"
          :value="period"
          :selected="period === currentPeriod"
        >
          {{ $t(`${period}.label`) }}
        </option>
      </base-select>
    </nav>
  </content-header>
</template>

<script>
import Icon from '@/components/atoms/icon';
import ContentHeader from '@/components/organisms/content-header';
import Btn from '@/components/atoms/btn';
import BaseSelect from '@/components/molecules/base-select';
import DateHeading from '@/components/molecules/date-heading';

export default {
  components: {
    Icon,
    ContentHeader,
    DateHeading,
    Btn,
    BaseSelect
  },
  props: {
    title: {
      type: String,
      required: true
    },
    hasToday: {
      type: Boolean,
      required: true
    },
    periods: {
      type: Array,
      required: true
    },
    currentPeriod: {
      type: String,
      required: true
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
      this.$emit('today');
    },
    change(period) {
      this.$emit('update:currentPeriod', period);
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
