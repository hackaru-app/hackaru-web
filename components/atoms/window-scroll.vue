<template>
  <div><slot /></div>
</template>

<script>
export default {
  data() {
    return {
      endTimer: undefined
    };
  },
  mounted() {
    window.addEventListener('scroll', this.scroll, { passive: true });
  },
  destoryed() {
    window.removeEventListener('scroll', this.scroll);
  },
  methods: {
    scroll(e) {
      this.$emit('scroll', e);
      clearInterval(this.endTimer);
      this.endTimer = setTimeout(() => {
        this.$emit('end');
      }, 100);
    }
  }
};
</script>
