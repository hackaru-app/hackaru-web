<template>
  <span class="indicator" />
</template>

<style scoped lang="scss">
.indicator {
  animation: rotate 1.1s infinite linear;
  border: 3px solid;
  border-left: 3px solid;
  border-radius: 50%;
  height: 30px;
  position: relative;
  transform: translateZ(0);
  width: 30px;
}

.is-primary {
  border-color: rgb(0 0 0 / 10%);
  border-left-color: $cyan;
}

.is-white {
  border-color: $white;
  border-left-color: transparent;
}

.is-small {
  height: 13px;
  width: 13px;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
