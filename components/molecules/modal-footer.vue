<template>
  <footer class="modal-footer">
    <slot />
  </footer>
</template>

<style scoped lang="scss">
.modal-footer {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 30px;
  width: 100%;
}
</style>
