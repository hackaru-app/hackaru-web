<template>
  <base-select ref="base-select" :value="selectedLocale" @change="change">
    <option
      v-for="{ name, code } in $i18n.locales"
      :key="code"
      :value="code"
      :selected="code === $i18n.locale"
    >
      {{ name }}
    </option>
  </base-select>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseSelect from '@/components/molecules/base-select';

export default {
  components: {
    BaseSelect
  },
  computed: {
    ...mapGetters({
      loggedIn: 'auth/loggedIn'
    }),
    selectedLocale() {
      return this.$i18n.locales.find(({ code }) => this.$i18n.locale === code)
        .name;
    }
  },
  methods: {
    change(locale) {
      if (this.loggedIn) {
        this.$store.dispatch('user/update', { locale });
      } else {
        this.$i18n.setLocale(locale);
      }
    }
  }
};
</script>
