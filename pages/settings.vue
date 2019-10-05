<i18n src="@/assets/locales/pages/settings.json" />

<template>
  <section>
    <content-header>
      <tabs :items="names" :index="index" class="tabs" @change="change" />
    </content-header>
    <nuxt-child keep-alive />
  </section>
</template>

<script>
import Tabs from '@/components/molecules/tabs';
import ContentHeader from '@/components/organisms/content-header';

export default {
  components: {
    ContentHeader,
    Tabs
  },
  head: {
    title: 'Settings'
  },
  data() {
    return {
      names: [
        this.$t('account'),
        this.$t('integrations'),
        this.$t('applications'),
        this.$t('webhooks'),
        this.$t('licenses')
      ],
      paths: ['', 'integrations', 'applications', 'webhooks', 'licenses']
    };
  },
  computed: {
    index() {
      return this.paths.indexOf(this.$route.path.split('/').pop());
    }
  },
  methods: {
    change(index) {
      this.$router.push(`./${this.paths[index]}`);
    }
  }
};
</script>
