<template>
  <v-input :prepend-icon="mdiTune">
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-2 px-2">
      <legend class="v-label custom-fieldset-label">
        Options de la page
      </legend>
      <div>
        <!-- Print margin -->
        <v-chip
          title="Marge d'impression la page"
          @click="marginDialog = true"
        >
          <v-icon left>
            {{ mdiCropFree }}
          </v-icon>
          Marge d'impression : {{ pageMargin }}mm
        </v-chip>

        <!-- Vertical position -->
        <v-chip
          title="Position vertical"
          @click="verticalDialog = true"
        >
          <v-icon left>
            {{ mdiArrowExpandVertical }}
          </v-icon>
          Alignement vertical des étiquettes :
          {{ $t(`models.gymLabelTemplate.alignItems.${verticalAlign}`) }}
        </v-chip>

        <!-- Margin dialog -->
        <v-dialog
          v-model="marginDialog"
          width="400"
        >
          <v-card>
            <v-card-title>
              Marge d'impression de la page
            </v-card-title>
            <div class="px-4">
              <v-text-field
                v-model="pageMargin"
                type="number"
                suffix="mm"
                outlined
                hide-details
                @input="onChange"
              />
            </div>
            <v-card-actions>
              <v-btn
                class="ml-auto"
                outlined
                text
                @click="marginDialog = false"
              >
                {{ $t('actions.close') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Vertical align -->
        <v-dialog
          v-model="verticalDialog"
          width="400"
        >
          <v-card>
            <v-card-title>
              Alignement vertical des étiquettes sur la page.
            </v-card-title>
            <div class="px-4">
              <v-select
                v-model="verticalAlign"
                outlined
                :items="verticals"
                item-value="value"
                item-text="text"
                hide-details
                @input="onChange"
              />
            </div>
            <v-card-actions>
              <v-btn
                class="ml-auto"
                outlined
                text
                @click="verticalDialog = false"
              >
                {{ $t('actions.close') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </fieldset>
  </v-input>
</template>
<script>
import {
  mdiCropFree,
  mdiTune,
  mdiArrowExpandVertical
} from '@mdi/js'

export default {
  name: 'LabelLayoutOptionInput',
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      marginDialog: false,
      pageMargin: this.value['page-margin'].replace('mm', '') || 10,

      verticalDialog: false,
      verticalAlign: 'start',

      verticals: [
        { text: 'Aligné sur le haut de la page', value: 'start' },
        { text: 'Centrer sur la page', value: 'center' },
        { text: 'Aligné sur le bas de la page', value: 'end' }
      ],

      mdiCropFree,
      mdiTune,
      mdiArrowExpandVertical
    }
  },

  methods: {
    onChange () {
      this.$emit('input', {
        'page-margin': `${this.pageMargin}mm`,
        'align-items': `${this.verticalAlign}`
      })
    }
  }
}
</script>
