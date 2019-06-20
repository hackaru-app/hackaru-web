<template>
  <div class="toast">
    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <div v-if="opened" :class="['content', message.type]">
        {{ message.text }}
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      opened: false,
      hideTimer: undefined
    };
  },
  computed: {
    ...mapGetters({
      message: 'toast/message'
    })
  },
  watch: {
    message() {
      this.opened = true;
      clearInterval(this.hideTimer);
      this.hideTimer = setTimeout(
        () => (this.opened = false),
        this.message.duration
      );
    }
  }
};
</script>

<style scoped lang="scss">
.toast {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  left: 0;
}
.content {
  display: flex;
  position: fixed;
  bottom: 50px;
  justify-content: center;
  padding: 9px 20px;
  margin: 0 20px;
  color: $white;
  border-radius: 99px;
  text-align: center;
  z-index: index($z, toast);
}
.success {
  background-color: $cyan;
}
.error {
  background-color: $red;
}
@include mq(small) {
  .content {
    padding: 18px 30px;
    padding-bottom: calc(18px + env(safe-area-inset-bottom) * 0.6);
    flex-direction: column;
    box-sizing: border-box;
    bottom: 0;
    margin: 0;
    width: 100%;
    border-radius: 0;
  }
}
</style>
