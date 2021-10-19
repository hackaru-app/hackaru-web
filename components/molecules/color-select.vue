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
import Dot from '~/components/atoms/dot';

export default {
  components: {
    Dot,
  },
  props: {
    value: {
      type: String,
      default: '#cccfd9',
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
        '#8ea6b4',
      ],
    },
  },
  methods: {
    changeColor(color) {
      this.$emit('update:value', color);
    },
  },
};
</script>

<style scoped lang="scss">
.color-select {
  align-items: center;
  display: flex;
  flex-flow: wrap;
  flex-direction: row;
  justify-content: flex-start;
  margin: 5px 0;
}

.color-select button {
  align-items: center;
  background: 0;
  border: 1px $background solid;
  border-radius: 50%;
  display: flex;
  height: 26px;
  justify-content: center;
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 0;
  width: 26px;

  &:hover,
  &.selected {
    border: 1px $white solid;
    box-shadow: 0 2px 3px $shadow-darker;
  }
}
</style>
