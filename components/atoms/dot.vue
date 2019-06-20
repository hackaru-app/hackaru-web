<template>
  <span :style="{ backgroundColor: color }" class="dot" />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
.dot {
  display: inline;
  border-radius: 50%;
  min-width: 9px;
  min-height: 9px;
}
.dot.is-large {
  min-width: 14px;
  min-height: 14px;
}
@media print {
  .dot {
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }
}
</style>
