<template>
  <transition>
    <div
      v-show="shown"
      class="suggestions-wrapper"
      data-test-id="suggestions-wrapper"
    >
      <div ref="suggestions" v-scroll-lock="shown" class="suggestions">
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
import ActivityName from '~/components/molecules/activity-name';
import { mapGetters } from 'vuex';
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
    description() {
      this.fetchSuggestions();
    },
    shown: {
      immediate: true,
      handler() {
        if (this.shown) {
          this.fetchSuggestions();
        }
      },
    },
  },
  mounted() {
    this.fetchSuggestions();
  },
  methods: {
    click(suggestion) {
      this.$emit('click', suggestion);
    },
    fetchSuggestions: debounce(function () {
      this.$store.dispatch('suggestions/fetch', this.description);
    }, 1000),
  },
};
</script>

<style scoped lang="scss">
.suggestions-wrapper {
  animation-duration: 100ms;
  background-color: $backdrop-color;
  box-sizing: border-box;
  height: 100vh;
  max-width: calc(100vw - #{$side-bar-min-width});
  position: absolute;
  top: 91px;
  width: 100%;
}

.suggestions {
  background-color: $background;
  box-shadow: 0 3px 5px $shadow-darker;
  box-sizing: border-box;
  max-height: 415px;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
}

.suggestions ul {
  margin: 0;
  padding: 0;
}

.suggestions ul li {
  align-items: center;
  border-bottom: 1px $border solid;
  cursor: pointer;
  display: flex;
  height: 65px;
  list-style-position: inside;
  list-style-type: none;
  padding: 0 45px;
  text-align: center;
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
    background: none;
    border: 0;
    margin: 0;
    max-width: 100vw;
    padding: 0;
    position: absolute;
    top: 80px;
    width: 100%;
  }

  .suggestions {
    background-color: $background-translucent;
    border-left: 0;
    border-radius: 0;
    border-top: 0;
    height: 100vh;
    margin: 0;
    max-height: 100%;
    max-width: 100vw;
    padding-bottom: 550px;
  }

  .suggestions ul {
    min-height: 130vh;
  }

  .suggestions ul li {
    border-bottom: 1px $border solid;
    border-radius: 0;
    height: 75px;
    padding: 0 35px;

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
