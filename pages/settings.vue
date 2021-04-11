<i18n src="~/assets/locales/pages/settings.json"></i18n>

<template>
  <section>
    <content-header class="content-header">
      <tabs
        :items="names"
        :index="index"
        data-test-id="tabs"
        @change="change"
      />
    </content-header>
    <nuxt-child keep-alive />
  </section>
</template>

<script>
import Tabs from '~/components/molecules/tabs';
import ContentHeader from '~/components/organisms/content-header';

const paths = ['', 'integrations', 'notifications', 'applications'];

export default {
  components: {
    ContentHeader,
    Tabs,
  },
  head: {
    title: 'Settings',
  },
  data() {
    return {
      index: paths.indexOf(this.$route.path.split('/').pop()),
      names: [
        this.$t('account'),
        this.$t('integrations'),
        this.$t('notifications'),
        this.$t('applications'),
      ],
    };
  },
  methods: {
    change(index) {
      this.$router.push(`./${paths[index]}`);
      this.index = index;
    },
  },
};
</script>

<style scoped lang="scss">
.content-header {
  background-color: $background-translucent;
}
</style>
