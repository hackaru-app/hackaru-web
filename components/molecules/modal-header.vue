<template>
  <header class="modal-header">
    <div class="left">
      <slot name="left" />
    </div>
    <slot />
    <div class="right">
      <slot name="right" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.modal-header {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  height: 60px;
  padding: 0 30px;
  border-bottom: 1px solid $border;
  box-shadow: 0 3px 6px $shadow;
  background-color: $background;
  border-radius: 3px 3px 0 0;
}
.left,
.right {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
