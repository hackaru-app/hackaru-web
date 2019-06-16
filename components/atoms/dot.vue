<template>
  <span
    :style="{ backgroundColor: color }"
    :class="['dot', { 'is-highlight': highlight }]"
  />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    },
    highlight: {
      type: Boolean,
      default: false
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
.dot.is-highlight {
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-direction: alternate;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
}
@keyframes fadeIn {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
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
