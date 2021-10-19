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
  background-color: $background-dark;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
  min-height: $side-bar-min-height;
  min-width: $side-bar-min-width;
  padding-left: env(safe-area-inset-left);
  position: fixed;
  z-index: index($z, side-bar);
}

.url {
  display: none;
}

h1 {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;

  a {
    align-items: center;
    display: flex;
    height: 90px;
  }

  a .logo-icon {
    color: $yellow;
    height: 20px;
    transition: filter 0.2s;
    width: 20px;
  }
}

ul {
  display: flex;
  flex-direction: column;
  list-style-position: inside;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li a {
  align-items: center;
  background-color: none;
  border: 0;
  border-left: 2px transparent solid;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 16px 0;
  padding-right: 4px;
  text-decoration: none;
  transition: all 0.1s ease;

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
    align-items: center;
    border: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    height: auto;
    justify-content: space-between;
    padding: 0 32px;
    padding-top: env(safe-area-inset-top);
    position: fixed;
    width: 100%;
  }

  h1 a {
    height: auto;
    margin-left: -22px;
    padding: 20px;
  }

  h1 a .logo-icon {
    height: 18px;
    width: 18px;
  }

  ul {
    display: flex;
    flex-direction: row;
    margin: 0;
    margin-right: -15px;
  }

  li a,
  li button {
    align-items: center;
    border: 0;
    border-radius: 99px;
    display: flex;
    height: 35px;
    justify-content: center;
    margin: 0 3px;
    padding: 0;
    vertical-align: middle;
    width: 40px;
  }

  li.selected a {
    background-color: $background-dark-hover;
  }
}
</style>
