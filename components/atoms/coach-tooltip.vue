<template>
  <div
    v-tooltip="{
      trigger: 'manual',
      content: content,
      show: opened,
      offset: offset,
      placement: placement
    }"
    @click="hide"
  >
    <slot />
  </div>
</template>

<script>
export default {
  timers: {
    hide: {
      time: 5000,
      autostart: true
    }
  },
  props: {
    placement: {
      type: String,
      default: undefined
    },
    offset: {
      type: Number,
      default: undefined
    },
    name: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      opened: false
    };
  },
  mounted() {
    this.opened = !localStorage.getItem(`coach-tooltip/${this.name}`);
  },
  methods: {
    hide() {
      this.opened = false;
      localStorage.setItem(`coach-tooltip/${this.name}`, true);
    }
  }
};
</script>
