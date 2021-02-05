<template>
  <v-select
    v-model="ascentStatus"
    :items="ascentStatuses"
    item-text="text"
    item-value="value"
    :label="$t('components.input.ascentStatus')"
    outlined
    clearable
    v-disabled-icon-focus
    ref="ascentStatusInput"
    @change="onChange"
    @focus="onFocus"
  />
</template>

<script>
import { InputHelpers } from '@/mixins/InputHelpers'

export default {
  name: 'AscentStatusInput',
  mixins: [InputHelpers],
  props: {
    value: String
  },

  data () {
    return {
      ascentStatuses: [
        { text: this.$t('models.ascentStatus.project'), value: 'project' },
        { text: this.$t('models.ascentStatus.sent'), value: 'sent' },
        { text: this.$t('models.ascentStatus.red_point'), value: 'red_point' },
        { text: this.$t('models.ascentStatus.flash'), value: 'flash' },
        { text: this.$t('models.ascentStatus.onsight'), value: 'onsight' },
        { text: this.$t('models.ascentStatus.repetition'), value: 'repetition' }
      ],
      ascentStatus: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.ascentStatus)
    },

    onFocus: function () {
      this.$refs.ascentStatusInput.isMenuActive = true
    }
  }
}
</script>
