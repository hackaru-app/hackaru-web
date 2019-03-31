<template>
  <ul>
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
      required: true
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    change(index) {
      this.$emit('change', index);
    },
    isSelected(index) {
      return this.index === index;
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  display: flex;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  margin: 0;
  padding: 0;
}
ul li {
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  border-bottom: 2px $border solid;
  list-style-type: none;
  list-style-position: inside;
  padding: 10px 15px;
  align-items: center;
  color: $text-light;
  transition: all 0.3s ease;
}
ul li.selected,
ul li:hover {
  cursor: pointer;
  border-bottom-color: $cyan;
  color: $text;
}
ul li:active {
  border-bottom-color: $border;
  color: $text-lighter;
}
</style>
