<i18n
  src="~/assets/locales/components/organisms/setting-logout-button.json"
></i18n>

<template>
  <setting-box>
    <template v-slot:heading>
      <icon name="log-out-icon" class="icon" />
      {{ $t('title') }}
    </template>

    <base-button
      class="is-rounded is-primary"
      data-test-id="logout-button"
      type="button"
      @click="logout"
    >
      Logout
    </base-button>
  </setting-box>
</template>

<script>
import Icon from '~/components/atoms/icon';
import BaseButton from '~/components/atoms/base-button';
import SettingBox from '~/components/molecules/setting-box';

export default {
  components: {
    Icon,
    BaseButton,
    SettingBox,
  },
  methods: {
    async logout() {
      if (!window.confirm(this.$t('confirms'))) return;
      this.$ga.event({
        eventCategory: 'Accounts',
        eventAction: 'logout',
      });
      this.$store.dispatch('auth/logout');
    },
  },
};
</script>
