<template>
  <v-select
    v-model="rocks"
    :items="rocksList"
    item-text="text"
    item-value="value"
    chips
    clearable
    :label="$t('components.input.rocks')"
    multiple
    outlined
    @change="onChange()"
  />
</template>
<script>
export default {
  name: 'RockInput',
  props: {
    value: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
      rocksList: [
        { text: this.$t('models.rocks.slate'), value: 'slate' },
        { text: this.$t('models.rocks.limestone'), value: 'limestone' },
        { text: this.$t('models.rocks.conglomerate'), value: 'conglomerate' },
        { text: this.$t('models.rocks.gabbro'), value: 'gabbro' },
        { text: this.$t('models.rocks.gneiss'), value: 'gneiss' },
        { text: this.$t('models.rocks.granite'), value: 'granite' },
        { text: this.$t('models.rocks.sandstone'), value: 'sandstone' },
        { text: this.$t('models.rocks.migmatite'), value: 'migmatite' },
        { text: this.$t('models.rocks.molasses'), value: 'molasses' },
        { text: this.$t('models.rocks.quartzite'), value: 'quartzite' },
        { text: this.$t('models.rocks.serpentinite'), value: 'serpentinite' },
        { text: this.$t('models.rocks.silex'), value: 'silex' },
        { text: this.$t('models.rocks.basalt'), value: 'basalt' },
        { text: this.$t('models.rocks.rhyolite'), value: 'rhyolite' },
        { text: this.$t('models.rocks.andesite'), value: 'andesite' },
        { text: this.$t('models.rocks.schist'), value: 'schist' },
        { text: this.$t('models.rocks.phonolite'), value: 'phonolite' }
      ],
      rocks: this.value
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.rocks)
    }
  }
}
</script>
