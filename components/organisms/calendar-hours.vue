<template>
  <section class="calendar-hours">
    <time v-for="hour in 24" :style="{ height: `${toPx(60)}px` }" :key="hour">
      {{ `${`0${hour - 1}`.slice(-2)}` }}
      <span class="min">:00</span>
    </time>
  </section>
</template>

<script>
import PxMinConvertable from '@/plugins/mixins/px-min-convertable';

export default {
  mixins: [PxMinConvertable]
};
</script>

<style scoped lang="scss">
.calendar-hours {
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.calendar-hours time {
  position: relative;
  display: flex;
  box-sizing: border-box;
  color: $text-light;
  font-size: 12px;
  line-height: 20px;
  &::before {
    position: absolute;
    left: 0;
    width: 100vw;
    content: '';
    border-top: 1px $border dashed;
  }
  &:first-child::before {
    display: none;
  }
}
@include mq(small) {
  .calendar-hours {
    width: 25px;
  }
  .calendar-hours time .min {
    display: none;
  }
}
</style>
