<template>
  <section class="loading" ontouchstart="">
    <div class="loader" />
    Loading
    <nuxt />
    <toast />
  </section>
</template>

<script>
import Toast from '@/components/molecules/toast';
import Icon from '@/components/atoms/icon';

export default {
  components: {
    Toast,
    Icon
  },
  head: {
    title: 'Loading'
  }
};
</script>

<style scoped lang="scss">
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
.loader,
.loader:after {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
}
.loader {
  position: relative;
  text-indent: -9999em;
  border: 3px solid #00000010;
  border-left: 3px solid $cyan;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
