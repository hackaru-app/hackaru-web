<i18n src="@/assets/locales/components/organisms/calendar-day-header.json" />

<template>
  <header :class="['calendar-day-header', { today: isToday(day) }]">
    <button @click="click">
      <h1>{{ format(day, 'DD') }}</h1>
      <small>{{ $t(`weeks[${format(day, 'd')}]`) }}</small>
    </button>
  </header>
</template>

<script>
import { format, isToday } from 'date-fns';

export default {
  props: {
    day: {
      type: Date,
      required: true
    }
  },
  data() {
    return {
      format,
      isToday
    };
  },
  methods: {
    click() {
      this.$emit('click', this.day);
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
  box-sizing: border-box;
  border-left: 1px $border solid;
}
.calendar-day-header button {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border: 0;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
  &:active {
    transform: scale(0.9);
  }
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
  color: $cyan;
}
@include mq(small) {
  .calendar-day-header button {
    flex-direction: column;
  }
  .calendar-day-header small {
    padding: 0;
  }
}
</style>
