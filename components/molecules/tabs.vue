<template>
  <ul class="tabs">
    <li
      v-for="(item, index) in items"
      :key="index"
      :class="{ selected: isSelected(index) }"
      @click="change(index)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    change(index) {
      this.$emit('change', index);
    },
    isSelected(index) {
      return this.index === index;
    },
  },
};
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  margin: 0;
  overflow-x: scroll;
  padding: 0;

  &::-webkit-scrollbar {
    display: none;
  }
}

.tabs li {
  align-items: center;
  border-bottom: 2px $border solid;
  box-sizing: border-box;
  color: $text-light;
  display: flex;
  flex-shrink: 0;
  list-style-position: inside;
  list-style-type: none;
  padding: 10px 15px;
  padding-top: 2px;
  transition: all 0.2s ease;
}

.tabs li.selected,
.tabs li:hover {
  border-bottom-color: $cyan;
  color: $text;
  cursor: pointer;
}

.tabs li:active {
  color: $text-lighter;
}
</style>
