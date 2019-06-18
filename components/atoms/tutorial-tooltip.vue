<template>
  <div
    v-tooltip="{
      trigger: 'manual',
      content: content,
      show: isOpen,
      offset: offset
    }"
    @click="hide"
  >
    <slot />
  </div>
</template>

<script>
export default {
  timers: {
    learn: {
      time: 5000,
      autostart: true
    }
  },
  props: {
    offset: {
      type: Number,
      required: true
    },
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
    hide() {
      this.isOpen = false;
      this.learn();
    },
    learn() {
      localStorage.setItem(`tutorial-tooltip/${this.name}`, true);
    }
  }
};
</script>
