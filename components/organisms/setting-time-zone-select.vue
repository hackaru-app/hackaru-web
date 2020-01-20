<i18n
  src="@/assets/locales/components/organisms/setting-time-zone-select.json"
></i18n>

<template>
  <setting-box>
    <template v-slot:heading>
      <icon name="map-pin-icon" class="icon" />
      {{ $t('title') }}
    </template>
    <base-select ref="base-select" :value="selected" @change="change">
      <option
        v-for="timeZone in timeZones"
        :key="timeZone"
        :value="timeZone"
        :selected="timeZone === selected"
      >
        {{ timeZone }}
      </option>
    </base-select>
  </setting-box>
</template>

<script>
import Icon from '@/components/atoms/icon';
import SettingBox from '@/components/molecules/setting-box';
import BaseSelect from '@/components/molecules/base-select';
import { mapGetters } from 'vuex';

export default {
  components: {
    Icon,
    BaseSelect,
    SettingBox
  },
  props: {
    timeZones: {
      type: Array,
      required: false,
      default() {
        return [
          'Etc/GMT+12',
          'Pacific/Midway',
          'Pacific/Pago_Pago',
          'Pacific/Honolulu',
          'America/Juneau',
          'America/Los_Angeles',
          'America/Tijuana',
          'America/Denver',
          'America/Phoenix',
          'America/Chihuahua',
          'America/Mazatlan',
          'America/Chicago',
          'America/Regina',
          'America/Mexico_City',
          'America/Monterrey',
          'America/Guatemala',
          'America/New_York',
          'America/Indiana/Indianapolis',
          'America/Bogota',
          'America/Lima',
          'America/Halifax',
          'America/Caracas',
          'America/La_Paz',
          'America/Santiago',
          'America/St_Johns',
          'America/Sao_Paulo',
          'America/Argentina/Buenos_Aires',
          'America/Montevideo',
          'America/Guyana',
          'America/Puerto_Rico',
          'America/Godthab',
          'Atlantic/South_Georgia',
          'Atlantic/Azores',
          'Atlantic/Cape_Verde',
          'Europe/Dublin',
          'Europe/London',
          'Europe/Lisbon',
          'Africa/Casablanca',
          'Africa/Monrovia',
          'Etc/UTC',
          'Europe/Belgrade',
          'Europe/Bratislava',
          'Europe/Budapest',
          'Europe/Ljubljana',
          'Europe/Prague',
          'Europe/Sarajevo',
          'Europe/Skopje',
          'Europe/Warsaw',
          'Europe/Zagreb',
          'Europe/Brussels',
          'Europe/Copenhagen',
          'Europe/Madrid',
          'Europe/Paris',
          'Europe/Amsterdam',
          'Europe/Berlin',
          'Europe/Zurich',
          'Europe/Rome',
          'Europe/Stockholm',
          'Europe/Vienna',
          'Africa/Algiers',
          'Europe/Bucharest',
          'Africa/Cairo',
          'Europe/Helsinki',
          'Europe/Kiev',
          'Europe/Riga',
          'Europe/Sofia',
          'Europe/Tallinn',
          'Europe/Vilnius',
          'Europe/Athens',
          'Europe/Istanbul',
          'Europe/Minsk',
          'Asia/Jerusalem',
          'Africa/Harare',
          'Africa/Johannesburg',
          'Europe/Kaliningrad',
          'Europe/Moscow',
          'Europe/Volgograd',
          'Europe/Samara',
          'Asia/Kuwait',
          'Asia/Riyadh',
          'Africa/Nairobi',
          'Asia/Baghdad',
          'Asia/Tehran',
          'Asia/Muscat',
          'Asia/Baku',
          'Asia/Tbilisi',
          'Asia/Yerevan',
          'Asia/Kabul',
          'Asia/Yekaterinburg',
          'Asia/Karachi',
          'Asia/Tashkent',
          'Asia/Kolkata',
          'Asia/Kathmandu',
          'Asia/Dhaka',
          'Asia/Colombo',
          'Asia/Almaty',
          'Asia/Novosibirsk',
          'Asia/Rangoon',
          'Asia/Bangkok',
          'Asia/Jakarta',
          'Asia/Krasnoyarsk',
          'Asia/Shanghai',
          'Asia/Chongqing',
          'Asia/Hong_Kong',
          'Asia/Urumqi',
          'Asia/Kuala_Lumpur',
          'Asia/Singapore',
          'Asia/Taipei',
          'Australia/Perth',
          'Asia/Irkutsk',
          'Asia/Ulaanbaatar',
          'Asia/Seoul',
          'Asia/Tokyo',
          'Asia/Yakutsk',
          'Australia/Darwin',
          'Australia/Adelaide',
          'Australia/Melbourne',
          'Australia/Sydney',
          'Australia/Brisbane',
          'Australia/Hobart',
          'Asia/Vladivostok',
          'Pacific/Guam',
          'Pacific/Port_Moresby',
          'Asia/Magadan',
          'Asia/Srednekolymsk',
          'Pacific/Guadalcanal',
          'Pacific/Noumea',
          'Pacific/Fiji',
          'Asia/Kamchatka',
          'Pacific/Majuro',
          'Pacific/Auckland',
          'Pacific/Tongatapu',
          'Pacific/Fakaofo',
          'Pacific/Chatham',
          'Pacific/Apia'
        ];
      }
    }
  },
  computed: {
    ...mapGetters({
      selected: 'user/timeZone'
    })
  },
  methods: {
    async change(timeZone) {
      const success = await this.$store.dispatch('user/update', { timeZone });
      if (success) this.$store.dispatch('toast/success', this.$t('changed'));
    }
  }
};
</script>
