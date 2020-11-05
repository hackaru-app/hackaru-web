<template>
  <transition>
    <div
      v-show="shown"
      class="suggestions-wrapper"
      data-test-id="suggestions-wrapper"
    >
      <div ref="suggestions" class="suggestions">
        <ul>
          <li
            v-for="(suggestion, index) in suggestions"
            :key="index"
            data-test-id="suggestion"
            @click="click(suggestion)"
          >
            <activity-name v-bind="suggestion" />
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import ActivityName from '@/components/molecules/activity-name';
import { mapGetters } from 'vuex';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import debounce from 'lodash.debounce';

export default {
  components: {
    ActivityName,
  },
  props: {
    shown: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      suggestions: 'suggestions/all',
    }),
  },
  watch: {
    shown() {
      if (this.shown) {
        disableBodyScroll(this.$refs.suggestions);
      } else {
        enableBodyScroll(this.$refs.suggestions);
      }
    },
    description: {
      immediate: true,
      handler() {
        this.fetchSuggestions();
      },
    },
  },
  deactivated() {
    enableBodyScroll(this.$refs.suggestions);
  },
  methods: {
    click(suggestion) {
      this.$emit('click', suggestion);
    },
    fetchSuggestions: debounce(async function () {
      this.$store.dispatch('suggestions/fetch', this.description);
      this.$refs.suggestions.scrollTo({ top: 0 });
    }, 1000),
  },
};
</script>

<style scoped lang="scss">
.suggestions-wrapper {
  position: absolute;
  animation-duration: 100ms;
  width: 100%;
  height: 100vh;
  top: 91px;
  box-sizing: border-box;
  max-width: calc(100vw - #{$side-bar-min-width});
  background-color: $backdrop-color;
}
.suggestions {
  overflow-y: scroll;
  box-sizing: border-box;
  background-color: $background;
  overflow: hidden;
  overflow-y: scroll;
  box-shadow: 0 3px 5px $shadow-darker;
  -webkit-overflow-scrolling: touch;
  max-height: 415px;
}
.suggestions ul {
  margin: 0;
  padding: 0;
}
.suggestions ul li {
  display: flex;
  cursor: pointer;
  list-style-position: inside;
  list-style-type: none;
  text-align: center;
  align-items: center;
  height: 65px;
  padding: 0 45px;
  border-bottom: 1px $border solid;
  transition: background-color 0.1s ease;
  &:hover {
    background-color: $background-hover;
  }
  &:last-child {
    border-bottom: 0;
  }
}
@include mq(small) {
  .suggestions-wrapper {
    position: absolute;
    top: 80px;
    border: 0;
    margin: 0;
    padding: 0;
    max-width: 100vw;
    width: 100%;
    background: none;
  }
  .suggestions {
    border-radius: 0;
    height: 100vh;
    border-top: 0;
    border-left: 0;
    margin: 0;
    max-width: 100vw;
    background-color: $background-translucent;
    max-height: 100%;
    padding-bottom: 550px;
  }
  .suggestions ul {
    min-height: 130vh;
  }
  .suggestions ul li {
    height: 75px;
    padding: 0 35px;
    border-bottom: 1px $border solid;
    border-radius: 0;
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      border-bottom: 1px $border solid;
      padding-bottom: 0;
    }
    &:hover {
      background: none;
    }
  }
}
</style>
