<template>
  <div class="auth" ontouchstart="">
    <side-bar :show-menu="false" />
    <div class="content">
      <nuxt />
    </div>
    <toast />
  </div>
</template>

<script>
import Toast from '@/components/molecules/toast';
import SideBar from '@/components/organisms/side-bar';

export default {
  components: {
    Toast,
    SideBar
  }
};
</script>

<style scoped lang="scss">
.auth {
  display: flex;
  flex-direction: column;
  background: $background;
  width: 100%;
  min-height: 100vh;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: $side-bar-min-width;
}
@include mq(small) {
  .content {
    margin-left: 0;
    margin-top: $side-bar-min-height;
  }
}
</style>
