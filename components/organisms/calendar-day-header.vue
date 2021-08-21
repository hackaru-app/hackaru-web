<i18n
  src="~/assets/locales/components/organisms/calendar-day-header.json"
></i18n>

<template>
  <header :class="['calendar-day-header', { today: today }]">
    <h1>{{ title }}</h1>
    <small>{{ week }}</small>
  </header>
</template>

<script>
import { format, isToday, parseISO } from 'date-fns';

export default {
  props: {
    day: {
      type: String,
      required: true,
    },
  },
  computed: {
    today() {
      return isToday(parseISO(this.day));
    },
    title() {
      return format(parseISO(this.day), 'dd');
    },
    week() {
      return this.$t(`weeks[${format(parseISO(this.day), 'i') - 1}]`);
    },
  },
};
</script>

<style scoped lang="scss">
.calendar-day-header {
  align-items: center;
  border-left: 1px $border-dark solid;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 65px;
  justify-content: center;
  line-height: 1;
  width: 1px;
}
.calendar-day-header h1 {
  align-items: flex-end;
  color: $text;
  display: flex;
  font-size: 18px;
  font-weight: normal;
  justify-content: center;
  margin: 0;
  padding: 0;
}
.calendar-day-header small {
  color: $text-light;
  padding-left: 5px;
}
.calendar-day-header.today h1,
.calendar-day-header.today small {
  color: $text-primary;
}

@include mq(small) {
  .calendar-day-header h1 {
    font-size: 16px;
  }
  .calendar-day-header {
    flex-direction: column;
  }
  .calendar-day-header small {
    margin-top: 2px;
    padding: 0;
  }
}
</style>
