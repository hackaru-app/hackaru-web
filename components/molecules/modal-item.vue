<template>
  <div class="modal-item">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.modal-item {
  padding: 15px 30px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  border-bottom: 1px $border solid;
  min-height: 73px;
  input {
    width: 100%;
    min-height: 40px;
    display: flex;
    border: 0;
    background: none;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0;
  }
  label {
    min-width: 110px;
    justify-content: center;
    color: $text;
    flex-shrink: 0;
  }
}
.modal-item.is-vertical {
  flex-direction: column;
  align-self: flex-start;
  align-items: stretch;
  padding: 25px 30px;
  label {
    padding-bottom: 25px;
  }
}
</style>
