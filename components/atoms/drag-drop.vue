<template>
  <div @mousedown="start" @touchstart="start">
    <slot />
  </div>
</template>

<script>
function getScreen(e) {
  return e.touches ? e.touches[0] : e;
}

function wasTooMoved({ x, y }) {
  return Math.abs(x) > 3 || Math.abs(y) > 3;
}

export default {
  props: {
    delay: {
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
      startedX: 0,
      startedY: 0,
      currentX: 0,
      currentY: 0,
      delayTimer: undefined,
      triggered: false,
    };
  },
  computed: {
    distance() {
      return {
        x: this.currentX - this.startedX,
        y: this.currentY - this.startedY,
      };
    },
  },
  mounted() {
    document.addEventListener('mousemove', this.move, { passive: false });
    document.addEventListener('touchmove', this.move, { passive: false });
    document.addEventListener('mouseup', this.end, { passive: false });
    document.addEventListener('touchend', this.end, { passive: false });
  },
  destroyed() {
    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('touchmove', this.move);
    document.removeEventListener('mouseup', this.end);
    document.removeEventListener('touchend', this.end);
  },
  methods: {
    start(e) {
      this.delayTimer = setTimeout(() => {
        this.startedX = this.currentX = getScreen(e).pageX;
        this.startedY = this.currentY = getScreen(e).pageY;
        this.triggered = true;
        this.emitIfEnabled('start', e);
      }, this.delay);
    },
    move(e) {
      this.currentX = getScreen(e).pageX;
      this.currentY = getScreen(e).pageY;
      if (wasTooMoved(this.distance)) clearInterval(this.delayTimer);
      this.emitIfEnabled('move', e);
    },
    end(e) {
      clearInterval(this.delayTimer);
      this.emitIfEnabled('end', e);
      this.triggered = false;
    },
    emitIfEnabled(name, e) {
      if (!this.triggered || !this.enabled) return;
      this.$emit(name, { e, distance: this.distance });
    },
  },
};
</script>
