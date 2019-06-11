<template>
  <button class="base-button" v-on="$listeners">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.base-button {
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0 15px;
  height: 41px;
  justify-content: center;
  align-items: center;
  display: flex;
  line-height: 1.5em;
  border-radius: 3px;
  background: none;
  border: 0;
  &:active {
    transform: scale(0.9);
  }
}
.base-button.is-primary {
  background-color: $cyan;
  color: #fff;
}
.base-button.is-circle {
  width: 34px;
  height: 34px;
  padding: 0;
  border-radius: 50%;
}
.base-button.is-danger {
  background-color: $red;
  color: #fff;
}
.base-button.is-rounded {
  border-radius: 99px;
  padding-right: 20px;
  padding-left: 20px;
  box-shadow: 0 2px 3px #00000015;
}
.base-button.is-marshmallow {
  height: 43px;
  border: 1px $grey-eee solid;
  box-shadow: 0 2px 3px #00000006;
}
.base-button.has-dropshadow {
  box-shadow: 0 2px 3px #00000015;
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
