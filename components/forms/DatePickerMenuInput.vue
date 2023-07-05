<template>
  <v-menu
    v-model="dateMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    nudge-bottom="-25"
    max-width="290px"
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        outlined
        :label="label"
        :placeholder="$t('date.format_dd_mm_yyyy')"
        :prepend-inner-icon="icon"
        v-bind="attrs"
        v-on="on"
        @blur="formatAndEmit()"
      />
    </template>
    <v-date-picker
      v-model="date"
      no-title
      @input="selectDate()"
    />
  </v-menu>
</template>

<script>
export default {
  name: 'DatePickerMenuInput',
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    hideDetails: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      dateFormatted: this.formatDate(this.value),
      dateMenu: false,
      date: this.value
    }
  },

  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
      this.dateMenu = false
    }
  },

  methods: {
    formatDate (date) {
      if (!date) { return null }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    parseDate (date) {
      if (!date) { return null }

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },

    formatAndEmit () {
      this.date = this.parseDate(this.dateFormatted)
      this.selectDate()
    },

    selectDate () {
      this.$emit('input', this.date)
    }
  }
}
</script>
