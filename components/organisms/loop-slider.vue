<template>
  <drag-drop
    ref="drag-drop"
    :enabled="!scrolling && enabled"
    @move="dragging"
    @end="drop"
  >
    <window-scroll
      data-test-id="window-scroll"
      @scroll="scroll"
      @start="startScroll"
      @end="endScroll"
    >
      <slot :slideStyle="slideStyle" />
    </window-scroll>
  </drag-drop>
</template>

<script>
import WindowScroll from '@/components/atoms/window-scroll';
import DragDrop from '@/components/atoms/drag-drop';

export default {
  components: {
    WindowScroll,
    DragDrop,
  },
  props: {
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      scrolling: false,
      offset: '-100%',
      speed: 0,
      slideTimer: undefined,
      scrollEndTimer: undefined,
    };
  },
  computed: {
    slideStyle() {
      return {
        transform: `translateX(${this.offset})`,
        transition: this.speed ? `transform ${this.speed}ms` : 'none',
      };
    },
  },
  methods: {
    startScroll() {
      this.slideReset();
    },
    scroll() {
      this.scrolling = true;
    },
    endScroll() {
      this.scrolling = false;
    },
    dragging({ e, distance }) {
      const wasTooLowDrag = Math.abs(distance.x) < 20;
      if (this.slideTimer || wasTooLowDrag) return;
      this.speed = 0;
      this.offset = `-${this.$mezr.width(this.$el) - distance.x}px`;
      e.preventDefault();
    },
    drop({ distance }) {
      const wasTooLowDrag = Math.abs(distance.x) < 100;
      if (wasTooLowDrag) return this.slideReset();
      return distance.x < 0 ? this.slideRight() : this.slideLeft();
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
        this.slideTimer = undefined;
        this.$emit(eventName);
      }, this.speed + wait);
    },
  },
};
</script>
