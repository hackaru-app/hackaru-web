<i18n src="@/assets/locales/components/molecules/locale-select.json"></i18n>

<template>
  <base-select
    ref="base-select"
    :value="locales[$i18n.locale]"
    @change="change"
  >
    <option
      v-for="(locale, key) in locales"
      :key="key"
      :value="key"
      :selected="key === $i18n.locale"
    >
      {{ locale }}
    </option>
  </base-select>
</template>

<script>
import BaseSelect from '@/components/molecules/base-select';

export default {
  components: {
    BaseSelect
  },
  data() {
    return {
      locales: {
        en: 'English',
        ja: '日本語'
      }
    };
  },
  methods: {
    async change(locale) {
      const success = await this.$store.dispatch('user/update', { locale });
      if (success) this.$store.dispatch('toast/success', this.$t('changed'));
    }
  }
};
</script>
