<template>
  <article
    :style="{
      borderColor: color,
      backgroundColor: backgroundColor,
      color: textColor,
    }"
    class="calendar-event"
  >
    <h1>{{ title }}</h1>
  </article>
</template>

<script>
import Color from 'color';

export default {
  props: {
    color: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    startedAt: {
      type: String,
      default: undefined,
    },
    stoppedAt: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    backgroundColor() {
      return Color(this.color).mix(Color('white'), 0.666);
    },
    textColor() {
      return Color(this.color).darken(0.6);
    },
  },
};
</script>

<style scoped lang="scss">
.calendar-event {
  flex: 1;
  flex-direction: row;
  position: relative;
  box-sizing: border-box;
  justify-content: flex-start;
  display: flex;
  padding: 7px;
  padding-bottom: 8px;
  padding-top: 0;
  height: 100%;
  border-left-width: 2px;
  border-left-style: solid;
  overflow: hidden;
  font-weight: normal;
}
.calendar-event h1 {
  flex-shrink: 1;
  font-size: 14px;
  padding: 0;
  margin: 0;
  margin-top: 4px;
  font-weight: normal;
  overflow: hidden;
}
@include mq(small) {
  .calendar-event {
    padding: 0;
    padding-bottom: 8px;
  }
  .calendar-event h1 {
    height: 100%;
    padding: 0 4px;
    font-size: 10px;
    line-height: 1.2;
  }
}
@media (prefers-color-scheme: dark) {
  .calendar-event {
    filter: saturate(70%);
  }
}
</style>
