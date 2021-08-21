<template>
  <div class="base-select">
    <base-button class="is-marshmallow base-button">
      {{ value }}
    </base-button>
    <select @change="change">
      <slot />
    </select>
  </div>
</template>

<script>
import BaseButton from '~/components/atoms/base-button';

export default {
  components: {
    BaseButton,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    change(e) {
      this.$emit('change', e.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
.base-select {
  display: inline-block;
  position: relative;
}

.base-select select {
  background: $background;
  color: $text;
  cursor: pointer;
  height: 42px;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
