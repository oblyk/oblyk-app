<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="time"
    persistent
    width="290px"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="timeFormatted"
        outlined
        :label="label"
        readonly
        :class="required ? 'required-field' : ''"
        :clearable="!required"
        :hide-details="hideDetails"
        :prepend-inner-icon="icon"
        :placeholder="$t('date.format_hhmm')"
        v-bind="attrs"
        @blur="time = parseDate(timeFormatted)"
        v-on="on"
      />
    </template>
    <v-time-picker
      v-model="time"
      format="24hr"
      @input="selectTime()"
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
        @click="$refs.dialog.save(time)"
      >
        {{ $t('actions.ok' ) }}
      </v-btn>
    </v-time-picker>
  </v-dialog>
</template>

<script>
export default {
  name: 'TimePickerInput',
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
      timeFormatted: this.formatDate(this.value),
      modal: false,
      time: this.value
    }
  },

  watch: {
    time (val) {
      this.timeFormatted = this.formatDate(this.time)
    }
  },

  methods: {
    formatDate (time) {
      if (!time) { return null }

      const [hour, minute] = time.split(':')
      return `${hour}h${minute}`
    },

    parseDate (time) {
      if (!time) { return null }

      const [hour, minute] = time.split('h')
      return `${hour}:${minute}`
    },

    selectTime () {
      this.$emit('input', this.time)
    }
  }
}
</script>
