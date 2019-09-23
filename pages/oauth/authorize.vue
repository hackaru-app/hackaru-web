<i18n src="@/assets/locales/common/scopes.json" />
<i18n src="@/assets/locales/pages/oauth/authorize.json" />

<template>
  <login-guard>
    <div v-show="client.name">
      <content-header>
        <heading>
          {{ $t('title', { name: client.name }) }}
        </heading>
      </content-header>
      <article>
        <p>
          {{ $t('logged-in', { email }) }}<br />
          {{ $t('decide', { name: client.name }) }}
        </p>

        <highlight class="highlight">
          <ul v-if="client.scopes && client.scopes[0]">
            <li v-for="(scope, index) in client.scopes" :key="index">
              {{ $t(`scopes.${scope}`) }}
            </li>
          </ul>
          <ul v-else>
            <li class="empty-scope">
              {{ $t('empty-scope') }}
            </li>
          </ul>
        </highlight>
        <footer class="footer">
          <base-button
            type="button"
            class="is-rounded is-primary allow-button"
            @click="decide('allow')"
          >
            {{ $t('allow') }}
          </base-button>
          <base-button
            type="button"
            class="is-rounded deny-button"
            @click="decide('deny')"
          >
            {{ $t('deny') }}
          </base-button>
        </footer>
      </article>
    </div>
  </login-guard>
</template>

<script>
import LoginGuard from '@/components/atoms/login-guard';
import Heading from '@/components/atoms/heading';
import BaseButton from '@/components/atoms/base-button';
import ContentHeader from '@/components/organisms/content-header';
import Highlight from '@/components/atoms/highlight';
import { mapGetters } from 'vuex';

export default {
  layout: 'auth',
  components: {
    LoginGuard,
    ContentHeader,
    BaseButton,
    Heading,
    Highlight
  },
  head: {
    title: 'Authorize'
  },
  computed: {
    ...mapGetters({
      client: 'oauth/client',
      email: 'auth/email'
    })
  },
  async mounted() {
    const data = await this.$store.dispatch('oauth/fetchClient', {
      clientId: this.$route.query['client_id'],
      responseType: this.$route.query['response_type'],
      redirectUri: this.$route.query['redirect_uri'],
      scope: this.$route.query['scope'],
      state: this.$route.query.state
    });
    this.callback(data);
  },
  methods: {
    async decide(action) {
      this.$gtm.trackEvent({
        category: 'OAuth',
        action,
        label: 'Pages/OAuth/Authorize'
      });
      const data = await this.$store.dispatch(`oauth/${action}`, {
        clientId: this.$route.query['client_id'],
        responseType: this.$route.query['response_type'],
        redirectUri: this.$route.query['redirect_uri'],
        scope: this.$route.query['scope'],
        state: this.$route.query.state
      });
      this.callback(data);
    },
    callback(data) {
      if (!data) return;
      if (data.accessToken || data.errorDescription) {
        return this.$router.push({
          path: '/oauth/callback',
          query: {
            access_token: data.accessToken,
            error_description: data.errorDescription
          }
        });
      }
      window.location.assign(data);
    }
  }
};
</script>

<style scoped lang="scss">
article {
  padding: 20px 40px;
}
.highlight {
  margin: 30px 0;
}
ul {
  list-style-position: inside;
  padding: 0;
  margin: 0;
}
.empty-scope {
  color: $text-lighter;
}
.allow-button {
  width: 100px;
  margin-right: 10px;
}
.deny-button {
  background: $background-dark;
  color: #fff;
}
.footer {
  display: flex;
}
@media screen and (max-width: 640px) {
  article {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>
