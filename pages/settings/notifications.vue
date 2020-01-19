<template>
  <section>
    <setting-box>
      <template v-slot:heading>
        <icon name="mail-icon" />
        メール配信を設定
      </template>

      <div class="checkboxies">
        <label
          ><input
            v-model="receive_week_report"
            type="checkbox"
            class="checkbox"
          />週次レポートを受信する</label
        >
        <label
          ><input
            v-model="receive_month_report"
            type="checkbox"
            class="checkbox"
          />月次レポートを受信する</label
        >
      </div>
    </setting-box>
  </section>
</template>

<script>
import Heading from '@/components/atoms/heading';
import Icon from '@/components/atoms/icon';
import SettingBox from '@/components/molecules/setting-box';

export default {
  components: {
    Heading,
    SettingBox,
    Icon
  },
  data() {
    return {
      receive_week_report: true,
      receive_month_report: true
    };
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
