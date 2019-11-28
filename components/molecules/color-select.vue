<template>
  <section class="color-select">
    <button
      v-for="color in colors"
      :key="color"
      :class="[{ selected: value === color }]"
      type="button"
      @click="changeColor(color)"
    >
      <dot :color="color" class="is-large" />
    </button>
  </section>
</template>

<script>
import Dot from '@/components/atoms/dot';

export default {
  components: {
    Dot
  },
  props: {
    value: {
      type: String,
      default: '#cccfd9'
    },
    colors: {
      type: Array,
      default: () => [
        '#4ab8b8',
        '#7da87b',
        '#a1c45a',
        '#7a4579',
        '#f95959',
        '#ea8a8a',
        '#ff9f68',
        '#facf5a',
        '#616161',
        '#8ea6b4'
      ]
    }
  },
  methods: {
    changeColor(color) {
      this.$emit('update:value', color);
    }
  }
};
</script>

<style scoped lang="scss">
.color-select {
  display: flex;
  flex-flow: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 20px;
  margin: 5px 0;
}
.color-select button {
  display: flex;
  margin-right: 5px;
  background: 0;
  padding: 0;
  border: 1px $white solid;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  &:hover,
  &.selected {
    box-shadow: 0 2px 3px $shadow-darker;
  }
}
</style>
