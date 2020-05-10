<template>
  <div><slot /></div>
</template>

<script>
export default {
  data() {
    return {
      endTimer: undefined,
      started: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.scroll, { passive: true });
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll);
  },
  methods: {
    scroll(e) {
      if (!this.started) this.start();
      this.$emit('scroll', e);
      clearInterval(this.endTimer);
      this.endTimer = setTimeout(() => this.end(), 100);
    },
    start() {
      this.$emit('start');
      this.started = true;
    },
    end() {
      this.$emit('end');
      this.started = false;
    }
  }
};
</script>
