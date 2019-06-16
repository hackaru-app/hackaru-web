<template>
  <div class="project-name">
    <dot :highlight="highlight" :color="color" class="dot" />
    <p>{{ name }}</p>
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
    },
    highlight: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.project-name {
  display: flex;
  align-items: baseline;
}
p {
  width: 100%;
  display: inline;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.dot {
  margin-right: 15px;
}
</style>
