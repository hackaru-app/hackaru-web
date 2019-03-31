<template>
  <section v-dragdrop="dragdrop" v-window-scroll="windowScroll" ref="slider">
    <slot :slide-style="style" />
  </section>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dragdrop: {
        drag: this.drag,
        dragging: this.dragging,
        drop: this.drop
      },
      cancelled: undefined,
      offset: '-100%',
      speed: 0,
      slideTimer: undefined
    };
  },
  computed: {
    style() {
      return {
        transform: `translateX(${this.offset})`,
        transition: this.speed ? `transform ${this.speed}ms` : 'none'
      };
    }
  },
  methods: {
    windowScroll() {
      this.cancelled = true;
    },
    drag() {
      this.cancelled = false;
    },
    dragging({ e, distance }) {
      if (
        this.disabled ||
        this.slideTimer ||
        this.cancelled ||
        Math.abs(distance.x) < 20
      )
        return;
      this.speed = 0;
      this.offset = `-${this.$mezr.width(this.$refs.slider) + distance.x}px`;
      e.preventDefault();
    },
    drop({ e, distance }) {
      if (this.cancelled || Math.abs(distance.x) < 100)
        return this.slideReset();
      return distance.x > 0 ? this.slideRight() : this.slideLeft();
    },
    slideReset() {
      this.slideTo('-100%', 'reset');
    },
    slideLeft() {
      this.slideTo('0%', 'slide-left');
    },
    slideRight() {
      this.slideTo('-200%', 'slide-right');
    },
    slideTo(offset, eventName) {
      if (this.slideTimer) return;
      const delay = 100;
      this.speed = 300;
      this.offset = offset;
      this.slideTimer = setTimeout(() => {
        this.speed = 0;
        this.offset = '-100%';
        this.$emit(eventName);
        this.slideTimer = undefined;
      }, this.speed + delay);
    }
  }
};
</script>
