<template>
  <section class="calendar-hours">
    <time v-for="hour in 24" :style="{ height: `${$toPx(60)}px` }" :key="hour">
      {{ `${`0${hour - 1}`.slice(-2)}` }}
      <span class="min">:00</span>
    </time>
  </section>
</template>

<style scoped lang="scss">
.calendar-hours {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 60px;
}
.calendar-hours time {
  box-sizing: border-box;
  color: $text-light;
  display: flex;
  font-size: 13px;
  line-height: 20px;
  position: relative;
  &::before {
    border-top: 1px $border dashed;
    content: '';
    left: 0;
    position: absolute;
    width: 100vw;
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
