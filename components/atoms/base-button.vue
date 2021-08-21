<template>
  <button class="base-button" v-on="$listeners">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.base-button {
  align-items: center;
  background: none;
  border: 0;
  border-radius: 3px;
  display: flex;
  height: 42px;
  justify-content: center;
  line-height: 1;
  padding: 0 15px;
}

.base-button.is-primary {
  background-color: $cyan;
  color: $white;
}

.base-button.is-dark {
  background-color: $grey-333;
  color: $white;
}

.base-button.is-circle {
  border-radius: 50%;
  height: 36px;
  padding: 0;
  width: 36px;
}

.base-button.is-danger {
  background-color: $red;
  color: $white;
}

.base-button.is-rounded {
  border-radius: 4px;
  padding-left: 18px;
  padding-right: 18px;

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
  border: 1px $border solid;
  box-shadow: 0 3px 8px $shadow;
  height: 43px;
}

@media (prefers-color-scheme: dark) {
  .base-button.is-marshmallow {
    background-color: $background-dark;
    border-color: transparent;
  }
}
</style>
