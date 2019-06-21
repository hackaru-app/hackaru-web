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
  box-shadow: 0 3px 5px #00000008;
}
.sticky {
  position: sticky;
  top: 0;
  background-color: #ffffffee;
  z-index: index($z, content-header);
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
    box-shadow: none;
    margin-top: 30px;
    border-bottom: 0;
    h1 {
      margin: 0 !important;
    }
  }
}
</style>
