<template>
  <div class="delta-icon">
    <icon :class="['icon', delta]" :name="iconName" />
  </div>
</template>

<script>
import Icon from '@/components/atoms/icon';

export default {
  components: {
    Icon
  },
  props: {
    current: {
      type: Number,
      required: true
    },
    previous: {
      type: Number,
      required: true
    }
  },
  computed: {
    delta() {
      if (this.current === this.previous) return '';
      return this.current < this.previous ? 'down' : 'up';
    },
    iconName() {
      if (this.delta === '') return 'minus-icon';
      return `arrow-${this.delta}-icon`;
    }
  }
};
</script>

<style scoped lang="scss">
.delta-icon {
  display: flex;
  justify-content: center;
  margin-left: 10px;
  color: $grey-999;
}
.up {
  color: $green;
}
.down {
  color: $red;
}
</style>
