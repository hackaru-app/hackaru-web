<template>
  <div class="delta-icon">
    <icon :class="['icon', delta]" :name="iconName" data-test-id="icon" />
  </div>
</template>

<script>
import Icon from '@/components/atoms/icon';

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
    delta() {
      if (this.current === this.previous) return 'even';
      return this.current < this.previous ? 'down' : 'up';
    },
    iconName() {
      if (this.current === this.previous) return 'minus-icon';
      return 'arrow-up-icon';
    },
  },
};
</script>

<style scoped lang="scss">
.delta-icon {
  display: flex;
  justify-content: center;
  margin-left: 10px;
}
.icon {
  transition: transform 0.4s ease;
  transform: rotate(-360deg);
}
.icon.even {
  color: $text-lighter;
}
.icon.up {
  color: $green;
  transform: rotate(0);
}
.icon.down {
  color: $red;
  transform: rotate(-180deg);
}
</style>
