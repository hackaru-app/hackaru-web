<i18n src="~/assets/locales/pages/password-reset/index.json"></i18n>

<template>
  <section>
    <heading class="is-large">
      {{ $t('title') }}
    </heading>
    <p>{{ $t('about') }}</p>
    <form @submit.prevent="sendPasswordResetEmail">
      <base-input
        v-model="email"
        :placeholder="$t('email')"
        type="email"
        class="has-border"
        data-test-id="email"
        autofocus
        required
      />
      <footer>
        <base-button type="submit" class="is-rounded is-primary">
          {{ $t('send') }}
        </base-button>
      </footer>
    </form>
  </section>
</template>

<script>
import Heading from '~/components/atoms/heading';
import BaseButton from '~/components/atoms/base-button';
import BaseInput from '~/components/atoms/base-input';

export default {
  components: {
    Heading,
    BaseInput,
    BaseButton,
  },
  layout: 'auth',
  data() {
    return {
      email: '',
    };
  },
  head() {
    return {
      title: 'Reset Password',
    };
  },
  methods: {
    async sendPasswordResetEmail() {
      const success = await this.$store.dispatch(
        'auth/sendPasswordResetEmail',
        {
          email: this.email,
          redirectUrl: `${window.location.origin}${this.localePath(
            'password-reset'
          )}/edit`,
        }
      );
      if (success) this.$store.dispatch('toast/success', this.$t('sent'));
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
  margin-top: 30px;
}

footer {
  align-items: center;
  display: flex;
  margin-top: 18px;
  position: relative;
}

@include mq(small) {
  section {
    margin: 30px;
  }
}
</style>
