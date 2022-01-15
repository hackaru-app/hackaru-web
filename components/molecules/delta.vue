<template>
  <div data-test-id="delta" :class="['delta', direction]">
    <span v-if="current !== 0 || previous !== 0" data-test-id="duration">{{
      formattedDuration
    }}</span>
    <icon class="icon" :name="iconName" data-test-id="icon" />
  </div>
</template>

<script>
import Icon from '~/components/atoms/icon';

function round(value, precision) {
  return Math.round(value * 10 ** precision) / 10 ** precision;
}

const units = [
  { format: 'h', seconds: 3600, precision: 1 },
  { format: 'min', seconds: 60, precision: 0 },
  { format: 's', seconds: 1, precision: 0 },
];

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
    duration() {
      return this.current - this.previous;
    },
    unit() {
      const isBestUnit = (unit) => Math.abs(this.duration / unit.seconds) >= 1;
      return units.find(isBestUnit) || units[units.length - 1];
    },
    formattedDuration() {
      const sign = this.duration < 0 ? '-' : '+';
      const rounded = round(
        this.duration / this.unit.seconds,
        this.unit.precision
      );
      return `${sign}${Math.abs(rounded)}${this.unit.format}`;
    },
    direction() {
      if (this.duration === 0) return 'even';
      return this.duration < 0 ? 'down' : 'up';
    },
    iconName() {
      if (this.duration === 0) return 'minus-icon';
      return 'arrow-up-icon';
    },
  },
};
</script>

<style scoped lang="scss">
.delta {
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
