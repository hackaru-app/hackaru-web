<template>
  <header class="content-header">
    <slot />
  </header>
</template>

<style lang="scss">
.content-header {
  flex: 1;
  display: flex;
  align-items: center;
  height: 90px;
  padding: 0 40px;
  background-color: $background-translucent;
  border-bottom: 1px $border-dark solid;
  justify-content: space-between;
  box-shadow: 0 3px 3px $shadow;
}
.content-header.sticky {
  position: sticky;
  top: 0;
  z-index: index($z, content-header);
}
@include mq(small) {
  .content-header {
    padding: 0 30px;
  }
  .content-header.sticky {
    top: $side-bar-min-height;
  }
}
</style>
