<template>
  <button class="base-button" v-on="$listeners">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.base-button {
  cursor: pointer;
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
  border-radius: 99px;
  padding-right: 20px;
  padding-left: 20px;
}
.base-button.is-marshmallow {
  height: 43px;
  border: 1px $grey-eee solid;
  box-shadow: 0 3px 8px $shadow;
}
.base-button.has-icon {
  line-height: normal;
  height: auto;
  padding: 20px;
  margin: -20px;
  background: none;
  border: 0;
}
</style>
