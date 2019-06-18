<i18n src="@/assets/locales/pages/settings/licenses.json" />

<template>
  <setting-box>
    <template v-slot:heading>
      <icon v-tooltip.bottom="$t('thanks')" name="gift-icon" class="icon" />
      {{ $t('title') }}
    </template>
    <ul class="licenses">
      <li v-for="(license, key) in licenses" :key="key">
        <a :href="license.licenseUrl" target="_blank" rel="noopener">
          {{ key }}
          <span> - {{ license.licenses }}</span>
        </a>
      </li>
    </ul>
  </setting-box>
</template>

<script>
import Icon from '@/components/atoms/icon';
import Heading from '@/components/atoms/heading';
import SettingBox from '@/components/molecules/setting-box';
import licenses from '@/assets/licenses';

export default {
  components: {
    Icon,
    Heading,
    SettingBox
  },
  data() {
    return {
      licenses
    };
  }
};
</script>

<style scoped lang="scss">
.licenses {
  padding: 0;
  margin: 0;
  list-style-type: disc;
  list-style-position: inside;
}
.licenses a {
  text-decoration: none;
  color: $text;
  &:hover {
    text-decoration: underline;
  }
  span {
    padding: 0;
    margin: 0;
    color: $text-light;
  }
}
</style>
