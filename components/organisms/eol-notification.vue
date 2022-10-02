<i18n src="~/assets/locales/components/organisms/eol-notification.json"></i18n>

<template>
  <div v-if="opened" class="eol-notification">
    <a :href="$config.hackaruEolUrl" target="_blank" rel="noopener"
      ><icon name="alert-triangle-icon" class="alert-icon" />{{
        $t('message')
      }}</a
    >
    <button class="close-button" @click="hide">
      <icon name="x-icon" />
    </button>
  </div>
</template>

<script>
import Icon from '~/components/atoms/icon';

export default {
  components: {
    Icon,
  },
  data() {
    return {
      opened: false,
    };
  },
  mounted() {
    const learned = localStorage.getItem('eol');
    this.opened = !learned && !!this.$config.hackaruEolUrl;
  },
  methods: {
    hide() {
      this.opened = false;
      localStorage.setItem('eol', true);
    },
  },
};
</script>

<style scoped lang="scss">
.eol-notification {
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  bottom: 0;
  background-color: $yellow;
  gap: 30px;
}

a {
  text-align: center;
  padding: 8px 0;
  color: $text;
}

.alert-icon {
  margin-right: 5px;
}
</style>
