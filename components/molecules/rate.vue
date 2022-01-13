<template>
  <div data-test-id="rate" :class="['rate', delta]">
    <span data-test-id="percent">{{ percent }}</span>
    <icon class="icon" :name="iconName" data-test-id="icon" />
  </div>
</template>

<script>
import Icon from '~/components/atoms/icon';

function round(value, precision) {
  return Math.round(value * 10 ** precision) / 10 ** precision;
}

export default {
  components: {
    Icon,
  },
  props: {
    current: {
      type: Number,
      required: true,
    },
    previous: {
      type: Number,
      required: true,
    },
  },
  computed: {
    rate() {
      return ((this.current - this.previous) / this.previous) * 100;
    },
    percent() {
      if (!isFinite(this.rate)) return '';
      const rounded = round(this.rate, 1);
      return `${this.rate > 0 ? '+' : ''}${rounded.toLocaleString()}%`;
    },
    delta() {
      if (!isFinite(this.rate) || this.rate === 0) return 'even';
      return this.current < this.previous ? 'down' : 'up';
    },
    iconName() {
      if (!isFinite(this.rate) || this.rate === 0) return 'minus-icon';
      return 'arrow-up-icon';
    },
  },
};
</script>

<style scoped lang="scss">
.rate {
  display: flex;
  justify-content: center;
  margin-left: 10px;
  font-family: $font-family-duration;
}

.icon {
  transition: transform 0.4s ease;
  margin-left: 3px;
}

.even {
  color: $text-lighter;
}

.up {
  color: $green;
}

.down {
  color: $red;

  .icon {
    transform: rotate(-180deg);
  }
}
</style>
