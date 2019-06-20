<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section class="index">
    <content-header>
      <heading>Timers</heading>
      <tutorial-tooltip
        :offset="10"
        :content="$t('startTimer')"
        name="start-activity"
        placement="bottom"
      >
        <base-button
          type="button"
          class="is-primary is-circle add-button"
          @click="showModal"
        >
          <icon name="plus-icon" class="icon" />
        </base-button>
      </tutorial-tooltip>
    </content-header>
    <activity
      v-for="(activity, index) in activities"
      :key="activity.id"
      v-bind="activity"
      :class="{ tutorial: !activity.stoppedAt && index === 0 }"
    />
    <p v-if="activities.length <= 0" class="empty-message">
      {{ $t('empty') }}
    </p>
  </section>
</template>

<script>
import Dot from '@/components/atoms/dot';
import ProjectName from '@/components/molecules/project-name';
import TutorialTooltip from '@/components/atoms/tutorial-tooltip';
import ContentHeader from '@/components/organisms/content-header';
import Heading from '@/components/atoms/heading';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import Activity from '@/components/organisms/activity';
import { addDays } from 'date-fns';

export default {
  components: {
    Dot,
    TutorialTooltip,
    ContentHeader,
    ProjectName,
    Heading,
    Icon,
    BaseButton,
    Activity
  },
  head: {
    title: 'Timers'
  },
  data() {
    return {
      addDays
    };
  },
  computed: {
    activities() {
      return [
        ...this.$store.getters['activities/workings'],
        ...this.$store.getters['activities/weekly']
      ];
    }
  },
  mounted() {
    this.$store.dispatch('activities/fetchWorkings');
    this.$store.dispatch('activities/fetchByRange', {
      start: addDays(new Date(), -7),
      end: new Date()
    });
  },
  methods: {
    showModal() {
      this.$modal.show('activity');
    }
  }
};
</script>

<style scoped lang="scss">
.empty-message {
  margin-top: 45px;
  justify-content: center;
  display: flex;
  width: 100%;
  color: $text-lighter;
}
</style>
