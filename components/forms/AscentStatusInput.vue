<template>
  <v-select
    ref="ascentStatusInput"
    v-model="ascentStatus"
    v-disabled-icon-focus
    :items="ascentStatuses"
    item-text="text"
    item-value="value"
    :label="$t('components.input.ascentStatus')"
    outlined
    clearable
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
    value: {
      type: String,
      default: null
    }
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
    onChange () {
      this.$emit('input', this.ascentStatus)
    },

    onFocus () {
      this.$refs.ascentStatusInput.isMenuActive = true
    }
  }
}
</script>
