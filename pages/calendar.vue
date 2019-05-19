<template>
  <section>
    <date-header
      ref="header"
      :date.sync="date"
      :current-period.sync="currentPeriod"
      :allow-periods="['day', 'week']"
      @left="slideLeft"
      @right="slideRight"
    />

    <infinite-slider
      ref="slider"
      :enabled="sliderEnabled"
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
                :key="format(day, 'YYYY-MM-DD')"
              />
            </div>
          </div>
        </section>

        <section class="contents-wrapper">
          <section :style="slideStyle" class="contents">
            <calendar-content :days="[]" class="slider-item" />
            <calendar-content
              :days="days"
              class="slider-item"
              @dragging="sliderEnabled = false"
              @drop="sliderEnabled = true"
            />
            <calendar-content :days="[]" class="slider-item" />
          </section>
        </section>
      </template>
    </infinite-slider>
  </section>
</template>

<script>
import DateHeader from '@/components/organisms/date-header';
import InfiniteSlider from '@/components/organisms/infinite-slider';
import CalendarContent from '@/components/organisms/calendar-content';
import CalendarDayHeader from '@/components/organisms/calendar-day-header';
import { isToday, format, addDays, eachDay } from 'date-fns';

export default {
  provide: {
    pxPerMin: 40 / 60
  },
  components: {
    InfiniteSlider,
    CalendarContent,
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
      sliderEnabled: true,
      date: format(new Date(), 'YYYY-MM-DD'),
      currentPeriod: 'day'
    };
  },
  computed: {
    days() {
      return this.getDays(this.date).map(date => format(date, 'YYYY-MM-DD'));
    },
    period() {
      return this.$periods[this.currentPeriod];
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
.contents-wrapper {
  overflow: hidden;
}
.contents {
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
