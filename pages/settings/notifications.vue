<i18n src="@/assets/locales/pages/settings/notification.json"></i18n>

<template>
  <section>
    <setting-box>
      <template v-slot:heading>
        <icon name="mail-icon" />
        {{ $t('title') }}
      </template>

      <div class="checkboxies">
        <label
          ><input
            :checked="receiveWeekReport"
            type="checkbox"
            class="checkbox"
            @change="changeReceiveWeekReport"
          />{{ $t('receiveWeekReport') }}</label
        >
        <label
          ><input
            :checked="receiveMonthReport"
            type="checkbox"
            class="checkbox"
            @change="changeReceiveMonthReport"
          />{{ $t('receiveMonthReport') }}</label
        >
      </div>
    </setting-box>
  </section>
</template>

<script>
import Heading from '@/components/atoms/heading';
import Icon from '@/components/atoms/icon';
import SettingBox from '@/components/molecules/setting-box';
import { mapGetters } from 'vuex';

export default {
  components: {
    Heading,
    SettingBox,
    Icon
  },
  computed: {
    ...mapGetters({
      receiveWeekReport: 'user/receiveWeekReport',
      receiveMonthReport: 'user/receiveMonthReport'
    })
  },
  methods: {
    changeReceiveWeekReport(e) {
      this.$store.dispatch('user/update', {
        receiveWeekReport: e.target.checked
      });
      this.$store.dispatch('toast/success', this.$t('updated'));
    },
    changeReceiveMonthReport(e) {
      this.$store.dispatch('user/update', {
        receiveMonthReport: e.target.checked
      });
      this.$store.dispatch('toast/success', this.$t('updated'));
    }
  }
};
</script>

<style scoped lang="scss">
label {
  display: flex;
  margin: 10px 0;
  align-items: center;
}
.checkbox {
  margin-right: 15px;
}
</style>
