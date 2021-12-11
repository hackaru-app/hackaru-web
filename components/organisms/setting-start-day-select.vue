<i18n
  src="~/assets/locales/components/organisms/setting-start-day-select.json"
></i18n>

<template>
  <setting-box>
    <template #heading>
      <icon name="calendar-icon" class="icon" />
      {{ $t('title') }}
    </template>
    <base-select
      :value="$t(`startDays.${selected}`)"
      data-test-id="base-select"
      @change="change"
    >
      <option
        v-for="startDay in [0, 1, 2, 3, 4, 5, 6]"
        :key="startDay"
        :value="startDay"
        :selected="startDay === selected"
      >
        {{ $t(`startDays.${startDay}`) }}
      </option>
    </base-select>
  </setting-box>
</template>

<script>
import Icon from '~/components/atoms/icon';
import SettingBox from '~/components/molecules/setting-box';
import BaseSelect from '~/components/molecules/base-select';
import { mapGetters } from 'vuex';

export default {
  components: {
    Icon,
    BaseSelect,
    SettingBox,
  },
  computed: {
    ...mapGetters({
      selected: 'user/startDay',
    }),
  },
  methods: {
    async change(startDay) {
      const success = await this.$store.dispatch('user/update', { startDay });
      if (success) this.$store.dispatch('toast/success', this.$t('changed'));
    },
  },
};
</script>
