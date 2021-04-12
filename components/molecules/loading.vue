<template>
  <section class="loading" ontouchstart="">
    <indicator class="indicator is-primary" />
    Loading
  </section>
</template>

<script>
import Indicator from '~/components/atoms/indicator.vue';

export default {
  components: {
    Indicator,
  },
};
</script>

<style scoped lang="scss">
.indicator {
  margin-bottom: 10px;
}
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100px;
  height: 100px;
  margin-left: -50px;
  margin-top: -50px;
  top: 50%;
  left: 50%;
}
</style>
