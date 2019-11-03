<i18n src="@/assets/locales/components/organisms/date-header.json"></i18n>

<template>
  <content-header class="date-header">
    <date-heading :title="title" @left="left" @right="right" />
    <nav>
      <transition name="fade">
        <base-button
          v-if="!hasToday"
          ref="today-button"
          class="is-marshmallow today-button"
          @click="today"
        >
          <icon name="rotate-ccw-icon" class="is-primary" />
        </base-button>
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
import BaseButton from '@/components/atoms/base-button';
import BaseSelect from '@/components/molecules/base-select';
import DateHeading from '@/components/molecules/date-heading';

export default {
  components: {
    Icon,
    ContentHeader,
    DateHeading,
    BaseButton,
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
.date-header nav {
  display: flex;
}
.today-button {
  margin-right: 15px;
  padding: 0 13px;
}
@media print {
  .today-button {
    display: none;
  }
}
</style>
