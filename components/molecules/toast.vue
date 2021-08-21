<template>
  <div class="toast">
    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <div
        v-if="opened"
        :class="['content', message.type]"
        data-test-id="content"
      >
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
      hideTimer: undefined,
    };
  },
  computed: {
    ...mapGetters({
      message: 'toast/message',
    }),
  },
  watch: {
    message() {
      this.opened = true;
      clearInterval(this.hideTimer);
      this.hideTimer = setTimeout(
        () => (this.opened = false),
        this.message.duration
      );
    },
  },
};
</script>

<style scoped lang="scss">
.toast {
  align-items: flex-end;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: $side-bar-min-width;
  pointer-events: none;
  position: fixed;
  width: calc(100vw - #{$side-bar-min-width});
  z-index: index($z, toast);
}

.content {
  border-radius: 99px;
  color: $white;
  margin-bottom: 50px;
  padding: 9px 20px;
  text-align: center;
}

.success {
  background-color: $cyan;
}

.error {
  background-color: $red;
}

@include mq(small) {
  .toast {
    left: 0;
    width: 100vw;
  }

  .content {
    border-radius: 0;
    bottom: 0;
    box-sizing: border-box;
    flex-direction: column;
    left: 0;
    margin: 0;
    padding: 25px 30px;
    padding-bottom: calc(25px + env(safe-area-inset-bottom) * 0.6);
    width: 100%;
  }
}
</style>
