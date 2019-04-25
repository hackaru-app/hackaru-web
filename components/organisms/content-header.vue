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
@media print {
  .content-header {
    padding: 0;
    border-top: 2px $border solid;
    margin-top: 30px;
    border-bottom: 0;
    h1 {
      margin: 0 !important;
    }
  }
}
</style>
