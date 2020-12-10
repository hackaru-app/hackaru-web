<template>
  <span class="indicator" />
</template>

<style scoped lang="scss">
.indicator {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: relative;
  border: 3px solid;
  border-left: 3px solid;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: rotate 1.1s infinite linear;
  animation: rotate 1.1s infinite linear;
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
  width: 13px;
  height: 13px;
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
