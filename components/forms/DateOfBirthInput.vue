<template>
  <v-dialog
    ref="modal"
    v-model="modal"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        :label="$t('components.input.dateOfBirth')"
        readonly
        outlined
        :hide-details="hideDetails"
        v-bind="attrs"
        @blur="date = parseDate(dateFormatted)"
        v-on="on"
      />
    </template>
    <v-date-picker
      ref="picker"
      v-model="date"
      :max="new Date().toISOString().substr(0, 10)"
      min="1920-01-01"
      @input="selectDate()"
      @change="save"
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
  name: 'DateOfBirthInput',
  props: {
    value: {
      type: String,
      required: true
    },
    hideDetails: {
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
    modal (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },

    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    save (date) {
      this.$refs.modal.save(date)
    },

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
