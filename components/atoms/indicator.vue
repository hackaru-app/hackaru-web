<template>
  <span class="indicator" />
</template>

<style scoped lang="scss">
.indicator {
  -webkit-animation: rotate 1.1s infinite linear;
  animation: rotate 1.1s infinite linear;
  border: 3px solid;
  border-left: 3px solid;
  border-radius: 50%;
  height: 30px;
  position: relative;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  width: 30px;
}

.is-primary {
  border-color: #00000010;
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
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
