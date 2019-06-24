<template>
  <section :class="['side-bar', { android: isAndroid }]">
    <h1>
      <nuxt-link :to="localePath('index')">
        <img src="@/assets/logo.svg" class="logo-icon" />
      </nuxt-link>
    </h1>
    <span class="url">www.hackaru.app</span>
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
          icon: 'clock-icon'
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
    this.isAndroid = this.$platform.isAndroid();
  }
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
  padding-left: env(safe-area-inset-left);
  z-index: 9;
  /deep/ + * {
    margin-left: $side-bar-min-width;
  }
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
  border-left: 2px #00000000 solid;
  padding: 16px 0;
  padding-right: 4px;
  text-decoration: none;
  background-color: none;
  .icon {
    color: $grey-f5f5f5;
  }
}
li a:hover {
  background-color: darken($background-dark, 5%);
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
    z-index: index($z, side-bar);
    padding: 0 32px;
    padding-top: env(safe-area-inset-top);
    height: auto;
    box-sizing: border-box;
    /deep/ + * {
      margin-left: 0;
      margin-top: $side-bar-min-height;
    }
  }
  .side-bar.android {
    box-shadow: 0 1px 6px 2px #00000020;
  }
  h1 a {
    padding: 0;
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
    background-color: darken($background-dark, 5%);
  }
}
@media print {
  .side-bar {
    position: static;
    width: 100%;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    min-height: auto;
    height: auto;
    background: none;
    padding: 0;
    box-sizing: border-box;
    border-radius: 3px;
    /deep/ + * {
      margin-left: 0;
    }
    &::before {
      display: none;
    }
  }
  h1 a {
    display: flex;
    align-items: center;
    margin: 0;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    background-color: $background-dark;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }
  h1 a .logo-icon {
    width: 18px;
    height: 18px;
  }
  h1 a .logo-icon svg {
    fill: rgba(0, 0, 0, 1);
  }
  h1 a {
    padding: 0;
    text-decoration: none;
  }
  ul {
    display: none;
  }
  .url {
    display: block;
    font-size: $font-size;
  }
}
</style>
