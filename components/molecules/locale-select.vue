<template>
  <marshmallow-select
    ref="select"
    :value="locales[$i18n.locale]"
    aria-label="Locales"
    @input="change"
  >
    <option
      v-for="(locale, key) in locales"
      :key="key"
      :value="key"
      :selected="key === $i18n.locale"
    >
      {{ locale }}
    </option>
  </marshmallow-select>
</template>

<script>
import MarshmallowSelect from '@/components/molecules/marshmallow-select';

export default {
  components: {
    MarshmallowSelect
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
