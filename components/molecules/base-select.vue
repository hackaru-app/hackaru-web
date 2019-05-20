<template>
  <div class="base-select">
    <btn class="has-dropshadow">
      {{ value }}
    </btn>
    <select ref="select" @change="change">
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
select {
  position: absolute;
  top: 0;
  height: 36px;
  opacity: 0;
  cursor: pointer;
}
@media print {
  .base-select button {
    background-color: $grey-f5f5f5;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
    box-shadow: none;
  }
}
</style>
