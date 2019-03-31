<template>
  <div :style="{ height: `${height}px` }">
    <slot />
    <span v-dragdrop="dragdrop" class="handler">
      <span />
    </span>
  </div>
</template>

<script>
export default {
  props: {
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
    },
    handleColor: {
      type: String,
      default: 'transparent'
    }
  },
  data() {
    return {
      dragdrop: {
        drag: this.drag,
        dragging: this.dragging,
        drop: this.drop,
        wait: 100
      },
      started: {
        height: this.height
      }
    };
  },
  methods: {
    drag({ e }) {
      if (this.disabled) return;
      this.started.height = this.height;
      this.$emit('start', e);
    },
    dragging({ e, distance }) {
      if (this.disabled) return;
      const height = Math.max(this.started.height - distance.y, this.minHeight);
      this.$emit('update:height', height);
      this.$emit('resizing', e);
      e.preventDefault(); // disable page-scroll for mobile
    },
    drop({ e }) {
      if (this.disabled) return;
      const resized = this.started.height !== this.height;
      this.$emit(resized ? 'end' : 'cancel', e);
    }
  }
};
</script>

<style scoped lang="scss">
.handler {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 5px;
  padding-top: 10px;
  right: 0;
  bottom: 0;
  width: 100%;
  cursor: s-resize;
}
@include mq(small) {
  h1 {
    font-size: 9px;
    padding: 0 5px;
  }
  .handler {
    left: auto;
    right: 0;
    width: 100%;
  }
}
</style>
