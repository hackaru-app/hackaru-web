<template>
  <div class="tabs">
    <ul>
      <li v-for="(item, index) in items" :key="index" @click="change(index)">
        <span :class="{ selected: isSelected(index) }">{{ item }}</span>
      </li>
    </ul>
  </div>
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
.tabs {
  display: flex;
  position: relative;
  width: 100%;
  &:after {
    position: absolute;
    right: 0;
    display: block;
    content: '';
    width: 100px;
    height: 100%;
    background: linear-gradient(to right, transparent, $white);
    pointer-events: none;
  }
}
.tabs ul {
  display: flex;
  margin: 0;
  padding: 0;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  padding-right: 100px;
}
.tabs li {
  box-sizing: border-box;
  flex-shrink: 0;
  list-style-type: none;
  list-style-position: inside;
  &:last-child {
    padding-right: 70px;
  }
}
.tabs li span {
  display: flex;
  border-bottom: 2px $border solid;
  padding: 10px 15px;
  padding-top: 2px;
  align-items: center;
  color: $text-light;
  transition: all 0.2s ease;
  &.selected,
  &:hover {
    cursor: pointer;
    border-bottom-color: $cyan;
    color: $text;
  }
}
</style>
