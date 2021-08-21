<template>
  <header class="content-header">
    <slot />
  </header>
</template>

<style lang="scss">
.content-header {
  align-items: center;
  background-color: $background-translucent;
  border-bottom: 1px $border-dark solid;
  box-shadow: 0 3px 3px $shadow;
  display: flex;
  flex: 1;
  height: 90px;
  justify-content: space-between;
  padding: 0 40px;
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
