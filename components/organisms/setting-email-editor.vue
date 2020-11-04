<i18n
  src="@/assets/locales/components/organisms/setting-email-editor.json"
></i18n>

<template>
  <setting-box>
    <template v-slot:heading>
      <icon name="mail-icon" class="icon" />
      {{ $t('title') }}
    </template>

    <form @submit.prevent="changeEmail">
      <base-input
        v-model="email"
        :placeholder="$t('email')"
        type="email"
        class="has-border"
        data-test-id="email"
        required
        @focus="$event.target.select()"
      />
      <base-input
        v-model="currentPassword"
        :placeholder="$t('password')"
        type="password"
        class="has-border"
        data-test-id="current-password"
        required
      />
      <base-button class="is-rounded is-primary" type="submit">{{
        $t('update')
      }}</base-button>
    </form>
  </setting-box>
</template>

<script>
import Icon from '@/components/atoms/icon';
import BaseButton from '@/components/atoms/base-button';
import BaseInput from '@/components/atoms/base-input';
import SettingBox from '@/components/molecules/setting-box';

export default {
  components: {
    Icon,
    BaseButton,
    BaseInput,
    SettingBox,
  },
  data() {
    return {
      email: this.$store.getters['auth/email'],
      currentPassword: '',
    };
  },
  methods: {
    async changeEmail({ store }) {
      const success = await this.$store.dispatch('auth/changeEmail', {
        email: this.email,
        currentPassword: this.currentPassword,
      });
      if (success) this.$store.dispatch('toast/success', this.$t('changed'));
    },
  },
};
</script>
