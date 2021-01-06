<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        outlined
        :label="label"
        readonly
        clearable
        :placeholder="$t('date.format_dd_mm_yyyy')"
        @blur="date = parseDate(dateFormatted)"
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker
      @input="selectDate()"
      v-model="date"
      scrollable
    >
      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @click="modal = false"
      >
        {{ $t('actions.cancel' )}}
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="$refs.dialog.save(date)"
      >
        {{ $t('actions.ok' )}}
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
      required: false
    },
    label: String
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
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    parseDate (date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },

    selectDate: function () {
      this.$emit('input', this.date)
    }
  }
}
</script>
