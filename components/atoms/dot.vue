<template>
  <span :style="{ backgroundColor: color }" class="dot" />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.dot {
  border-radius: 50%;
  display: inline;
  min-height: 9px;
  min-width: 9px;
}
.dot.is-medium {
  min-height: 11px;
  min-width: 11px;
}
.dot.is-large {
  min-height: 14px;
  min-width: 14px;
}
</style>
