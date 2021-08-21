<template>
  <section class="none" ontouchstart="">
    <nuxt />
    <toast />
  </section>
</template>

<script>
import Toast from '~/components/molecules/toast';

export default {
  components: {
    Toast,
  },
};
</script>

<style scoped lang="scss">
.none {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}
</style>
