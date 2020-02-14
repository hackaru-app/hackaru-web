<template>
  <footer class="modal-footer">
    <slot />
  </footer>
</template>

<style scoped lang="scss">
.modal-footer {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  align-items: center;
  justify-content: space-between;
}
</style>
