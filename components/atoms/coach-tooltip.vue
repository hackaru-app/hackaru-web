<template>
  <div v-tooltip="params" @click="hide">
    <slot />
  </div>
</template>

<script>
export default {
  timers: {
    hide: {
      time: 9000,
      autostart: true,
    },
  },
  props: {
    placement: {
      type: String,
      default: undefined,
    },
    offset: {
      type: Number,
      default: undefined,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: undefined,
    },
    delay: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    params() {
      return {
        trigger: 'manual',
        content: this.content,
        show: this.show,
        offset: this.offset,
        placement: this.placement,
        delayTimer: undefined,
      };
    },
  },
  mounted() {
    this.delayTimer = setTimeout(() => {
      this.show = !localStorage.getItem(`coachTooltip/${this.name}`);
    }, this.delay);
  },
  deactivated() {
    this.hide();
  },
  methods: {
    hide() {
      this.show = false;
      clearTimeout(this.delayTimer);
      localStorage.setItem(`coachTooltip/${this.name}`, true);
    },
  },
};
</script>
