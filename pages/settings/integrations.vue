<i18n src="~/assets/locales/pages/settings/integrations.json"></i18n>

<template>
  <section>
    <setting-box>
      <template #heading>
        <icon name="calendar-icon" />
        {{ $t('title') }}
      </template>

      <div class="calendar-buttons">
        <base-button
          class="is-rounded is-marshmallow"
          data-test-id="google-calendar-button"
          type="button"
          @click="addToGoogleCalendar"
        >
          {{ $t('googleCalendar') }}
          <icon class="is-primary" name="external-link-icon" />
        </base-button>
        <base-button
          class="is-rounded is-marshmallow"
          data-test-id="apple-calendar-button"
          type="button"
          @click="addToAppleCalendar"
        >
          {{ $t('appleCalendar') }}
          <icon class="is-primary" name="external-link-icon" />
        </base-button>
        <base-button
          class="is-rounded is-marshmallow"
          data-test-id="outlook-button"
          type="button"
          @click="addToOutlook"
        >
          {{ $t('outlook') }}
          <icon class="is-primary" name="external-link-icon" />
        </base-button>
      </div>
    </setting-box>
  </section>
</template>

<script>
import Icon from '~/components/atoms/icon';
import BaseButton from '~/components/atoms/base-button';
import SettingBox from '~/components/molecules/setting-box';
import { mapGetters } from 'vuex';

export default {
  components: {
    SettingBox,
    Icon,
    BaseButton,
  },
  computed: {
    ...mapGetters({
      googleCalendarUrl: 'activity-calendar/googleCalendarUrl',
      webcalUrl: 'activity-calendar/webcalUrl',
    }),
  },
  methods: {
    async createUrl() {
      return this.$store.dispatch('activity-calendar/createUrl');
    },
    async addToGoogleCalendar() {
      this.$mixpanel.track('Add calendar integration', {
        component: 'integrations',
        type: 'google-calendar',
      });
      this.$ga.event({
        eventCategory: 'GoogleCalendars',
        eventAction: 'add',
      });
      const childWindow = window.open('about:blank');
      if (!(await this.createUrl())) return;
      if (!childWindow.closed) {
        childWindow.location.assign(this.googleCalendarUrl);
      }
    },
    async navigateWebcal() {
      if (!(await this.createUrl())) return;
      window.location.assign(this.webcalUrl);
    },
    addToAppleCalendar() {
      this.$mixpanel.track('Add calendar integration', {
        component: 'integrations',
        type: 'apple-calendar',
      });
      this.$ga.event({
        eventCategory: 'AppleCalendars',
        eventAction: 'add',
      });
      this.navigateWebcal();
    },
    addToOutlook() {
      this.$mixpanel.track('Add calendar integration', {
        component: 'integrations',
        type: 'outlook-calendar',
      });
      this.$ga.event({
        eventCategory: 'OutlookCalendars',
        eventAction: 'add',
      });
      this.navigateWebcal();
    },
  },
};
</script>

<style scoped lang="scss">
.calendar-buttons {
  display: flex;
  flex-wrap: wrap;
  .base-button {
    display: flex;
    height: 50px;
    justify-content: space-between;
    margin: 5px 0;
    margin-right: 10px;
  }
  .icon {
    margin-left: 10px;
  }
}

@media screen and (max-width: 640px) {
  .calendar-buttons {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    .base-button {
      height: 52px;
      width: 100%;
    }
  }
}
</style>
