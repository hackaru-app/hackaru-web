<template>
  <transition name="slide-down-fade">
    <div v-if="shown" v-scroll-lock="shown" class="modal" @mousedown="hide">
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
      this.$emit('update:shown', false);
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  align-items: center;
  background-color: $backdrop-color;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: index($z, modal);
}

.container {
  background-color: $background;
  border-radius: 3px;
  box-shadow: 0 10px 20px $shadow-darker;
  margin: 0 10px;
  overflow: hidden;
  position: relative;
  width: 500px;
}

.slide-down-fade-enter-active,
.slide-down-fade-leave-active {
  transition: opacity 0.15s;

  .container {
    transform: translateY(0);
    transition: transform 0.15s;
  }
}

.slide-down-fade-enter,
.slide-down-fade-leave-to {
  opacity: 0%;

  .container {
    transform: translateY(-10px);
  }
}
</style>
