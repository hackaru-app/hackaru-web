<template>
  <base-modal
    ref="base-modal"
    :name="name"
    :height="height"
    @before-open="beforeOpen"
  >
    <transition
      :enter-active-class="animation.enter"
      :leave-active-class="animation.leave"
      class="transition"
    >
      <keep-alive :include="keepAlives">
        <component
          ref="current"
          :is="current"
          :params="params"
          :pop-enabled="stack.length > 0"
          class="current"
          @push="push"
          @pop="popOrClose"
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
      default: () => []
    }
  },
  data() {
    return {
      animation: {
        enter: '',
        leave: ''
      },
      params: {},
      current: undefined,
      stack: []
    };
  },
  methods: {
    beforeOpen({ params = {} }) {
      this.current = this.initialComponent;
      this.stack = [];
      this.params = params;
      this.animation.enter = '';
      this.animation.leave = '';
    },
    push({ component, params = {} }) {
      this.stack.push(this.current);
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
    },
    popOrClose(params = {}) {
      const prev = this.stack.pop();
      if (prev) {
        this.pop({
          component: prev,
          params
        });
      } else {
        this.$emit('close', params);
        this.$modal.hide(this.name);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.current {
  animation-delay: 0.15s;
  animation-duration: 0.35s;
  animation-timing-function: ease;
  position: absolute;
  width: 100%;
}
</style>
