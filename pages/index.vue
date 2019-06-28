<template>
  <section class="index">
    <big-timer class="big-timer" />
  </section>
</template>

<script>
import BigTimer from '@/components/organisms/big-timer';

export default {
  components: {
    BigTimer
  },
  head: {
    title: 'Timer'
  },
  mounted() {
    this.$store.dispatch('activities/fetchWorkings');
  }
};
</script>

<style scoped lang="scss">
.index {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.big-timer {
  position: absolute;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  height: 100vh;
  width: 100%;
  margin-top: -60px;
}
@include mq(small) {
  .big-timer {
    height: calc(100vh - #{$side-bar-min-height});
    margin-top: 0;
  }
}
</style>
