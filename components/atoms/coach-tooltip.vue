<template>
  <div v-tooltip="params" @click="hide">
    <slot />
  </div>
</template>

<script>
export default {
  timers: {
    hide: {
      time: 5000,
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
      };
    },
  },
  mounted() {
    this.show = !localStorage.getItem(`coachTooltip/${this.name}`);
  },
  deactivated() {
    this.hide();
  },
  methods: {
    hide() {
      this.show = false;
      localStorage.setItem(`coachTooltip/${this.name}`, true);
    },
  },
};
</script>
