<template>
  <v-select
    v-model="usageType"
    :items="usageTypeList"
    item-text="text"
    item-value="value"
    :label="`${$t('components.input.usageType')} *`"
    outlined
    @change="onChange"
  />
</template>

<script>
export default {
  name: 'UsageTypeInput',
  props: {
    value: String
  },

  data () {
    return {
      usageTypeList: [
        { text: this.$t('models.usageTypes.study'), value: 'study' },
        { text: this.$t('models.usageTypes.personal'), value: 'personal' },
        { text: this.$t('models.usageTypes.commercial'), value: 'commercial' },
        { text: this.$t('models.usageTypes.institutional'), value: 'institutional' }
      ],
      usageType: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.usageType)
    }
  }
}
</script>
