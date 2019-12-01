<template>
  <div><slot :is-dark="isDark" /></div>
</template>

<script>
function getMedia() {
  return window.matchMedia('(prefers-color-scheme: dark)');
}

export default {
  data() {
    return {
      isDark: false
    };
  },
  mounted() {
    this.update();
    getMedia().addListener(this.update);
  },
  destoryed() {
    getMedia().removeListener(this.update);
  },
  methods: {
    update() {
      this.isDark = getMedia().matches;
    }
  }
};
</script>
