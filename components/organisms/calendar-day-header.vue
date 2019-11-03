<i18n
  src="@/assets/locales/components/organisms/calendar-day-header.json"
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
      required: true
    }
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
    }
  }
};
</script>

<style scoped lang="scss">
.calendar-day-header {
  flex: 1;
  width: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 65px;
  line-height: 1;
  box-sizing: border-box;
  border-left: 1px $border solid;
}
.calendar-day-header h1 {
  display: flex;
  font-weight: normal;
  font-size: 18px;
  margin: 0;
  padding: 0;
  justify-content: center;
  align-items: flex-end;
  color: $text;
}
.calendar-day-header small {
  color: $text-light;
  padding-left: 5px;
}
.calendar-day-header.today h1,
.calendar-day-header.today small {
  color: $cyan-dark;
}
@include mq(small) {
  .calendar-day-header h1 {
    font-size: 16px;
  }
  .calendar-day-header {
    flex-direction: column;
  }
  .calendar-day-header small {
    padding: 0;
    margin-top: 2px;
  }
}
</style>
