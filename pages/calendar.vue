<template>
  <section>
    <date-header
      ref="header"
      :date.sync="date"
      :period-index.sync="index"
      :periods="periods"
      @left="slideLeft"
      @right="slideRight"
    />

    <infinite-slider
      ref="slider"
      :disabled="sliderDisabled"
      class="slider"
      @slide-left="prev"
      @slide-right="next"
    >
      <template slot-scope="{ slideStyle }">
        <section class="sticky">
          <div :style="slideStyle" class="headers-wrapper">
            <div v-for="page in [-1, 0, 1]" :key="page" class="headers">
              <calendar-day-header
                v-for="day in getDays(period.add(date, page))"
                :day="format(day, 'YYYY-MM-DD')"
                :locale="locales[$i18n.locale]"
                :key="format(day, 'YYYY-MM-DD')"
                @click="togglePeriod"
              />
            </div>
          </div>
        </section>

        <section class="containers-wrapper">
          <section :style="slideStyle" class="containers">
            <calendar-container :days="[]" class="slider-item" />
            <calendar-container
              :days="days"
              class="slider-item"
              @ghost-drag="sliderDisabled = true"
              @ghost-drop="sliderDisabled = false"
            />
            <calendar-container :days="[]" class="slider-item" />
          </section>
        </section>
      </template>
    </infinite-slider>
  </section>
</template>

<script>
import DateHeader, { periods } from '@/components/organisms/date-header';
import InfiniteSlider from '@/components/organisms/infinite-slider';
import CalendarContainer from '@/components/organisms/calendar-container';
import CalendarDayHeader from '@/components/organisms/calendar-day-header';
import { isToday, format, addDays, eachDay } from 'date-fns';

export default {
  provide: {
    pxPerMin: 40 / 60
  },
  components: {
    InfiniteSlider,
    CalendarContainer,
    CalendarDayHeader,
    DateHeader
  },
  head: {
    title: 'Calendar'
  },
  data() {
    return {
      addDays,
      format,
      isToday,
      index: 1,
      sliderDisabled: false,
      date: format(new Date(), 'YYYY-MM-DD'),
      periods: [periods.day, periods.week],
      locales: {
        en: require('date-fns/locale/en'),
        ja: require('date-fns/locale/ja')
      }
    };
  },
  computed: {
    days() {
      return this.getDays(this.date).map(date => format(date, 'YYYY-MM-DD'));
    },
    period() {
      return this.periods[this.index];
    }
  },
  watch: {
    async date() {
      await this.fetchActivities();
    }
  },
  async mounted() {
    await this.fetchActivities();
  },
  methods: {
    async fetchActivities() {
      await this.$store.dispatch('activities/getActivities', {
        start: this.period.startOf(this.date),
        end: this.period.endOf(this.date)
      });
    },
    getDays(date) {
      return eachDay(this.period.startOf(date), this.period.endOf(date));
    },
    slideLeft() {
      this.$refs.slider.slideLeft();
    },
    slideRight() {
      this.$refs.slider.slideRight();
    },
    prev() {
      this.date = format(
        this.period.add(this.period.startOf(this.date), -1),
        'YYYY-MM-DD'
      );
    },
    next() {
      this.date = format(
        this.period.add(this.period.startOf(this.date), 1),
        'YYYY-MM-DD'
      );
    },
    togglePeriod(date) {
      this.index = (this.index + 1) % this.periods.length;
      this.date = format(date, 'YYYY-MM-DD');
    }
  }
};
</script>

<style scoped lang="scss">
.sticky {
  position: sticky;
  top: 0;
  overflow: hidden;
  z-index: index($z, calendar-day-header);
}
.headers-wrapper {
  display: flex;
  background: $background;
}
.headers {
  display: flex;
  flex-direction: row;
  background: $background;
  min-width: 100%;
  box-sizing: border-box;
  padding-left: 60px;
  border-bottom: 1px $border solid;
}
.containers-wrapper {
  overflow: hidden;
}
.containers {
  display: flex;
}
.slider-item {
  min-width: 100%;
}
@media screen and (max-width: 640px) {
  .sticky {
    top: $side-bar-min-height;
  }
  .headers {
    padding-left: 25px;
  }
}
</style>
