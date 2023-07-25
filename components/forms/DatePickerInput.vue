<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        outlined
        :label="label"
        readonly
        :class="required ? 'required-field' : ''"
        :clearable="!required"
        :hide-details="hideDetails"
        :prepend-inner-icon="icon"
        :placeholder="$t('date.format_dd_mm_yyyy')"
        v-bind="attrs"
        @blur="date = parseDate(dateFormatted)"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="date"
      scrollable
      @input="selectDate()"
    >
      <v-spacer />
      <v-btn
        text
        color="primary"
        @click="modal = false"
      >
        {{ $t('actions.cancel' ) }}
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="$refs.dialog.save(date)"
      >
        {{ $t('actions.ok' ) }}
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  name: 'DatePickerInput',
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
    },
    required: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      dateFormatted: this.formatDate(this.value),
      modal: false,
      date: this.value
    }
  },

  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
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

    selectDate () {
      this.$emit('input', this.date)
    }
  }
}
</script>
