<template>
  <v-select
    v-model="fontFamily"
    :items="gymLabelFonts"
    outlined
    :dense="dense"
    :prepend-icon="prependIcon"
    :label="label || $t('components.input.fontFamily')"
    item-text="text"
    item-value="value"
    :disabled="loadingGymLabelFont"
    :loading="loadingGymLabelFont"
    @change="onChange"
  >
    <template #item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item" />
      </template>
      <template v-else>
        <v-list-item-content>
          <v-list-item-title>
            <div
              style="height: 16px;"
              :style="$vuetify.theme.dark ? 'fill: white' : 'fill: black'"
              class="svg-container --full-height"
              v-html="data.item.svg"
            />
          </v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-select>
</template>

<script>
import GymLabelFontApi from '~/services/oblyk-api/GymLabelFontApi'

export default {
  name: 'GymLabelFontInput',
  props: {
    value: {
      type: String,
      default: null
    },
    dense: {
      type: Boolean,
      default: false
    },
    prependIcon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      fontFamily: this.value,
      loadingGymLabelFont: true,
      gymLabelFonts: []
    }
  },

  watch: {
    value () {
      this.fontFamily = this.value
    }
  },

  mounted () {
    this.getGymLabelFont()
  },

  methods: {
    getGymLabelFont () {
      this.loadingGymLabelFont = true
      new GymLabelFontApi(this.$axios, this.$auth)
        .all()
        .then((resp) => {
          this.gymLabelFonts = []
          for (const font in resp.data) {
            this.gymLabelFonts.push({
              value: font,
              text: resp.data[font].name,
              svg: resp.data[font].svg_preview
            })
          }
        })
        .finally(() => {
          this.loadingGymLabelFont = false
        })
    },

    onChange () {
      this.$emit('input', this.fontFamily)
    }
  }
}
</script>
