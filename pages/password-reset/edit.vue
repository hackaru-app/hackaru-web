<i18n src="@/assets/locales/pages/password-reset/edit.json" />

<template>
  <section>
    <heading class="is-large">
      {{ $t('title') }}
    </heading>
    <form @submit.prevent="resetPassword">
      <base-input
        v-model="password"
        :placeholder="$t('password')"
        type="password"
        class="has-underline"
        required
      />
      <base-input
        v-model="passwordConfirmation"
        :placeholder="$t('passwordConfirmation')"
        type="password"
        class="has-underline"
        required
      />
      <base-button type="submit" class="button is-rounded is-primary">
        {{ $t('reset') }}
      </base-button>
    </form>
  </section>
</template>

<script>
import Heading from '@/components/atoms/heading';
import BaseInput from '@/components/atoms/base-input';
import BaseButton from '@/components/atoms/base-button';

export default {
  layout: 'auth',
  components: {
    Heading,
    BaseInput,
    BaseButton
  },
  head: {
    title: 'Reset Password'
  },
  data() {
    return {
      password: '',
      passwordConfirmation: ''
    };
  },
  methods: {
    async resetPassword() {
      const success = await this.$store.dispatch('auth/resetPassword', {
        id: this.$route.query['user_id'],
        token: this.$route.query['token'],
        password: this.password,
        passwordConfirmation: this.passwordConfirmation
      });
      if (success) {
        this.$router.push(this.localePath('auth'));
        this.$toast.success(this.$t('success'));
      }
    }
  }
};
</script>

<style scoped lang="scss">
section {
  margin: 30px 50px;
}
form {
  flex-direction: column;
  display: flex;
  margin-top: 20px;
}
.button {
  align-self: flex-start;
  margin-top: 18px;
}
@media screen and (max-width: 640px) {
  section {
    margin: 30px;
  }
}
</style>
