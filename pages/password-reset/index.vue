<i18n src="@/assets/locales/pages/password-reset/index.json" />

<template>
  <section>
    <heading class="is-large">
      {{ $t('title') }}
    </heading>
    <p>{{ $t('about') }}</p>
    <form @submit.prevent="sendPasswordResetEmail">
      <text-field
        v-model="email"
        :placeholder="$t('email')"
        type="email"
        class="has-border"
        autofocus
        required
      />
      <footer>
        <btn type="submit" class="is-rounded is-primary">
          {{ $t('send') }}
        </btn>
      </footer>
    </form>
  </section>
</template>

<script>
import Heading from '@/components/atoms/heading';
import Btn from '@/components/atoms/btn';
import TextField from '@/components/atoms/text-field';

export default {
  layout: 'no-menu',
  components: {
    Heading,
    TextField,
    Btn
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
