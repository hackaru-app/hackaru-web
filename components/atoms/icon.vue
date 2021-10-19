<template>
  <component :is="name" class="icon" />
</template>

<script>
import * as icons from 'vue-feather-icons';

export default {
  components: {
    ...icons,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.icon {
  vertical-align: bottom;
  width: 20px;
}

.icon.is-small {
  width: 16px;
}

.icon.is-medium {
  width: 18px;
}

.icon.is-large {
  width: 22px;
}

.icon.is-x-large {
  width: 24px;
}

.icon.is-primary {
  color: $text-primary;
}

.icon.is-danger {
  color: $red;
}

.feather-chevron-left {
  margin-left: -5px;
}

.feather-chevron-right {
  margin-right: -5px;
}
</style>
