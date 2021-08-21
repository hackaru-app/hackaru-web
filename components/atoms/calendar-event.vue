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
  border-left-style: solid;
  border-left-width: 2px;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: row;
  font-weight: normal;
  height: 100%;
  justify-content: flex-start;
  overflow: hidden;
  padding: 7px;
  padding-bottom: 8px;
  padding-top: 0;
  position: relative;
}

.calendar-event h1 {
  flex-shrink: 1;
  font-size: 14px;
  font-weight: normal;
  margin: 0;
  margin-top: 4px;
  overflow: hidden;
  padding: 0;
}

@include mq(small) {
  .calendar-event {
    padding: 0;
    padding-bottom: 8px;
  }

  .calendar-event h1 {
    font-size: 10px;
    height: 100%;
    line-height: 1.2;
    padding: 0 4px;
  }
}

@media (prefers-color-scheme: dark) {
  .calendar-event {
    filter: saturate(70%);
  }
}
</style>
