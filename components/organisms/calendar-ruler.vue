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
import PxMinConvertable from '@/plugins/mixins/px-min-convertable';
import { fromS } from 'hh-mm-ss';

export default {
  mixins: [PxMinConvertable],
  props: {
    top: {
      type: Number,
      default: undefined
    },
    color: {
      type: String,
      required: true
    },
    showTime: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    time() {
      return fromS(Math.floor(this.toMin(this.top)));
    }
  }
};
</script>

<style scoped lang="scss">
.ruler {
  display: flex;
  position: absolute;
  flex-direction: column;
  left: 0;
  width: 100%;
  z-index: index($z, calendar-ruler);
  animation-duration: 0.3s;
}
.ruler time {
  width: 60px;
  color: #fff;
  display: flex;
  justify-content: center;
  line-height: 20px;
  font-size: 12px;
}
.line {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
}
@include mq(small) {
  .ruler time {
    width: 40px;
  }
}
</style>
