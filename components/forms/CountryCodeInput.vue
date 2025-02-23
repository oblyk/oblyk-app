<template>
  <v-select
    v-model="countryCode"
    :items="countryCodes"
    item-text="text"
    item-value="value"
    :label="$t('components.input.countryCode')"
    filled
    class="rounded-sm mb-1"
    :color="color"
    :dense="dense"
    :hide-details="hideDetails"
    @change="onChange"
  />
</template>

<script>

export default {
  name: 'CountryCodeInput',
  props: {
    value: {
      type: String,
      default: null
    },
    dense: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: true
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    }
  },

  data () {
    return {
      countryCodes: [
        { text: this.$t('countries.FR'), value: 'FR' },
        { text: this.$t('countries.DE'), value: 'DE' },
        { text: this.$t('countries.IT'), value: 'IT' },
        { text: this.$t('countries.ES'), value: 'ES' },
        { text: this.$t('countries.BE'), value: 'BE' },
        { text: this.$t('countries.GB'), value: 'GB' },
        { text: this.$t('countries.PT'), value: 'PT' },
        { text: this.$t('countries.AD'), value: 'AD' },
        { text: this.$t('countries.LU'), value: 'LU' },
        { text: this.$t('countries.IE'), value: 'IE' },
        { text: this.$t('countries.CH'), value: 'CH' },
        { text: this.$t('countries.NL'), value: 'NL' },
        { text: this.$t('countries.AT'), value: 'AT' },
        { text: this.$t('countries.CZ'), value: 'CZ' },
        { text: this.$t('countries.DK'), value: 'DK' },
        { text: this.$t('countries.SI'), value: 'SI' },
        { text: this.$t('countries.SE'), value: 'SE' },
        { text: this.$t('countries.FI'), value: 'FI' }
      ],
      countryCode: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.countryCode)
    }
  }
}
</script>
