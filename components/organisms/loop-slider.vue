<template>
  <div>
    <drag-drop
      :enabled="!scrolling && enabled"
      class="drag-drop"
      @move="dragging"
      @end="drop"
    >
      <window-scroll class="window-scroll" @scroll="scroll" @end="scrollEnd">
        <slot :slide-style="style" />
      </window-scroll>
    </drag-drop>
  </div>
</template>

<script>
import WindowScroll from '@/components/atoms/window-scroll';
import DragDrop from '@/components/atoms/drag-drop';

export default {
  components: {
    WindowScroll,
    DragDrop
  },
  props: {
    enabled: {
      type: Boolean,
      default: true
    },
    sliding: {
      type: String,
      default: undefined
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
  watch: {
    sliding() {
      switch (this.sliding) {
        case 'left':
          return this.slideLeft();
        case 'right':
          return this.slideRight();
      }
    }
  },
  methods: {
    scroll() {
      this.scrolling = true;
    },
    scrollEnd() {
      this.scrolling = false;
    },
    dragging({ e, distance }) {
      const wasTooLowDrag = Math.abs(distance.x) < 10;
      if (this.slideTimer || wasTooLowDrag) return;
      this.speed = 0;
      this.offset = `-${this.$mezr.width(this.$el) - distance.x}px`;
      e.preventDefault();
    },
    drop({ e, distance }) {
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
        this.$emit('update:sliding', undefined);
      }, this.speed + wait);
    }
  }
};
</script>
