<template>
  <time>{{ fromS(currentDuration, 'hh:mm:ss') }}</time>
</template>

<script>
import { fromS } from 'hh-mm-ss';

export default {
  props: {
    duration: {
      type: Number,
      required: true,
    },
    interval: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      fromS,
      requestId: undefined,
      startTime: undefined,
      initialDuration: this.duration,
      currentDuration: this.duration,
    };
  },
  watch: {
    duration: 'startAnimation',
  },
  methods: {
    startAnimation() {
      window.cancelAnimationFrame(this.requestId);
      this.initialDuration = this.currentDuration;
      this.startTime = Date.now();
      this.updateCurrentDuration();
    },
    getProgress() {
      if (!this.startTime) return 1;
      const progress = (Date.now() - this.startTime) / this.interval;
      return Math.min(progress, 1);
    },
    easeOutQuart(progress) {
      return 1 - Math.pow(1 - progress, 4);
    },
    updateCurrentDuration() {
      const progress = this.getProgress();
      const delta =
        (this.duration - this.initialDuration) * this.easeOutQuart(progress);
      this.currentDuration = this.initialDuration + Math.ceil(delta);
      if (progress < 1) {
        this.requestId = window.requestAnimationFrame(
          this.updateCurrentDuration
        );
      }
    },
  },
};
</script>
