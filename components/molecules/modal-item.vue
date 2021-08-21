<template>
  <div class="modal-item">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.modal-item {
  align-items: center;
  border-bottom: 1px $border solid;
  box-sizing: border-box;
  display: flex;
  min-height: 73px;
  padding: 0 30px;

  input {
    background: none;
    border: 0;
    display: flex;
    min-height: inherit;
    overflow: hidden;
    padding: 0;
    text-overflow: ellipsis;
    width: 100%;

    &::placeholder {
      color: $placeholder;
    }
  }

  label {
    color: $text;
    flex-shrink: 0;
    justify-content: center;
    min-width: 110px;
  }
}

.modal-item.is-vertical {
  align-items: stretch;
  align-self: flex-start;
  flex-direction: column;
  padding: 20px 25px;

  label {
    padding-bottom: 25px;
  }
}
</style>
