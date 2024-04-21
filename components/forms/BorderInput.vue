<template>
  <v-input :prepend-icon="mdiBorderAll">
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-2 px-2">
      <legend class="v-label custom-fieldset-label">
        Bordures des étiquettes
      </legend>
      <div>
        <!-- border style -->
        <v-chip
          title="Style des bordures"
          @click="borderStyleDialog = true"
        >
          <v-icon left>
            {{ mdiFormatLineStyle }}
          </v-icon>
          {{ $t(`models.gymLabelTemplate.border_styles.${borderStyle}`) }}
        </v-chip>
        <v-dialog
          v-model="borderStyleDialog"
          width="300"
        >
          <v-card>
            <v-card-title>
              Style des bordures
            </v-card-title>
            <div class="px-4">
              <v-select
                v-model="borderStyle"
                :items="styles"
                item-value="value"
                item-text="text"
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
                @click="borderStyleDialog = false"
              >
                {{ $t('actions.close') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Border Color -->
        <v-chip
          v-if="borderStyle !== 'none'"
          title="Couleur des bordures"
          @click="colorDialog = true"
        >
          <v-icon :color="bordeColor">
            {{ mdiFormatColorFill }}
          </v-icon>
        </v-chip>
        <v-dialog
          v-model="colorDialog"
          width="300"
        >
          <v-card>
            <v-card-title>
              Couleur des bordures
            </v-card-title>
            <div class="px-4">
              <v-color-picker
                v-model="bordeColor"
                dot-size="25"
                mode="hexa"
                swatches-max-height="200"
                @input="onChange"
              />
            </div>
            <v-card-actions>
              <v-btn
                outlined
                text
                class="ml-auto"
                @click="colorDialog = false"
              >
                {{ $t('actions.close') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- border width -->
        <v-chip
          v-if="borderStyle !== 'none'"
          title="Épaisseur des bordures"
          @click="borderWidthDialog = true"
        >
          <v-icon left>
            {{ mdiFormatLineWeight }}
          </v-icon>
          {{ borderWidth }}mm
        </v-chip>
        <v-dialog
          v-model="borderWidthDialog"
          width="300"
        >
          <v-card>
            <v-card-title>
              Épaisseur des bordures
            </v-card-title>
            <div class="px-4">
              <v-text-field
                v-model="borderWidth"
                type="number"
                suffix="mm"
                step="0.1"
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
                @click="borderWidthDialog = false"
              >
                {{ $t('actions.close') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- border Radius -->
        <v-chip
          v-if="borderStyle !== 'none'"
          title="Arrondi des bordures"
          @click="borderRadiusDialog = true"
        >
          <v-icon left>
            {{ mdiSquareRoundedOutline }}
          </v-icon>
          {{ borderRadius }}mm
        </v-chip>
        <v-dialog
          v-model="borderRadiusDialog"
          width="300"
        >
          <v-card>
            <v-card-title>
              Arrondi des bordures
            </v-card-title>
            <div class="px-4">
              <v-text-field
                v-model="borderRadius"
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
                @click="borderRadiusDialog = false"
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
  mdiBorderAll,
  mdiFormatColorFill,
  mdiFormatLineWeight,
  mdiFormatLineStyle,
  mdiSquareRoundedOutline
} from '@mdi/js'

export default {
  name: 'BorderInput',
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      colorDialog: false,
      borderWidthDialog: false,
      borderStyleDialog: false,
      borderRadiusDialog: false,
      bordeColor: this.value['border-color'] || '#000000',
      borderWidth: this.value['border-width'].replace('mm', '') || 0.3,
      borderStyle: this.value['border-style'] || 'solid',
      borderRadius: this.value['border-radius'].replace('mm', '') || 3,
      styles: [
        { value: 'none', text: this.$t('models.gymLabelTemplate.border_styles.none') },
        { value: 'solid', text: this.$t('models.gymLabelTemplate.border_styles.solid') },
        { value: 'dashed', text: this.$t('models.gymLabelTemplate.border_styles.dashed') }
      ],

      mdiBorderAll,
      mdiFormatColorFill,
      mdiFormatLineWeight,
      mdiFormatLineStyle,
      mdiSquareRoundedOutline
    }
  },

  methods: {
    onChange () {
      this.$emit('input', {
        'border-color': this.bordeColor,
        'border-width': `${this.borderWidth}mm`,
        'border-style': this.borderStyle,
        'border-radius': `${this.borderRadius}mm`
      })
    }
  }
}
</script>
