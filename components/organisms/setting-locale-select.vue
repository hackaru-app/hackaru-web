<i18n src="@/assets/locales/pages/settings/index.json" />

<template>
  <setting-box>
    <template v-slot:heading>
      <icon name="globe-icon" class="icon" />
      {{ $t('titles.language') }}
    </template>
    <locale-select />
  </setting-box>
</template>

<script>
import Icon from '@/components/atoms/icon';
import LocaleSelect from '@/components/molecules/locale-select';
import SettingBox from '@/components/molecules/setting-box';

export default {
  components: {
    Icon,
    LocaleSelect,
    SettingBox
  }
};
</script>
