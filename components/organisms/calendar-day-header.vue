<i18n src="@/assets/locales/components/organisms/calendar-day-header.json" />

<template>
  <header :class="['calendar-day-header', { today: isToday(day) }]">
    <h1>{{ format(day, 'DD') }}</h1>
    <small>{{ $t(`weeks[${format(day, 'd')}]`) }}</small>
  </header>
</template>

<script>
import { format, isToday } from 'date-fns';

export default {
  props: {
    day: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      format,
      isToday
    };
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
  font-size: 16px;
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
  .calendar-day-header {
    flex-direction: column;
  }
  .calendar-day-header small {
    padding: 0;
    margin-top: 2px;
  }
}
</style>
