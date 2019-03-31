<template>
  <div class="project-name">
    <dot :color="color" class="dot" />
    {{ name }}
  </div>
</template>

<script>
import Dot from '@/components/atoms/dot';

export default {
  components: {
    Dot
  },
  props: {
    name: {
      type: String,
      default: 'No Project'
    },
    color: {
      type: String,
      default: '#cccfd9'
    }
  }
};
</script>

<style scoped lang="scss">
.project-name {
  display: flex;
  align-items: baseline;
}
.dot {
  margin-right: 15px;
}
</style>
