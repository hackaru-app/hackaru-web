<template>
  <base-select :value="locales[$i18n.locale]" @change="change">
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
    change(locale) {
      this.$router.push(this.switchLocalePath(locale));
    }
  }
};
</script>
