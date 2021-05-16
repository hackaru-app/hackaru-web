<template>
  <button class="base-button" v-on="$listeners">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.base-button {
  padding: 0 15px;
  height: 42px;
  justify-content: center;
  align-items: center;
  display: flex;
  line-height: 1;
  border-radius: 3px;
  background: none;
  border: 0;
}
.base-button.is-primary {
  background-color: $cyan;
  color: $white;
}
.base-button.is-danger {
  background-color: $red;
  color: $white;
}
.base-button.is-dark {
  background-color: $grey-333;
  color: $white;
}
.base-button.is-circle {
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 50%;
}
.base-button.is-danger {
  background-color: $red;
  color: $white;
}
.base-button.is-rounded {
  border-radius: 4px;
  padding-right: 18px;
  padding-left: 18px;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 1;
  }
  &:disabled {
    opacity: 0.5;
  }
}
.base-button.is-marshmallow {
  height: 43px;
  border: 1px $border solid;
  box-shadow: 0 3px 8px $shadow;
}
@media (prefers-color-scheme: dark) {
  .base-button.is-marshmallow {
    background-color: $background-dark;
    border-color: transparent;
  }
}
</style>
