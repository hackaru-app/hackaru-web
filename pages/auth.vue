<i18n src="@/assets/locales/pages/auth.json" />

<template>
  <section>
    <div class="form-container">
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
          class="has-border"
          autofocus
          required
        />
        <text-field
          v-model="password"
          :placeholder="$t('password')"
          :aria-label="$t('password')"
          type="password"
          class="password has-border"
          required
        />
        <text-field
          v-if="!hasAccount"
          v-model="passwordConfirmation"
          :placeholder="$t('passwordConfirmation')"
          :aria-label="$t('passwordConfirmation')"
          class="has-border"
          type="password"
        />
        <footer>
          <div v-if="isShowAgreement" class="agreement">
            <label for="agreement">
              <input
                id="agreement"
                v-model="agreement"
                type="checkbox"
                required="required"
              />
              <i18n path="agreement">
                <a
                  :href="$env.HACKARU_TOS_AND_PRIVACY_URL"
                  target="_blank"
                  rel="noopener"
                  >{{ $t('termOfServiceAndPrivacyPolicy') }}</a
                >
              </i18n>
            </label>
          </div>
          <div class="buttons">
            <btn
              :disabled="!hasAccount && !isAgreed"
              type="submit"
              class="submit-button is-rounded is-primary"
            >
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
          </div>
          <transition name="fade">
            <nuxt-link v-if="hasAccount" class="forgot" to="password-reset">
              {{ $t('forgot') }}
            </nuxt-link>
          </transition>
        </footer>
      </form>
    </div>
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
      agreement: false,
      hasAccount: !this.$route.query['sign-up']
    };
  },
  computed: {
    isShowAgreement() {
      return !this.hasAccount && this.$env.HACKARU_TOS_AND_PRIVACY_URL;
    },
    isAgreed() {
      return !this.$env.HACKARU_TOS_AND_PRIVACY_URL || this.agreement;
    }
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
        this.$ga.set('userId', this.$store.getters['auth/getUserId']);
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
        this.$ga.set('userId', this.$store.getters['auth/getUserId']);
        this.$ga.event('auth', 'signUp');
        this.$toast.success(this.$t('signedUp'));
      }
    },
    goBack() {
      this.$router.replace(
        sessionStorage.getItem('previousPath') || this.localePath('index')
      );
      sessionStorage.removeItem('previousPath');
    }
  }
};
</script>

<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.form-container {
  padding: 30px 50px;
  flex-grow: 1;
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
  flex-direction: column;
  margin-top: 20px;
}
form footer .buttons {
  display: flex;
  flex: 1;
}
form input.password {
  padding-right: 80px;
}
.agreement {
  display: flex;
  flex: 1;
  margin-bottom: 30px;
  input {
    margin-right: 10px;
  }
  a {
    color: $text;
  }
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
.forgot {
  color: $text-light;
  text-decoration: none;
  display: flex;
  animation-duration: 0.3s;
  margin-top: 30px;
  margin-left: 5px;
  width: 300px;
}
.auth-footer {
  display: flex;
  padding: 30px 50px;
  align-items: center;
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
  .form-container {
    padding: 30px;
  }
  .auth-footer {
    padding: 30px;
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
