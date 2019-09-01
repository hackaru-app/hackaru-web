<template>
  <article
    :style="{
      borderColor: color,
      backgroundColor: backgroundColor,
      color: textColor
    }"
    class="calendar-event"
  >
    <h1>{{ title }}</h1>
    <p class="duration">{{ duration }}</p>
  </article>
</template>

<script>
import Color from 'color';
import { parseISO, formatDistanceStrict } from 'date-fns';

export default {
  props: {
    color: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    startedAt: {
      type: String,
      default: undefined
    },
    stoppedAt: {
      type: String,
      default: undefined
    }
  },
  computed: {
    duration() {
      return (
        this.startedAt &&
        this.stoppedAt &&
        formatDistanceStrict(parseISO(this.startedAt), parseISO(this.stoppedAt))
      );
    },
    backgroundColor() {
      return Color(this.color).mix(Color('white'), 0.666);
    },
    textColor() {
      return Color(this.color).darken(0.6);
    }
  }
};
</script>

<style scoped lang="scss">
.calendar-event {
  flex: 1;
  flex-direction: row;
  position: relative;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  padding: 0;
  padding-left: 10px;
  height: 100%;
  border-left-width: 2px;
  border-left-style: solid;
  overflow: hidden;
  border-radius: 0 3px 3px 0;
  box-shadow: 0 3px 3px #00000005;
}
.calendar-event h1 {
  flex-shrink: 1;
  font-size: 15px;
  line-height: 20px;
  padding: 0;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.calendar-event p {
  flex-shrink: 9999;
  font-size: 13px;
  opacity: 0.6;
  margin: 0;
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@include mq(small) {
  .calendar-event p {
    font-size: 10px;
    margin-left: 5px;
  }
}
</style>
