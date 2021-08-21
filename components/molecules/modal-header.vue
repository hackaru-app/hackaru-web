<template>
  <header class="modal-header">
    <div class="left">
      <slot name="left" />
    </div>
    <h1><slot /></h1>
    <div class="right">
      <slot name="right" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.modal-header {
  align-items: center;
  background-color: $background;
  border-bottom: 1px solid $border;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 3px 6px $shadow;
  box-sizing: border-box;
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0 30px;
  width: 100%;
}
h1 {
  font-size: $font-size;
  font-weight: normal;
  margin: 0;
}
.left,
.right {
  align-items: center;
  display: flex;
  height: 100%;
}
</style>
