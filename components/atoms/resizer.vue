<template>
  <drag-drop
    :delay="delay"
    :enabled="!disabled"
    @start="drag"
    @move="dragging"
    @end="drop"
  >
    <slot />
  </drag-drop>
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
    disabled: {
      type: Boolean,
      default: false
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
      console.log('RESIZE');
    },
    dragging({ e, distance }) {
      const height = this.startedHeight - distance.y;
      this.$emit('update:height', Math.max(height, this.minHeight));
      this.$emit('resizing', e);
      e.preventDefault();
      console.log('RESIZING');
    },
    drop({ e, distance }) {
      const resized = distance.y !== 0;
      this.$emit(resized ? 'end' : 'cancel', e);
      console.log('RESIZE END');
    }
  }
};
</script>

<style scoped lang="scss">
// .handler {
//   position: absolute;
//   display: flex;
//   justify-content: flex-end;
//   box-sizing: border-box;
//   padding: 5px;
//   padding-top: 15px;
//   right: 0;
//   bottom: 0;
//   width: 100%;
//   cursor: s-resize;
// }
// @include mq(small) {
//   .handler {
//     left: auto;
//     right: 0;
//     width: 100%;
//   }
// }
</style>
