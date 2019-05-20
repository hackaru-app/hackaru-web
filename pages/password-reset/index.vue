<i18n src="@/assets/locales/pages/password-reset/index.json" />

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
import Heading from '@/components/atoms/heading';
import BaseButton from '@/components/atoms/base-button';
import BaseInput from '@/components/atoms/base-input';

export default {
  layout: 'no-menu',
  components: {
    Heading,
    BaseInput,
    BaseButton
  },
  head() {
    return {
      title: 'Reset Password'
    };
  },
  data() {
    return {
      email: ''
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
          )}/edit`
        }
      );
      if (success) this.$toast.success(this.$t('sent'));
    }
  }
};
</script>

<style scoped lang="scss">
section {
  margin: 30px 50px;
}
form {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}
footer {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 18px;
}
@media screen and (max-width: 640px) {
  section {
    margin: 30px;
  }
}
</style>
