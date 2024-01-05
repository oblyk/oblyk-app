<template>
  <v-input :prepend-icon="mdiTune">
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-2 px-2">
      <legend class="v-label custom-fieldset-label">
        Options de la page
      </legend>
      <div>
        <!-- border style -->
        <v-chip
          title="Marge d'impression la page"
          @click="marginDialog = true"
        >
          <v-icon left>
            {{ mdiCropFree }}
          </v-icon>
          {{ pageMargin }}mm
        </v-chip>
        <v-dialog
          v-model="marginDialog"
          width="300"
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
      </div>
    </fieldset>
  </v-input>
</template>
<script>
import {
  mdiCropFree,
  mdiTune
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

      mdiCropFree,
      mdiTune
    }
  },

  methods: {
    onChange () {
      this.$emit('input', {
        'page-margin': `${this.pageMargin}mm`
      })
    }
  }
}
</script>
