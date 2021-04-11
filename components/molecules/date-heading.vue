<template>
  <div class="date-heading">
    <icon-button class="arrow-button" @click="left">
      <icon name="chevron-left-icon" class="is-primary is-large" />
    </icon-button>
    <heading class="heading">
      {{ title }}
    </heading>
    <icon-button class="arrow-button" @click="right">
      <icon name="chevron-right-icon" class="is-primary is-large" />
    </icon-button>
  </div>
</template>

<script>
import IconButton from '~/components/atoms/icon-button';
import Icon from '~/components/atoms/icon';
import Heading from '~/components/atoms/heading';

export default {
  components: {
    IconButton,
    Icon,
    Heading,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    left() {
      this.$emit('left');
    },
    right() {
      this.$emit('right');
    },
  },
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
