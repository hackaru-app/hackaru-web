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
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: center;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
  position: absolute;
  top: 50%;
  width: 100px;
}
</style>
