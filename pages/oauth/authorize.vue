<i18n src="~/assets/locales/common/scopes.json"></i18n>
<i18n src="~/assets/locales/pages/oauth/authorize.json"></i18n>

<template>
  <section>
    <login-guard />
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
            class="allow-button is-rounded is-primary"
            data-test-id="allow-button"
            @click="decide('allow')"
          >
            {{ $t('allow') }}
          </base-button>
          <base-button
            type="button"
            class="is-rounded is-dark"
            data-test-id="deny-button"
            @click="decide('deny')"
          >
            {{ $t('deny') }}
          </base-button>
        </footer>
      </article>
    </div>
  </section>
</template>

<script>
import LoginGuard from '~/components/atoms/login-guard';
import Heading from '~/components/atoms/heading';
import BaseButton from '~/components/atoms/base-button';
import ContentHeader from '~/components/organisms/content-header';
import Highlight from '~/components/atoms/highlight';
import { mapGetters } from 'vuex';

function extractQuery(query) {
  return {
    clientId: query.client_id,
    responseType: query.response_type,
    redirectUri: query.redirect_uri,
    scope: query.scope,
    state: query.state,
    codeChallenge: query.code_challenge,
    codeChallengeMethod: query.code_challenge_method,
  };
}

export default {
  components: {
    LoginGuard,
    ContentHeader,
    BaseButton,
    Heading,
    Highlight,
  },
  layout: 'auth',
  head: {
    title: 'Authorize',
  },
  computed: {
    ...mapGetters({
      decided: 'oauth/decided',
      redirectUri: 'oauth/redirectUri',
      redirectQuery: 'oauth/redirectQuery',
      client: 'oauth/client',
      email: 'auth/email',
    }),
  },
  watch: {
    decided() {
      if (this.decided) {
        this.callback();
      }
    },
  },
  mounted() {
    const query = extractQuery(this.$route.query);
    this.$store.dispatch('oauth/fetchClient', query);
  },
  methods: {
    decide(action) {
      this.$mixpanel.track('Decide oauth authorization', {
        component: 'authorize',
        action,
      });
      this.$ga.event({
        eventCategory: 'OAuth',
        eventAction: action,
      });
      const query = extractQuery(this.$route.query);
      this.$store.dispatch(`oauth/${action}`, query);
    },
    callback() {
      if (this.redirectUri) {
        window.location.assign(this.redirectUri);
      } else {
        this.$router.push({
          path: this.localePath('oauth/callback'),
          query: this.redirectQuery,
        });
      }
    },
  },
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
  margin: 0;
  padding: 0;
}

.empty-scope {
  color: $text-lighter;
}

.allow-button {
  margin-right: 10px;
  width: 100px;
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
