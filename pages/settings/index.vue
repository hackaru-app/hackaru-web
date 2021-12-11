<template>
  <section>
    <setting-email-editor />
    <setting-password-editor />
    <setting-locale-select />
    <setting-time-zone-select />
    <setting-start-day-select />
    <setting-logout-button />
    <setting-delete-account-button />
  </section>
</template>

<script>
import SettingEmailEditor from '~/components/organisms/setting-email-editor';
import SettingPasswordEditor from '~/components/organisms/setting-password-editor';
import SettingLocaleSelect from '~/components/organisms/setting-locale-select';
import SettingTimeZoneSelect from '~/components/organisms/setting-time-zone-select';
import SettingStartDaySelect from '~/components/organisms/setting-start-day-select';
import SettingLogoutButton from '~/components/organisms/setting-logout-button';
import SettingDeleteAccountButton from '~/components/organisms/setting-delete-account-button';

export default {
  components: {
    SettingEmailEditor,
    SettingPasswordEditor,
    SettingTimeZoneSelect,
    SettingStartDaySelect,
    SettingLocaleSelect,
    SettingLogoutButton,
    SettingDeleteAccountButton,
  },
};
</script>
