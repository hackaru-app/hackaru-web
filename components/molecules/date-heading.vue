<template>
  <div class="date-heading">
    <btn class="arrow-button has-icon" @click="left">
      <icon name="chevron-left-icon" class="is-primary is-large" />
    </btn>
    <heading class="heading">
      {{ title }}
    </heading>
    <btn class="arrow-button has-icon" @click="right">
      <icon name="chevron-right-icon" class="is-primary is-large" />
    </btn>
  </div>
</template>

<script>
import Btn from '@/components/atoms/btn';
import Icon from '@/components/atoms/icon';
import Heading from '@/components/atoms/heading';

export default {
  components: {
    Btn,
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
@media print {
  .arrow-button {
    display: none;
  }
}
</style>
