<template>
  <base-modal
    ref="modal"
    :name="name"
    :height="height"
    @before-open="beforeOpen"
  >
    <transition
      :enter-active-class="animation.enter"
      :leave-active-class="animation.leave"
    >
      <keep-alive :include="keepAlives">
        <component
          ref="current"
          :is="current"
          :params="params"
          class="current"
          @push="push"
          @pop="pop"
        />
      </keep-alive>
    </transition>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/organisms/base-modal';

export default {
  components: {
    BaseModal
  },
  props: {
    name: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: 'auto'
    },
    initialComponent: {
      type: Object,
      required: true
    },
    keepAlives: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      animation: {
        enter: '',
        leave: ''
      },
      params: {},
      current: undefined
    };
  },
  methods: {
    beforeOpen({ params = {} }) {
      this.current = this.initialComponent;
      this.params = params;
      this.animation.enter = '';
      this.animation.leave = '';
    },
    push({ component, params = {} }) {
      this.animation.enter = 'fadeInRight';
      this.animation.leave = 'fadeOutLeft';
      this.current = component;
      this.params = params;
    },
    pop({ component, params = {} }) {
      this.animation.enter = 'fadeInLeft';
      this.animation.leave = 'fadeOutRight';
      this.current = component;
      this.params = params;
    }
  }
};
</script>

<style scoped>
.current {
  animation-delay: 0.2s;
  animation-timing-function: ease;
  position: absolute;
  width: 100%;
}
</style>
