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

    <section class="activity-group">
      <header class="activity-header">
        今日
      </header>
      <activity
        :id="1"
        :duration="3600"
        :project="{ id: 1, name: '開発', color: '#f00' }"
        description="テスト"
        started-at="2018-12-01T01:23:45"
        stopped-at="2018-12-01T01:23:45"
      />
    </section>

    <section class="activity-group">
      <header class="activity-header">
        昨日
      </header>
      <activity
        :id="1"
        :duration="3600"
        :project="{ id: 1, name: '開発', color: '#f00' }"
        description="テスト"
        started-at="2018-12-01T01:23:45"
        stopped-at="2018-12-01T01:23:45"
      />
      <activity
        :id="1"
        :duration="3600"
        :project="{ id: 1, name: '開発', color: '#f00' }"
        description="テスト"
        started-at="2018-12-01T01:23:45"
        stopped-at="2018-12-01T01:23:45"
      />
      <activity
        :id="1"
        :duration="3600"
        :project="{ id: 1, name: '開発', color: '#f00' }"
        description="テスト"
        started-at="2018-12-01T01:23:45"
        stopped-at="2018-12-01T01:23:45"
      />
    </section>

    <header class="activity-header">
      日曜日
    </header>
    <p class="empty-activity"></p>

    <header class="activity-header">
      土曜日
    </header>
    <p class="empty-activity"></p>

    <header class="activity-header">
      金曜日
    </header>
    <p class="empty-activity"></p>

    <header class="activity-header">
      木曜日
    </header>
    <p class="empty-activity"></p>

    <header class="activity-header">
      木曜日
    </header>
    <p class="empty-activity"></p>

    <header class="activity-header">
      木曜日
    </header>
    <p class="empty-activity"></p>

    <header class="activity-header">
      木曜日
    </header>
    <p class="empty-activity"></p>
  </section>
</template>

<script>
import Dot from '@/components/atoms/dot';
import ContentHeader from '@/components/organisms/content-header';
import Heading from '@/components/atoms/heading';
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import Activity from '@/components/organisms/activity';
import { mapGetters } from 'vuex';

export default {
  components: {
    Dot,
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
      activities: 'activities/workings'
    })
  },
  mounted() {
    this.$store.dispatch('activities/fetchWorkings');
  },
  methods: {
    showModal() {
      this.$modal.show('activity');
    }
  }
};
</script>

<style scoped lang="scss">
.activity-header {
  align-items: center;
  background-color: $grey-fafafa;
  padding: 5px 40px;
  padding-top: 6px;
  color: $text-light;
  border-bottom: 1px $border solid;
  .dot {
    margin-right: 5px;
  }
}
.empty-activity {
  padding: 0 40px;
  margin: 0;
  display: flex;
  align-items: center;
  height: 65px;
  border-bottom: 1px $border solid;
}
.empty {
  display: flex;
  padding: 20px 40px;
  color: $text-light;
}
.add-button {
  margin-right: -5px;
}
@include mq(small) {
  .activity-header {
    padding-left: 30px;
    padding-right: 30px;
  }
  .empty {
    flex: 1;
    justify-content: center;
    width: 100%;
    padding: 20px 0;
  }
}
</style>
