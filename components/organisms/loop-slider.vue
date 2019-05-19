<template>
  <drag-drop
    v-window-scroll="scrollWindow"
    :enabled="!scrolling && enabled"
    @move="dragging"
    @end="drop"
  >
    <slot :slide-style="style" />
  </drag-drop>
</template>

<script>
import DragDrop from '@/components/atoms/drag-drop';

export default {
  components: {
    DragDrop
  },
  props: {
    enabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scrolling: false,
      offset: '-100%',
      speed: 0,
      slideTimer: undefined,
      scrollEndTimer: undefined
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
    scrollWindow() {
      this.scrolling = true;
      clearInterval(this.scrollEndTimer);
      this.scrollEndTimer = setTimeout(() => {
        this.scrolling = false;
      }, 100);
    },
    dragging({ e, distance }) {
      const wasTooLowDrag = Math.abs(distance.x) < 10;
      if (this.slideTimer || wasTooLowDrag) return;
      this.speed = 0;
      this.offset = `-${this.$mezr.width(this.$el) + distance.x}px`;
      e.preventDefault();
    },
    drop({ e, distance }) {
      const wasTooLowDrag = Math.abs(distance.x) < 100;
      if (wasTooLowDrag) return this.slideReset();
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
      const wait = 100;
      this.speed = 300;
      this.offset = offset;
      this.slideTimer = setTimeout(() => {
        this.speed = 0;
        this.offset = '-100%';
        this.$emit(eventName);
        this.slideTimer = undefined;
      }, this.speed + wait);
    }
  }
};
</script>
