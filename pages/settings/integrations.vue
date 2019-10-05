<i18n src="@/assets/locales/pages/settings/integrations.json" />

<template>
  <section>
    <setting-box>
      <template v-slot:heading>
        <icon name="calendar-icon" />
        {{ $t('title') }}
      </template>

      <div class="calendar-buttons">
        <base-button
          class="google-calendar-button is-rounded is-marshmallow"
          type="button"
          @click="addGoogleCalendar"
        >
          {{ $t('googleCalendar') }}
          <icon name="external-link-icon" />
        </base-button>
        <base-button
          class="apple-calendar-button is-rounded is-marshmallow"
          type="button"
          @click="addOtherCalendar"
        >
          {{ $t('appleCalendar') }}
          <icon name="external-link-icon" />
        </base-button>
        <base-button
          class="outlook-button is-rounded is-marshmallow"
          type="button"
          @click="addOtherCalendar"
        >
          {{ $t('outlook') }}
          <icon name="external-link-icon" />
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
import { mapGetters } from 'vuex';

export default {
  components: {
    Heading,
    BaseInput,
    SettingBox,
    Icon,
    BaseButton
  },
  computed: {
    ...mapGetters({
      googleCalendarUrl: 'activity-calendar/googleCalendarUrl',
      webcalUrl: 'activity-calendar/webcalUrl'
    })
  },
  methods: {
    async createUrl() {
      return this.$store.dispatch('activity-calendar/createUrl');
    },
    async addGoogleCalendar() {
      const childWindow = window.open('about:blank');
      if (!(await this.createUrl())) return;
      childWindow.location.assign(this.googleCalendarUrl);
    },
    async addOtherCalendar() {
      if (!(await this.createUrl())) return;
      window.location.assign(this.webcalUrl);
    }
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
    margin-left: 5px;
  }
}
</style>
