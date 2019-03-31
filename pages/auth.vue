<i18n src="@/assets/locales/pages/auth.json" />

<template>
  <section>
    <transition name="fade" mode="out-in">
      <heading :key="hasAccount" class="is-large">
        {{ $t(`titles.${hasAccount ? 'login' : 'signUp'}`) }}
      </heading>
    </transition>
    <form @submit.prevent="submit">
      <text-field
        v-model="email"
        :placeholder="$t('email')"
        :aria-label="$t('email')"
        type="email"
        class="has-underline"
        autofocus
        required
      />
      <text-field
        v-model="password"
        :placeholder="$t('password')"
        :aria-label="$t('password')"
        type="password"
        class="has-underline"
        required
      />
      <text-field
        v-if="!hasAccount"
        v-model="passwordConfirmation"
        :placeholder="$t('passwordConfirmation')"
        :aria-label="$t('passwordConfirmation')"
        class="has-underline"
        type="password"
      />
      <footer>
        <transition name="fade">
          <nuxt-link v-if="hasAccount" class="forgot" to="password-reset">
            {{ $t('forgot') }}
          </nuxt-link>
        </transition>
        <btn type="submit" class="submit-button is-rounded is-primary">
          {{ $t(hasAccount ? 'login' : 'signUp') }}
        </btn>
        <button
          type="button"
          class="toggle-button"
          @click="hasAccount = !hasAccount"
        >
          <span>or</span>
          {{ $t(hasAccount ? 'or.signUp' : 'or.login') }}
        </button>
      </footer>
    </form>
    <footer class="auth-footer">
      <locale-select class="locale-select" />
      <i18n
        v-if="$env.GOOGLE_ANALYTICS_TRACKING_ID"
        path="googleAnalytics"
        tag="p"
        class="ga-description"
      >
        <a
          target="_blank"
          rel="noopener"
          href="https://policies.google.com/technologies/partner-sites"
          >GoogleAnalytics (Cookie)</a
        >
      </i18n>
    </footer>
  </section>
</template>

<script>
import Heading from '@/components/atoms/heading';
import TextField from '@/components/atoms/text-field';
import Btn from '@/components/atoms/btn';
import LocaleSelect from '@/components/molecules/locale-select';

export default {
  layout: 'no-menu',
  components: {
    Heading,
    TextField,
    Btn,
    LocaleSelect
  },
  head() {
    return {
      title: this.hasAccount ? 'Login' : 'SignUp'
    };
  },
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      hasAccount: true
    };
  },
  mounted() {
    if (this.$store.getters['auth/isLoggedIn']) {
      this.goBack();
    }
  },
  methods: {
    async submit() {
      await (this.hasAccount ? this.login : this.signUp)();
    },
    async login() {
      const success = await this.$store.dispatch('auth/fetchRefreshToken', {
        email: this.email,
        password: this.password
      });
      if (success) {
        this.goBack();
        this.$ga.event('auth', 'login');
        this.$toast.success(this.$t('loggedIn'));
      }
    },
    async signUp() {
      const success = await this.$store.dispatch('auth/signUp', {
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation
      });
      if (success) {
        this.goBack();
        this.$ga.event('auth', 'signUp');
        this.$toast.success(this.$t('signedUp'));
      }
    },
    goBack() {
      this.$router.push(
        sessionStorage.getItem('previousPath') || this.localePath('index')
      );
      sessionStorage.removeItem('previousPath');
    }
  }
};
</script>

<style scoped lang="scss">
section {
  margin: 30px 50px;
}
form {
  padding-top: 30px;
  max-width: 480px;
  display: flex;
  flex-direction: column;
}
form footer {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 18px;
}
.forgot {
  color: $text-light;
  text-align: right;
  text-decoration: none;
  position: absolute;
  top: -58px;
  right: 0;
  padding: 0 10px;
  padding-bottom: 10px;
  height: 16px;
  animation-duration: 0.3s;
}
.submit-button {
  width: 100px;
}
.toggle-button {
  box-sizing: border-box;
  color: $cyan;
  text-decoration: none;
  width: 200px;
  padding: 10px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  border: 0;
  background: none;
  span {
    color: $text-lighter;
    margin-right: 5px;
    margin-left: 20px;
  }
  &:active {
    transform: scale(0.9);
  }
}
.auth-footer {
  position: absolute;
  display: flex;
  padding-right: 30px;
  align-items: center;
  bottom: 40px;
}
.ga-description {
  color: $text-lighter;
  font-size: 13px;
  margin: 20px;
  margin-right: 0;
}
.locale-select {
  flex-shrink: 0;
}
.ga-description a {
  color: $text-lighter;
}
@media screen and (max-width: 640px) {
  section {
    margin: 30px;
  }
  .auth-footer {
    flex-direction: column;
    align-items: flex-start;
  }
  .ga-description {
    color: $text-lighter;
    margin-left: 0;
    margin-bottom: 0;
  }
}
</style>
