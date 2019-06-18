<template>
  <modal
    ref="modal"
    :adaptive="true"
    :max-width="500"
    :name="name"
    :pivot-y="0.5"
    :height="height"
    transition="fade"
    width="95%"
    @before-open="beforeOpen"
  >
    <div class="modal-content">
      <slot />
    </div>
  </modal>
</template>

<style lang="scss">
.v--modal-overlay {
  z-index: index($z, modal);
}
</style>

<style scoped lang="scss">
.modal-content {
  overflow: hidden;
  min-height: 100%;
  max-height: 100vh;
  overflow-y: scroll;
  transform: translateZ(0);
}
</style>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: 'auto'
    }
  },
  methods: {
    beforeOpen(e) {
      this.$emit('before-open', e);
    }
  }
};
</script>
