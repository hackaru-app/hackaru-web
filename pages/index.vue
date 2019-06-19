<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section>
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
      v-for="(activity, index) in workings"
      :key="activity.id"
      v-bind="activity"
      :class="{ tutorial: index === 0 }"
    />
    <activity-day
      v-for="prev in [0, 1, 2, 3, 4, 5, 6]"
      :key="prev"
      :day="`${addDays(new Date(), -prev)}`"
    />
    <div v-if="workings.length <= 0" class="empty-message">
      <icon name="zap-icon" class="is-x-large" />
      <p>ようこそ。時間管理を始めましょう！</p>
    </div>
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
import ActivityDay from '@/components/organisms/activity-day';
import Activity from '@/components/organisms/activity';
import { mapGetters } from 'vuex';
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
    ActivityDay,
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
    ...mapGetters({
      workings: 'activities/workings'
    })
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
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  text-align: center;
  box-sizing: border-box;
  color: $text-lighter;
  animation-duration: 2s;
  .icon {
    margin-right: 10px;
  }
}
@include mq(small) {
  .empty-message {
    flex-direction: column;
    .icon {
      margin: 0;
    }
  }
}
</style>
