<i18n src="~/assets/locales/pages/password-reset/edit.json"></i18n>

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
        class="has-border"
        data-test-id="password"
        required
      />
      <base-input
        v-model="passwordConfirmation"
        :placeholder="$t('passwordConfirmation')"
        type="password"
        class="password-confirmation has-border"
        data-test-id="password-confirmation"
        required
      />
      <base-button type="submit" class="button is-rounded is-primary">
        {{ $t('reset') }}
      </base-button>
    </form>
  </section>
</template>

<script>
import Heading from '~/components/atoms/heading';
import BaseInput from '~/components/atoms/base-input';
import BaseButton from '~/components/atoms/base-button';

export default {
  components: {
    Heading,
    BaseInput,
    BaseButton,
  },
  layout: 'auth',
  data() {
    return {
      password: '',
      passwordConfirmation: '',
    };
  },
  head: {
    title: 'Reset Password',
  },
  methods: {
    async resetPassword() {
      const success = await this.$store.dispatch('auth/resetPassword', {
        id: this.$route.query['user_id'],
        token: this.$route.query['token'],
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      });
      if (success) {
        this.$router.push(this.localePath('auth'));
        this.$store.dispatch('toast/success', this.$t('success'));
      }
    },
  },
};
</script>

<style scoped lang="scss">
section {
  margin: 30px 50px;
}

form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.button {
  align-self: flex-start;
  margin-top: 18px;
}

@include mq(small) {
  section {
    margin: 30px;
  }
}
</style>
