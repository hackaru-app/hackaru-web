<template>
  <div
    v-dragdrop="dragdrop"
    :style="{
      top: `${top}px`,
      left: `${left}px`
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dragdrop: {
        drag: this.drag,
        dragging: this.dragging,
        drop: this.drop,
        wait: 500
      },
      started: {
        top: this.top,
        left: this.left
      }
    };
  },
  methods: {
    drag({ e }) {
      this.started.top = this.top;
      this.started.left = this.left;
      this.$emit('start', e);
    },
    dragging({ e, distance }) {
      this.$emit('update:top', this.started.top - distance.y);
      this.$emit('update:left', this.started.left - distance.x);
      this.$emit('moving', e);
      e.preventDefault(); // disable page-scroll for mobile
    },
    drop({ e }) {
      const moved =
        this.started.top !== this.top || this.started.left !== this.left;
      this.$emit(moved ? 'end' : 'cancel', e);
    }
  }
};
</script>
