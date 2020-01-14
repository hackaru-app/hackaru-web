<template>
  <section>
    <setting-box>
      <template v-slot:heading>
        <icon name="mail-icon" />
        メール配信設定
      </template>

      <div class="checkboxies">
        <p><base-checkbox class="checkbox" />週次レポートを受信</p>
        <p><base-checkbox class="checkbox" />月次レポートを受信</p>
      </div>
    </setting-box>
  </section>
</template>

<script>
import Heading from '@/components/atoms/heading';
import Icon from '@/components/atoms/icon';
import BaseCheckbox from '@/components/atoms/base-checkbox';
import SettingBox from '@/components/molecules/setting-box';

export default {
  components: {
    Heading,
    BaseCheckbox,
    SettingBox,
    Icon
  }
};
</script>

<style scoped lang="scss">
.checkbox {
  margin-right: 20px;
}
</style>
