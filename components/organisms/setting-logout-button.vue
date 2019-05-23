<i18n src="@/assets/locales/pages/settings/index.json" />

<template>
  <setting-box>
    <template v-slot:heading>
      <icon name="log-out-icon" class="icon" />
      {{ $t('titles.logout') }}
    </template>

    <base-button
      class="is-rounded logout-button is-primary"
      type="button"
      @click="logout"
    >
      Logout
    </base-button>
  </setting-box>
</template>

<script>
import Icon from '@/components/atoms/icon';
import BaseButton from '@/components/atoms/base-button';
import SettingBox from '@/components/molecules/setting-box';

export default {
  components: {
    Icon,
    BaseButton,
    SettingBox
  },
  methods: {
    async logout() {
      if (!window.confirm(this.$t('confirms.logout'))) return;
      this.$ga.event('auth', 'logout');
      await this.$store.dispatch('auth/logout');
      window.location.assign(this.localePath('index'));
    }
  }
};
</script>
