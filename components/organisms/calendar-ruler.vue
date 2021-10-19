<template>
  <transition name="fade">
    <section
      v-if="top !== undefined"
      :style="{ marginTop: `${top}px` }"
      class="ruler"
    >
      <span :style="{ background: `${color}` }" class="line" />
      <time v-if="showTime" :style="{ background: `${color}` }">
        {{ time }}
      </time>
    </section>
  </transition>
</template>

<script>
import { fromS } from 'hh-mm-ss';

export default {
  props: {
    top: {
      type: Number,
      default: undefined,
    },
    color: {
      type: String,
      required: true,
    },
    showTime: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    time() {
      return fromS(Math.floor(this.$toMin(this.top)));
    },
  },
};
</script>

<style scoped lang="scss">
.ruler {
  animation-duration: 0.2s;
  display: flex;
  flex-direction: column;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: index($z, calendar-ruler);
}

.ruler time {
  color: $white;
  display: flex;
  font-size: 12px;
  justify-content: center;
  line-height: 20px;
  width: 60px;
}

.line {
  content: '';
  display: block;
  height: 1px;
  width: 100%;
}

@include mq(small) {
  .ruler time {
    width: 40px;
  }
}
</style>
