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
  background-color: $white;
  border-bottom: 1px $border solid;
  justify-content: space-between;
}
@include mq(small) {
  .content-header {
    padding: 0 30px;
  }
}
</style>
