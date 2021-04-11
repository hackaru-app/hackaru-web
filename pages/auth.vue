<i18n src="~/assets/locales/pages/auth.json"></i18n>

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
          class="has-border"
          data-test-id="email"
          autofocus
          required
        />
        <base-input
          v-model="password"
          :placeholder="$t('password')"
          type="password"
          class="has-border"
          data-test-id="password"
          required
        />
        <base-input
          v-if="!hasAccount"
          v-model="passwordConfirmation"
          :placeholder="$t('passwordConfirmation')"
          class="has-border"
          data-test-id="password-confirmation"
          type="password"
        />
        <footer>
          <div v-if="shownAgreement" class="agreement">
            <label for="agreement">
              <input
                id="agreement"
                v-model="agreement"
                type="checkbox"
                required
              />
              <i18n path="agreement">
                <a
                  :href="$config.hackaruTermsUrl"
                  target="_blank"
                  rel="noopener"
                  >{{ $t('termOfServiceAndPrivacyPolicy') }}</a
                >
              </i18n>
            </label>
          </div>
          <div class="buttons">
            <base-button
              :disabled="loading"
              type="submit"
              class="submit-button is-rounded is-primary"
            >
              <indicator v-if="loading" class="is-white is-small" />
              <span v-else>{{ $t(hasAccount ? 'login' : 'signUp') }}</span>
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
import Heading from '~/components/atoms/heading';
import BaseInput from '~/components/atoms/base-input';
import BaseButton from '~/components/atoms/base-button';
import LocaleSelect from '~/components/molecules/locale-select';
import Indicator from '~/components/atoms/indicator.vue';

export default {
  layout: 'auth',
  components: {
    Heading,
    BaseInput,
    BaseButton,
    LocaleSelect,
    Indicator,
  },
  head() {
    return {
      title: this.hasAccount ? 'Login' : 'SignUp',
    };
  },
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      agreement: false,
      hasAccount: !this.$route.query['sign-up'],
      loading: false,
    };
  },
  computed: {
    shownAgreement() {
      return !this.hasAccount && this.$config.hackaruTermsUrl;
    },
  },
  mounted() {
    if (this.$store.getters['auth/loggedIn']) {
      this.goBack();
    }
  },
  methods: {
    async submit() {
      this.loading = true;
      await (this.hasAccount ? this.login : this.signUp)();
      this.loading = false;
    },
    async login() {
      const success = await this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password,
      });
      if (success) {
        this.$ga.event({
          eventCategory: 'Accounts',
          eventAction: 'login',
        });
        this.goBack();
      }
    },
    async signUp() {
      const success = await this.$store.dispatch('auth/signUp', {
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
        locale: this.$i18n.locale,
      });
      if (success) {
        this.$ga.event({
          eventCategory: 'Accounts',
          eventAction: 'signUp',
        });
        this.goBack();
      }
    },
    goBack() {
      const path = this.$cookies.get('previous_path');
      this.$router.replace(path || this.localePath('index'));
      this.$cookies.remove('previous_path');
    },
  },
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
  min-width: 100px;
}
.toggle-button {
  box-sizing: border-box;
  color: $text-primary;
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
