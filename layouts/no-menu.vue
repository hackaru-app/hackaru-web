<template>
  <div class="wrapper" ontouchstart="">
    <side-bar :show-menu="false" />
    <div class="content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/organisms/side-bar';

export default {
  components: {
    SideBar
  }
};
</script>

<style scoped lang="scss">
.wrapper {
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
