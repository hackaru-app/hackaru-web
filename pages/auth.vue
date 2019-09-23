<i18n src="@/assets/locales/pages/auth.json" />

<template>
  <section class="auth">
    <div class="form-container">
      <transition name="fade" mode="out-in">
        <heading :key="hasAccount" class="title is-large">
          {{ $t(`titles.${hasAccount ? 'login' : 'signUp'}`) }}
        </heading>
      </transition>
      <form @submit.prevent="submit">
        <base-input
          v-model="email"
          :placeholder="$t('email')"
          type="email"
          class="email has-border"
          autofocus
          required
        />
        <base-input
          v-model="password"
          :placeholder="$t('password')"
          type="password"
          class="password has-border"
          required
        />
        <base-input
          v-if="!hasAccount"
          v-model="passwordConfirmation"
          :placeholder="$t('passwordConfirmation')"
          class="password-confirmation has-border"
          type="password"
        />
        <footer>
          <div v-if="isShowAgreement" class="agreement">
            <label for="agreement">
              <input
                id="agreement"
                v-model="agreement"
                type="checkbox"
                required
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
            <base-button
              type="submit"
              class="submit-button is-rounded is-primary"
            >
              {{ $t(hasAccount ? 'login' : 'signUp') }}
            </base-button>
            <button
              type="button"
              class="toggle-button"
              @click="hasAccount = !hasAccount"
            >
              <span>or</span>
              {{ $t(hasAccount ? 'or.signUp' : 'or.login') }}
            </button>
          </div>
          <nuxt-link v-if="hasAccount" class="forgot" to="password-reset">
            {{ $t('forgot') }}
          </nuxt-link>
        </footer>
      </form>
    </div>
    <footer class="auth-footer">
      <locale-select class="locale-select" />
    </footer>
  </section>
</template>

<script>
import Heading from '@/components/atoms/heading';
import BaseInput from '@/components/atoms/base-input';
import BaseButton from '@/components/atoms/base-button';
import LocaleSelect from '@/components/molecules/locale-select';

export default {
  layout: 'auth',
  components: {
    Heading,
    BaseInput,
    BaseButton,
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
    }
  },
  mounted() {
    if (this.$store.getters['auth/loggedIn']) {
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
        // this.$ga.set('userId', this.$store.getters['auth/userId']);
        // this.$ga.event('auth', 'login');
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
        // this.$ga.set('userId', this.$store.getters['auth/userId']);
        // this.$ga.event('auth', 'signUp');
      }
    },
    goBack() {
      const prev = sessionStorage.getItem('previousPath');
      this.$router.replace(prev || this.localePath('index'));
      sessionStorage.removeItem('previousPath');
    }
  }
};
</script>

<style scoped lang="scss">
.auth {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.form-container {
  padding: 30px 50px;
  flex-grow: 1;
}
.auth form {
  padding-top: 20px;
  max-width: 480px;
  display: flex;
  flex-direction: column;
}
.auth form footer {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.auth form footer .buttons {
  display: flex;
  flex: 1;
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
  min-width: 110px;
}
.toggle-button {
  box-sizing: border-box;
  color: $cyan-dark;
  text-decoration: none;
  width: 200px;
  padding: 10px 0;
  cursor: pointer;
  text-align: left;
  border: 0;
  background: none;
  span {
    color: $text-lighter;
    margin-right: 5px;
    margin-left: 20px;
  }
}
.forgot {
  color: $text-light;
  text-decoration: none;
  display: flex;
  animation-duration: 0.2s;
  margin-top: 30px;
  margin-left: 5px;
  width: 300px;
}
.auth-footer {
  display: flex;
  padding: 30px 50px;
  align-items: center;
}
.locale-select {
  flex-shrink: 0;
}
@media screen and (max-width: 640px) {
  .auth {
    min-height: auto;
  }
  .form-container {
    padding: 30px;
  }
  .auth-footer {
    padding: 30px;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
