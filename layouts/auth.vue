<template>
  <div class="auth" ontouchstart="">
    <side-bar :show-menu="false" />
    <div class="content">
      <nuxt />
      <toast />
    </div>
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
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
