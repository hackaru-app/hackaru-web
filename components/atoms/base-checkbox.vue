<template>
  <div :class="['checkbox', { enabled: enabled }]">
    <span class="dot" />
  </div>
</template>

<script>
export default {
  props: {
    enabled: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 50px;
  height: 26px;
  padding: 0 5px;
  box-sizing: border-box;
  border-radius: 99px;
  border: 1px $grey-eee solid;
  box-shadow: 0 3px $shadow inset;
}
.dot {
  display: block;
  width: 14px;
  height: 14px;
  background-color: $grey-666;
}
.checkbox.enabled {
  justify-content: flex-end;
}
.checkbox.enabled .dot {
  background-color: $cyan;
}
</style>
