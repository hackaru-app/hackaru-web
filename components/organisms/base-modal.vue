<template>
  <transition name="slide-down-fade">
    <div v-if="shown" class="modal" @mousedown="hide">
      <div class="container" @mousedown.stop>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    shown: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    hide() {
      this.$emit('hide');
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  width: 100vw;
  height: 100vh;
  background-color: $backdrop-color;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  z-index: index($z, modal);
}
.container {
  width: 500px;
  position: relative;
  margin: 0 10px;
  overflow: hidden;
  border-radius: 3px;
  background-color: $background;
  box-shadow: 0 10px 20px $shadow-darker;
}
.slide-down-fade-enter-active,
.slide-down-fade-leave-active {
  transition: opacity 0.15s;
  .container {
    transition: transform 0.15s;
    transform: translateY(0);
  }
}
.slide-down-fade-enter,
.slide-down-fade-leave-to {
  opacity: 0;
  .container {
    transform: translateY(-10px);
  }
}
</style>
