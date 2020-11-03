<template>
  <div :style="{ top: `${top}px`, left: `${left}px` }">
    <drag-drop
      :delay="400"
      :enabled="enabled"
      data-test-id="drag-drop"
      @start="drag"
      @move="dragging"
      @end="drop"
    >
      <slot />
    </drag-drop>
  </div>
</template>

<script>
import DragDrop from '@/components/atoms/drag-drop';

export default {
  components: {
    DragDrop,
  },
  props: {
    top: {
      type: Number,
      default: 0,
    },
    left: {
      type: Number,
      default: 0,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      started: {
        top: this.top,
        left: this.left,
      },
    };
  },
  methods: {
    drag({ e }) {
      this.started.top = this.top;
      this.started.left = this.left;
      this.$emit('start', e);
    },
    dragging({ e, distance }) {
      this.$emit('update:top', this.started.top + distance.y);
      this.$emit('update:left', this.started.left + distance.x);
      this.$emit('moving', e);
      e.preventDefault();
    },
    drop({ e, distance }) {
      const moved = distance.x !== 0 || distance.y !== 0;
      this.$emit(moved ? 'end' : 'cancel', e);
    },
  },
};
</script>

<style scoped lang="scss">
.drag-drop {
  width: 100%;
}
</style>
