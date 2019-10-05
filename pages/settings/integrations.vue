<i18n src="@/assets/locales/pages/settings/integrations.json" />

<template>
  <section>
    <setting-box>
      <template v-slot:heading>
        <heading class="is-small">
          <icon name="calendar-icon" />
          {{ $t('title') }}
        </heading>
      </template>

      <div class="calendar-buttons">
        <base-button class="is-rounded is-marshmallow" type="button">
          {{ $t('googleCalendar') }}
        </base-button>
        <base-button class="is-rounded is-marshmallow" type="button">
          {{ $t('appleCalendar') }}
        </base-button>
        <base-button class="is-rounded is-marshmallow" type="button">
          {{ $t('outlook') }}
        </base-button>
      </div>
    </setting-box>
  </section>
</template>

<script>
import Heading from '@/components/atoms/heading';
import Icon from '@/components/atoms/icon';
import BaseInput from '@/components/atoms/base-input';
import BaseButton from '@/components/atoms/base-button';
import SettingBox from '@/components/molecules/setting-box';

export default {
  components: {
    Heading,
    BaseInput,
    SettingBox,
    Icon,
    BaseButton
  }
};
</script>

<style scoped lang="scss">
.calendar-buttons {
  display: flex;
  button {
    margin-right: 10px;
  }
  .icon {
    margin-right: 3px;
  }
}
</style>
