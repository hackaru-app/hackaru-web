<i18n src="@/assets/locales/components/organisms/side-bar.json" />

<template>
  <section :class="['menu', { android: isAndroid }]">
    <h1>
      <nuxt-link :to="localePath('index')" :aria-label="$t('ariaLabels.index')">
        <img src="@/assets/logo.svg" class="logo-icon" />
      </nuxt-link>
    </h1>
    <ul v-if="showMenu">
      <li
        v-for="link in links"
        :key="link.path"
        :class="{ selected: localePath(link.path) === $route.path }"
      >
        <nuxt-link
          :to="localePath(link.path)"
          :aria-label="$t(`ariaLabels.${link.path}`)"
        >
          <icon :name="link.icon" class="icon is-small" />
        </nuxt-link>
      </li>
    </ul>
    <button
      v-if="showMenu"
      :aria-label="$t('ariaLabels.addActivity')"
      type="button"
      class="add-button"
      @click="showNewActivityModal"
    >
      <icon name="clock-icon" class="is-primary" />
    </button>
  </section>
</template>

<script>
import Icon from '@/components/atoms/icon';

export default {
  components: {
    Icon
  },
  props: {
    showMenu: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isAndroid: false,
      links: [
        {
          path: 'index',
          icon: 'home-icon'
        },
        {
          path: 'calendar',
          icon: 'calendar-icon'
        },
        {
          path: 'reports',
          icon: 'bar-chart-icon'
        },
        {
          path: 'settings',
          icon: 'settings-icon'
        }
      ]
    };
  },
  mounted() {
    this.isAndroid = navigator.userAgent.match(/android/i);
  },
  methods: {
    showNewActivityModal() {
      this.$modal.show('activity');
    }
  }
};
</script>

<style scoped lang="scss">
.menu {
  position: fixed;
  min-width: $side-bar-min-width;
  min-height: $side-bar-min-height;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: $background-dark;
  z-index: 9;
  &::before {
    display: flex;
    position: fixed;
    min-width: $side-bar-min-width;
    content: '';
    top: -50vh;
    left: 0;
    background: $background-dark;
    z-index: -1;
    height: 200vh;
  }
  /deep/ + * {
    margin-left: $side-bar-min-width;
  }
}
h1 {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    display: flex;
    padding: 35px 0;
    padding-bottom: 20px;
  }
  a .logo-icon {
    width: 20px;
    height: 20px;
    color: $yellow;
    transition: filter 0.3s;
  }
  a:hover .logo-icon {
    filter: drop-shadow(0 0 4px rgba($yellow, 0.3));
  }
}
ul {
  display: flex;
  list-style-type: none;
  list-style-position: inside;
  flex-direction: column;
  padding: 0;
}
li a,
li button {
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  box-sizing: border-box;
  border: 0;
  border-left: 2px #00000000 solid;
  padding: 11px 0;
  margin: 5px 0;
  padding-right: 4px;
  text-decoration: none;
  background-color: none;
  .icon {
    color: $grey-f5f5f5;
  }
  &:hover {
    background-color: darken($background-dark, 5%);
    border-left-color: $red;
  }
  &:active {
    transform: scale(0.95);
  }
}
.add-button {
  position: absolute;
  bottom: 20px;
  padding: 10px;
  border: 0;
  border-radius: 50%;
  background-color: darken($background-dark, 5%);
  cursor: pointer;
  transition: all 0.3s ease;
  &:active {
    transform: scale(0.9);
  }
}
@include mq(small) {
  .menu {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: auto;
    border: 0;
    z-index: index($z, side-bar);
    padding: 0 30px;
    box-sizing: border-box;
    /deep/ + * {
      margin-left: 0;
      margin-top: $side-bar-min-height;
    }
    &::before {
      top: -60px;
      left: 0;
      height: 60.1px;
      width: 100%;
      z-index: index($z, side-bar);
    }
  }
  .menu.android {
    box-shadow: 0 1px 6px 2px #00000020;
  }
  h1 a {
    padding: 0;
  }
  h1 a .logo-icon {
    width: 18px;
    height: 18px;
  }
  ul {
    display: flex;
    margin: 0;
    flex-direction: row;
    margin-right: -14px;
  }
  li a,
  li button {
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    padding: 0;
    margin: 0 3px;
    width: 40px;
    height: 35px;
    border-radius: 99px;
    border: 0;
  }
  li.selected a {
    background-color: darken($background-dark, 5%);
  }
  .add-button {
    display: none;
  }
}
</style>
