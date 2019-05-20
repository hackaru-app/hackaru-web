<template>
  <div>
    <drag-drop
      :delay="delay"
      :enabled="enabled"
      class="drag-drop"
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
    DragDrop
  },
  props: {
    delay: {
      type: Number,
      default: 50
    },
    height: {
      type: Number,
      default: 0
    },
    minHeight: {
      type: Number,
      default: 0
    },
    enabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      startedHeight: this.height
    };
  },
  methods: {
    drag({ e }) {
      this.startedHeight = this.height;
      this.$emit('start', e);
    },
    dragging({ e, distance }) {
      const height = this.startedHeight + distance.y;
      this.$emit('update:height', Math.max(height, this.minHeight));
      this.$emit('resizing', e);
      e.preventDefault();
    },
    drop({ e, distance }) {
      const resized = distance.y !== 0;
      this.$emit(resized ? 'end' : 'cancel', e);
    }
  }
};
</script>
