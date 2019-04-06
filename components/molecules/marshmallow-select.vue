<template>
  <div class="marshmallow-select">
    <btn class="has-dropshadow">
      {{ value }}
    </btn>
    <select ref="select" :aria-label="ariaLabel" @change="change">
      <slot />
    </select>
  </div>
</template>

<script>
import Btn from '@/components/atoms/btn';

export default {
  components: {
    Btn
  },
  props: {
    value: {
      type: String,
      required: true
    },
    ariaLabel: {
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
.marshmallow-select {
  position: relative;
  display: flex;
}
select {
  position: absolute;
  top: 0;
  height: 36px;
  opacity: 0;
  cursor: pointer;
}
</style>
