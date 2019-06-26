<template>
  <header class="modal-header">
    <slot />
  </header>
</template>

<style scoped lang="scss">
.modal-header {
  position: sticky;
  top: 0;
  border-radius: 3px 3px 0 0;
  background-color: $white;
  display: flex;
  width: 100%;
  height: 60px;
  flex-shrink: 0;
  align-items: center;
  border-bottom: 1px $border solid;
  padding: 0px 30px;
  padding-left: 25px;
  margin-bottom: 0;
  box-sizing: border-box;
  justify-content: space-between;
  h1 {
    font-size: $font-size;
    position: absolute;
    left: 0;
    pointer-events: none;
    width: 100%;
    justify-content: center;
    text-align: center;
    font-weight: normal;
    margin: 0;
    padding: 0;
  }
}
</style>
