<template>
  <div
    v-tooltip="{ content: content, show: isOpen, trigger: 'manual' }"
    @click="hide"
  >
    <slot />
  </div>
</template>

<script>
export default {
  timers: {
    learned: {
      time: 5000,
      autostart: true
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  mounted() {
    this.isOpen = !localStorage.getItem(`tutorial-tooltip/${this.name}`);
  },
  methods: {
    learned() {
      localStorage.setItem(`tutorial-tooltip/${this.name}`, true);
    },
    hide() {
      this.isOpen = false;
      this.learned();
    }
  }
};
</script>
