<i18n
  src="@/assets/locales/components/organisms/setting-password-editor.json"
/>

<template>
  <setting-box>
    <template v-slot:heading>
      <icon name="lock-icon" class="icon" />
      {{ $t('title') }}
    </template>

    <form @submit.prevent="changePassword">
      <base-input
        v-model="currentPassword"
        :placeholder="$t('currentPassword')"
        type="password"
        class="current-password has-border"
        size="1"
        required
      />
      <base-input
        v-model="password"
        :placeholder="$t('password')"
        type="password"
        class="password has-border"
        size="1"
        required
      />
      <base-input
        v-model="passwordConfirmation"
        :placeholder="$t('passwordConfirmation')"
        type="password"
        class="password-confirmation has-border"
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
import Icon from '@/components/atoms/icon';
import BaseButton from '@/components/atoms/base-button';
import BaseInput from '@/components/atoms/base-input';
import SettingBox from '@/components/molecules/setting-box';

export default {
  components: {
    Icon,
    BaseButton,
    BaseInput,
    SettingBox
  },
  data() {
    return {
      password: '',
      currentPassword: '',
      passwordConfirmation: ''
    };
  },
  methods: {
    async changePassword({ store }) {
      const success = await this.$store.dispatch('auth/changePassword', {
        currentPassword: this.currentPassword,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation
      });
      if (success) this.$toast.success(this.$t('changed'));
    }
  }
};
</script>
