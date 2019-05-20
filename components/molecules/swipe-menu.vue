<template>
  <div class="swipe-menu">
    <div :style="leftStyle" class="menu">
      <slot name="left" />
    </div>
    <drag-drop
      :enabled="!scrolling"
      class="content"
      @move="dragging"
      @end="drop"
    >
      <window-scroll @scroll="scroll" @end="scrollEnd">
        <slot />
      </window-scroll>
    </drag-drop>
    <div :style="rightStyle" class="menu">
      <slot name="right" />
    </div>
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
    speed: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      scrolling: false,
      rightStyle: {
        transition: '',
        width: 0
      },
      leftStyle: {
        transition: '',
        width: 0
      }
    };
  },
  methods: {
    scroll() {
      this.scrolling = true;
    },
    scrollEnd() {
      this.scrolling = false;
    },
    dragging({ e, distance }) {
      const wasTooLowDrag = Math.abs(distance.x) < 40;
      if (wasTooLowDrag) return;
      if (distance.x < 0) {
        this.rightStyle = {
          transition: '',
          width: `${-distance.x}px`
        };
        this.leftStyle = {
          transition: '',
          width: 0
        };
      }
      if (distance.x > 0) {
        this.leftStyle = {
          transition: '',
          width: `${distance.x}px`
        };
        this.rightStyle = {
          transition: '',
          width: 0
        };
      }
      e.preventDefault();
    },
    drop({ e, distance }) {
      const wasTooLowDrag = Math.abs(distance.x) < 120;
      if (wasTooLowDrag) return this.reset();
      return distance.x < 0 ? this.swipeRight() : this.swipeLeft();
    },
    swipeRight() {
      setTimeout(() => this.$emit('swipe-right'), this.speed);
      this.rightStyle = {
        transition: `width ${this.speed}ms`,
        width: '100%'
      };
    },
    swipeLeft() {
      setTimeout(() => this.$emit('swipe-left'), this.speed);
      this.leftStyle = {
        transition: `width ${this.speed}ms`,
        width: '100%'
      };
    },
    reset() {
      this.rightStyle = {
        transition: `width ${this.speed}ms`,
        width: 0
      };
      this.leftStyle = {
        transition: `width ${this.speed}ms`,
        width: 0
      };
    }
  }
};
</script>

<style scoped lang="scss">
.swipe-menu {
  display: flex;
  position: relative;
  overflow: hidden;
}
.content {
  flex: 1;
  padding: 0;
  margin: 0;
  width: 100%;
  min-width: 0;
}
.swipe-menu-item {
  position: relative;
  justify-content: center;
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.swipe-menu-item.is-primary {
  background-color: $cyan;
  color: #fff;
}
.swipe-menu-item.is-danger {
  background-color: $red;
  color: #fff;
}
</style>
