<template>
  <fieldset
    class="custom-fieldset border rounded mt-n1"
    :class="hideDetails ? '' : 'mb-8'"
  >
    <legend
      class="v-label custom-fieldset-label"
      :class="!isValidDate ? 'red--text' : null"
    >
      {{ $t('components.input.dateOfBirth') }}
      <strong
        v-if="required"
        class="red--text"
        style="font-size: 16px"
      >
        *
      </strong>
    </legend>
    <div class="d-flex mx-2 mb-2">
      <v-text-field
        v-model="day"
        type="number"
        label="Jour"
        hide-details
        dense
        filled
        :rules="[rules.day]"
        class="rounded-sm"
        style="min-width: 70px"
        @input="selectDate"
      />
      <v-select
        v-model="month"
        :items="months"
        label="Mois"
        item-value="value"
        item-text="text"
        hide-details
        dense
        filled
        class="rounded-sm mx-1 mx-lg-2"
        :append-icon="$vuetify.breakpoint.mobile ? false : null"
        @change="selectDate"
      />
      <v-text-field
        v-model="year"
        label="Année"
        type="number"
        hide-details
        dense
        filled
        :rules="[rules.year]"
        class="rounded-sm"
        style="min-width: 80px"
        @input="selectDate"
      />
    </div>
  </fieldset>
</template>

<script>
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  name: 'DateOfBirthSelectInput',
  mixins: [DateHelpers],
  props: {
    value: String,
    required: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      year: null,
      month: null,
      day: null,
      modal: false,
      date: this.value,
      isValidDate: true,
      rules: {
        day: (value) => {
          if (value === null || (value <= 31 && value >= 1)) {
            return true
          } else {
            return 'Doit être entre le 1er et le 31'
          }
        },
        year: (value) => {
          const year = new Date().getFullYear()
          if (value === null || (value <= year && value >= year - 100)) {
            return true
          } else {
            return `Doit être entre ${year} et ${year - 100}`
          }
        }
      },
      months: [
        { text: this.$t('common.months.01'), value: 1 },
        { text: this.$t('common.months.02'), value: 2 },
        { text: this.$t('common.months.03'), value: 3 },
        { text: this.$t('common.months.04'), value: 4 },
        { text: this.$t('common.months.05'), value: 5 },
        { text: this.$t('common.months.06'), value: 6 },
        { text: this.$t('common.months.07'), value: 7 },
        { text: this.$t('common.months.08'), value: 8 },
        { text: this.$t('common.months.09'), value: 9 },
        { text: this.$t('common.months.10'), value: 10 },
        { text: this.$t('common.months.11'), value: 11 },
        { text: this.$t('common.months.12'), value: 12 }
      ]
    }
  },

  watch: {
    value () {
      this.splitDate()
    }
  },

  mounted () {
    this.splitDate()
  },

  methods: {
    splitDate () {
      if (!this.value) { return null }
      const dateValue = new Date(this.value)
      this.day = `0${parseInt(dateValue.getDate())}`.slice(-2)
      this.month = dateValue.getMonth() + 1
      this.year = dateValue.getFullYear()
    },

    selectDate () {
      const year = new Date().getFullYear()
      if (
        this.day !== null &&
        this.month !== null &&
        this.year !== null &&
        this.year <= year &&
        this.year >= year - 100
      ) {
        this.isValidDate = true
        const month = `0${parseInt(this.month)}`.slice(-2)
        const day = `0${parseInt(this.day)}`.slice(-2)
        const date = new Date(`${this.year}-${month}-${day}`)
        if (date instanceof Date && !isNaN(date.valueOf())) {
          this.$emit('input', `${this.year}-${month}-${day}`)
        } else {
          this.isValidDate = false
        }
      }
    }
  }
}
</script>
