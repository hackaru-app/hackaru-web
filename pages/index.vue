<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section>
    <content-header>
      <heading>{{ $t('title') }}</heading>
      <base-button
        type="button"
        class="is-primary is-circle has-dropshadow add-button"
        @click="showModal"
      >
        <icon name="plus-icon" />
      </base-button>
    </content-header>
    <activity
      v-for="activity in activities"
      :key="activity.id"
      v-bind="activity"
    />
    <p v-if="activities.length <= 0" class="empty">
      {{ $t('empty') }}
    </p>
  </section>
</template>

<script>
import ContentHeader from '@/components/organisms/content-header';
import Heading from '@/components/atoms/heading';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import Activity from '@/components/organisms/activity';
import { mapGetters } from 'vuex';

export default {
  components: {
    ContentHeader,
    Heading,
    Icon,
    BaseButton,
    Activity
  },
  head: {
    title: 'Timers'
  },
  computed: {
    ...mapGetters({
      activities: 'activities/getWorkingActivities'
    })
  },
  async mounted() {
    await this.$store.dispatch('activities/getWorkingActivities');
  },
  methods: {
    showModal() {
      this.$modal.show('activity');
    }
  }
};
</script>

<style scoped lang="scss">
.empty {
  display: flex;
  padding: 20px 40px;
  color: $text-light;
}
.add-button {
  margin-right: -5px;
}
@include mq(small) {
  .empty {
    flex: 1;
    justify-content: center;
    width: 100%;
    padding: 20px 0;
  }
}
</style>
