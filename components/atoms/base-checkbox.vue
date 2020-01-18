<template>
  <div :class="['checkbox', { enabled: enabled }]">
    <icon class="icon" name="check-icon" />
  </div>
</template>

<script>
import Icon from '@/components/atoms/icon';

export default {
  components: {
    Icon
  },
  props: {
    enabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 21px;
  height: 21px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px $grey-eee solid;
  box-shadow: 0 3px 0 $shadow inset;
}
.checkbox.enabled {
  background-color: $cyan;
  border-color: $white;
}
.checkbox .icon {
  width: 16px;
  height: 16px;
  margin-top: 1px;
  color: $white;
}
</style>
