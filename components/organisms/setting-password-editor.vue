<i18n
  src="~/assets/locales/components/organisms/setting-password-editor.json"
></i18n>

<template>
  <setting-box>
    <template #heading>
      <icon name="lock-icon" class="icon" />
      {{ $t('title') }}
    </template>

    <form @submit.prevent="changePassword">
      <base-input
        v-model="currentPassword"
        :placeholder="$t('currentPassword')"
        type="password"
        class="has-border"
        data-test-id="current-password"
        size="1"
        required
      />
      <base-input
        v-model="password"
        :placeholder="$t('password')"
        type="password"
        class="has-border"
        data-test-id="password"
        size="1"
        required
      />
      <base-input
        v-model="passwordConfirmation"
        :placeholder="$t('passwordConfirmation')"
        type="password"
        class="has-border"
        data-test-id="password-confirmation"
        size="1"
        required
      />
      <base-button class="is-rounded is-primary" type="submit">{{
        $t('update')
      }}</base-button>
    </form>
  </setting-box>
</template>

<script>
import Icon from '~/components/atoms/icon';
import BaseButton from '~/components/atoms/base-button';
import BaseInput from '~/components/atoms/base-input';
import SettingBox from '~/components/molecules/setting-box';

export default {
  components: {
    Icon,
    BaseButton,
    BaseInput,
    SettingBox,
  },
  data() {
    return {
      password: '',
      currentPassword: '',
      passwordConfirmation: '',
    };
  },
  methods: {
    async changePassword() {
      const success = await this.$store.dispatch('auth/changePassword', {
        currentPassword: this.currentPassword,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      });
      if (success) this.$store.dispatch('toast/success', this.$t('changed'));
    },
  },
};
</script>
