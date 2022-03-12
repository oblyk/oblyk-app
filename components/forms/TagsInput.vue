<template>
  <v-autocomplete
    v-model="tags"
    :items="tagsList"
    class="tags-inputs"
    item-text="text"
    item-value="value"
    chips
    :dense="dense"
    :hide-details="hideDetails"
    :prepend-inner-icon="mdiPound"
    :label="label ? label : $t('components.input.tags')"
    multiple
    deletable-chips
    :tabindex="tabindex"
    outlined
    @change="onChange"
  />
</template>

<script>
import { mdiPound } from '@mdi/js'

export default {
  name: 'TagsInput',
  props: {
    value: Array,
    environment: String,
    label: {
      type: String,
      required: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    tabindex: Number
  },

  data () {
    return {
      mdiPound,
      tagsList: [
        { text: this.$t('models.tags.crimps'), value: 'crimps' },
        { text: this.$t('models.tags.slopers'), value: 'slopers' },
        { text: this.$t('models.tags.prow'), value: 'prow' },
        { text: this.$t('models.tags.arete'), value: 'arete' },
        { text: this.$t('models.tags.slab'), value: 'slab' },
        { text: this.$t('models.tags.vertical_wall'), value: 'vertical_wall' },
        { text: this.$t('models.tags.overhang'), value: 'overhang' },
        { text: this.$t('models.tags.slight_overhang'), value: 'slight_overhang' },
        { text: this.$t('models.tags.roof'), value: 'roof' },
        { text: this.$t('models.tags.pockets'), value: 'pockets' },
        { text: this.$t('models.tags.dyno'), value: 'dyno' },
        { text: this.$t('models.tags.traverse'), value: 'traverse' },
        { text: this.$t('models.tags.l_r_traverse'), value: 'l_r_traverse' },
        { text: this.$t('models.tags.r_l_traverse'), value: 'r_l_traverse' },
        { text: this.$t('models.tags.jugs'), value: 'jugs' },
        { text: this.$t('models.tags.pinches'), value: 'pinches' },
        { text: this.$t('models.tags.dihedral'), value: 'dihedral' },
        { text: this.$t('models.tags.chimney'), value: 'chimney' },
        { text: this.$t('models.tags.mantle'), value: 'mantle' },
        { text: this.$t('models.tags.balancy'), value: 'balancy' },
        { text: this.$t('models.tags.physical'), value: 'physical' },
        { text: this.$t('models.tags.endurance'), value: 'endurance' },
        { text: this.$t('models.tags.resistance'), value: 'resistance' },
        { text: this.$t('models.tags.runout'), value: 'runout' },
        { text: this.$t('models.tags.compression'), value: 'compression' },
        { text: this.$t('models.tags.crack'), value: 'crack' },
        { text: this.$t('models.tags.underclings'), value: 'underclings' },
        { text: this.$t('models.tags.high'), value: 'high' },
        { text: this.$t('models.tags.exposed'), value: 'exposed' },
        { text: this.$t('models.tags.pillar'), value: 'pillar' },
        { text: this.$t('models.tags.ledge'), value: 'ledge' },
        { text: this.$t('models.tags.technical'), value: 'technical' },
        { text: this.$t('models.tags.tiny_crimps'), value: 'tiny_crimps' },
        { text: this.$t('models.tags.mono'), value: 'mono' },
        { text: this.$t('models.tags.jamming'), value: 'jamming' },
        { text: this.$t('models.tags.kneebar'), value: 'kneebar' },
        { text: this.$t('models.tags.polished'), value: 'polished' },
        { text: this.$t('models.tags.dropknee'), value: 'dropknee' },
        { text: this.$t('models.tags.heel_hook'), value: 'heel_hook' },
        { text: this.$t('models.tags.toe_hook'), value: 'toe_hook' },
        { text: this.$t('models.tags.smearing'), value: 'smearing' },
        { text: this.$t('models.tags.tufas'), value: 'tufas' },
        { text: this.$t('models.tags.yaniro'), value: 'yaniro' },
        { text: this.$t('models.tags.flake'), value: 'flake' },
        { text: this.$t('models.tags.layback'), value: 'layback' },
        { text: this.$t('models.tags.sidepull'), value: 'sidepull' },
        { text: this.$t('models.tags.slots'), value: 'slots' },
        { text: this.$t('models.tags.morpho'), value: 'morpho' },
        { text: this.$t('models.tags.bouldery_move'), value: 'bouldery_move' },
        { text: this.$t('models.tags.bulge'), value: 'bulge' }
      ],
      tags: this.value
    }
  },

  watch: {
    value () {
      this.tags = this.value
    }
  },

  mounted () {
    this.sortTags()
  },

  methods: {
    onChange () {
      this.$emit('input', this.tags)
    },

    sortTags () {
      this.tagsList = this.tagsList.sort((a, b) => {
        const fa = a.text.toLowerCase()
        const fb = b.text.toLowerCase()

        if (fa < fb) {
          return -1
        }

        if (fa > fb) {
          return 1
        }

        return 0
      })
    }
  }
}
</script>
