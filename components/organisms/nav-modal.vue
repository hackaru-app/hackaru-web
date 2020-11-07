<template>
  <base-modal :shown.sync="shown">
    <transition
      :enter-active-class="animation.enter"
      :leave-active-class="animation.leave"
      class="transition"
    >
      <keep-alive>
        <component
          :is="current"
          :params="params"
          :navigated="stack.length > 0"
          data-test-id="current"
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

const noop = () => {};

export default {
  components: {
    BaseModal,
  },
  data() {
    return {
      animation: {
        enter: '',
        leave: '',
      },
      params: {},
      current: undefined,
      stack: [],
      shown: false,
      callback: undefined,
    };
  },
  mounted() {
    this.$nuxt.$on('show-modal', this.show);
  },
  methods: {
    show({ component, params, callback }) {
      this.current = component;
      this.stack = [];
      this.params = params;
      this.animation.enter = '';
      this.animation.leave = '';
      this.callback = callback || noop;
      this.shown = true;
    },
    push({ component, params = {} }) {
      this.stack.push(this.current);
      this.animation.enter = 'fadeInRight';
      this.animation.leave = 'leave fadeOutLeft';
      this.params = params;
      this.current = component;
    },
    pop(params = {}) {
      const prev = this.stack.pop();
      if (prev) {
        this.animation.enter = 'fadeInLeft';
        this.animation.leave = 'leave fadeOutRight';
        this.params = params;
        this.current = prev;
      } else {
        this.callback(params);
        this.shown = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.current {
  width: 100%;
  animation-delay: 0.15s;
  animation-duration: 0.35s;
  animation-timing-function: ease;
}
.leave {
  position: absolute;
}
</style>
