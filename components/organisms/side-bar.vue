<template>
  <section class="side-bar">
    <h1>
      <nuxt-link :to="localePath('index')">
        <img src="~/assets/images/logo.svg" class="logo-icon" />
      </nuxt-link>
    </h1>
    <ul v-if="showMenu">
      <li
        v-for="link in links"
        :key="link.path"
        :class="{ selected: localePath(link.path) === $route.path }"
      >
        <nuxt-link :to="localePath(link.path)">
          <icon :name="link.icon" class="icon is-small" />
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import Icon from '~/components/atoms/icon';

export default {
  components: {
    Icon,
  },
  props: {
    showMenu: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      links: [
        {
          path: 'index',
          icon: 'clock-icon',
        },
        {
          path: 'calendar',
          icon: 'calendar-icon',
        },
        {
          path: 'reports',
          icon: 'bar-chart-icon',
        },
        {
          path: 'settings',
          icon: 'settings-icon',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.side-bar {
  position: fixed;
  min-width: $side-bar-min-width;
  min-height: $side-bar-min-height;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  background-color: $background-dark;
  z-index: index($z, side-bar);
  padding-left: env(safe-area-inset-left);
}
.url {
  display: none;
}
h1 {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    height: 90px;
  }
  a .logo-icon {
    width: 20px;
    height: 20px;
    color: $yellow;
    transition: filter 0.2s;
  }
}
ul {
  display: flex;
  list-style-type: none;
  list-style-position: inside;
  flex-direction: column;
  padding: 0;
  margin: 0;
}
li a {
  cursor: pointer;
  transition: all 0.1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 0;
  border-left: 2px transparent solid;
  padding: 16px 0;
  padding-right: 4px;
  text-decoration: none;
  background-color: none;
  .icon {
    color: $grey-f5f5f5;
  }
}
li a:hover {
  background-color: $background-dark-hover;
}
li.selected a {
  border-left-color: $red;
}
li:first-child a {
  margin-top: 0;
}
@include mq(small) {
  .side-bar {
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: 0;
    padding: 0 32px;
    padding-top: env(safe-area-inset-top);
    height: auto;
    box-sizing: border-box;
  }
  h1 a {
    padding: 20px;
    margin-left: -22px;
    height: auto;
  }
  h1 a .logo-icon {
    width: 18px;
    height: 18px;
  }
  ul {
    display: flex;
    margin: 0;
    flex-direction: row;
    margin-right: -15px;
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
    background-color: $background-dark-hover;
  }
}
</style>
