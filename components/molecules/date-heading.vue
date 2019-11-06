<template>
  <div class="date-heading">
    <base-button class="arrow-button has-icon" @click="left">
      <icon name="chevron-left-icon" class="is-primary is-large" />
    </base-button>
    <heading class="heading">
      {{ title }}
    </heading>
    <base-button class="arrow-button has-icon" @click="right">
      <icon name="chevron-right-icon" class="is-primary is-large" />
    </base-button>
  </div>
</template>

<script>
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import Heading from '@/components/atoms/heading';

export default {
  components: {
    BaseButton,
    Icon,
    Heading
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    left() {
      this.$emit('left');
    },
    right() {
      this.$emit('right');
    }
  }
};
</script>

<style scoped lang="scss">
.date-heading {
  display: flex;
}
.heading {
  margin: 0 15px;
  margin-bottom: 2px;
}
</style>
