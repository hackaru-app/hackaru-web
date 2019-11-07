<template>
  <div class="base-select">
    <base-button class="is-marshmallow base-button">
      {{ value }}
    </base-button>
    <select ref="select" @change="change">
      <slot />
    </select>
  </div>
</template>

<script>
import BaseButton from '@/components/atoms/base-button';

export default {
  components: {
    BaseButton
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    change(e) {
      this.$emit('change', e.target.value);
    }
  }
};
</script>

<style scoped lang="scss">
.base-select {
  position: relative;
  display: flex;
}
.base-select select {
  position: absolute;
  top: 0;
  height: 36px;
  opacity: 0;
  cursor: pointer;
}
</style>
