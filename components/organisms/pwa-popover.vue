<i18n src="~/assets/locales/components/organisms/pwa-popover.json"></i18n>

<template>
  <section class="pwa-popover">
    <v-popover :open="opened" data-test-id="popover" class="popover">
      <span class="tooltip-target" />
      <template slot="popover">
        <div class="content">
          <section class="logo">
            <img src="~/assets/images/logo.svg" class="logo-icon" />
          </section>
          <section class="about">
            <h1>{{ $t('title') }}</h1>
            <i18n path="about" tag="p">
              <icon name="share-icon" class="share-icon" />
            </i18n>
          </section>
        </div>
      </template>
    </v-popover>
  </section>
</template>

<script>
import Icon from '~/components/atoms/icon';

export default {
  timers: {
    hide: {
      time: 10000,
      autostart: true,
    },
  },
  components: {
    Icon,
  },
  data() {
    return {
      opened: false,
    };
  },
  mounted() {
    const learned = localStorage.getItem('pwaPopover');
    const pwa = this.$platform.isPWA();
    const ios = this.$platform.isIOS();
    this.opened = !learned && !pwa && ios;
  },
  methods: {
    hide() {
      this.opened = false;
      localStorage.setItem('pwaPopover', true);
    },
  },
};
</script>

<style scoped lang="scss">
.pwa-popover {
  display: flex;
  justify-content: center;
  width: 100%;
}
.popover {
  position: absolute;
  right: 140px;
  top: 0;
  z-index: index($z, pwa-popover);
}
.content {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 20px;
  position: relative;
}
.logo {
  align-items: center;
  background: $background-dark;
  border-radius: 3px;
  display: flex;
  flex-shrink: 0;
  height: 56px;
  justify-content: center;
  margin-right: 20px;
  width: 56px;
  .logo-icon {
    height: 20px;
    width: 20px;
  }
}
.about {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1px;
  h1 {
    font-size: $font-size;
    font-weight: normal;
    margin: 0;
    padding: 0;
  }
  p {
    color: $grey-666;
    display: flex;
    font-size: 13px;
    margin: 0;
    padding: 0;
    padding-right: 10px;
  }
}
.share-icon {
  height: 16px;
  margin-right: 5px;
  width: 16px;
}

@include mq(small) {
  .popover {
    bottom: 15px;
    right: auto;
    top: auto;
  }
}
</style>
