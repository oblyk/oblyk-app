<template>
  <v-select
    v-model="incline"
    :items="inclines"
    item-text="text"
    item-value="value"
    prepend-inner-icon="mdi-angle-acute"
    :label="$t('components.input.inclineType')"
    outlined
    clearable
    @change="onChange()"
  ></v-select>
</template>

<script>
export default {
  name: 'InclineInput',
  props: {
    value: String
  },

  data () {
    return {
      inclines: [
        { text: this.$t('models.inclineType.slab'), value: 'slab' },
        { text: this.$t('models.inclineType.vertical'), value: 'vertical' },
        { text: this.$t('models.inclineType.slight_overhang'), value: 'slight_overhang' },
        { text: this.$t('models.inclineType.overhang'), value: 'overhang' },
        { text: this.$t('models.inclineType.roof'), value: 'roof' }
      ],
      incline: this.value
    }
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.incline)
    }
  }
}
</script>
