<template>
  <div v-dragdrop="dragdrop" v-window-scroll="windowScroll" class="swipe-menu">
    <div :style="leftStyle" class="menu">
      <slot name="left" />
    </div>
    <div class="content">
      <slot />
    </div>
    <div :style="rightStyle" class="menu">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    minDistance: {
      type: Number,
      default: 120
    },
    speed: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      cancelled: undefined,
      dragdrop: {
        drag: this.drag,
        dragging: this.dragging,
        drop: this.drop
      },
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
    windowScroll() {
      this.cancelled = true;
    },
    drag() {
      this.cancelled = false;
      this.reset();
    },
    dragging({ e, distance }) {
      if (Math.abs(distance.x) < 40) {
        return;
      }
      if (distance.x > 0) {
        this.rightStyle = {
          transition: '',
          width: `${distance.x}px`
        };
        this.leftStyle = {
          transition: '',
          width: 0
        };
      }
      if (distance.x < 0) {
        this.leftStyle = {
          transition: '',
          width: `${-distance.x}px`
        };
        this.rightStyle = {
          transition: '',
          width: 0
        };
      }
      e.preventDefault();
    },
    drop({ e, distance }) {
      if (Math.abs(distance.x) < this.minDistance || this.cancelled) {
        return this.resetWithAnimation();
      }
      return distance.x > 0 ? this.swipeRight() : this.swipeLeft();
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
        transition: '',
        width: 0
      };
      this.leftStyle = {
        transition: '',
        width: 0
      };
    },
    resetWithAnimation() {
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
