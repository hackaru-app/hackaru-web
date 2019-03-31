<template>
  <label class="modal-label">
    <slot />
  </label>
</template>

<style scoped lang="scss">
.modal-label {
  min-width: 100px;
  align-self: center;
  color: $text;
  flex-shrink: 0;
}
.modal-label.is-vertical {
  align-self: flex-start;
  padding-bottom: 25px;
}
</style>
