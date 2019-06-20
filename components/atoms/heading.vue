<template>
  <h1 class="heading">
    <slot />
  </h1>
</template>

<style lang="scss">
.heading {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: normal;
  .icon {
    margin-right: 10px;
  }
}
.heading.is-small {
  font-size: 18px;
}
.heading.is-large {
  font-size: 22px;
}
@media print {
  .heading {
    font-size: 26px;
  }
}
</style>
