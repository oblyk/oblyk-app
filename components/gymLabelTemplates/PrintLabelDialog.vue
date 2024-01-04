<template>
  <v-dialog
    v-model="dialog"
    width="400"
  >
    <v-card>
      <v-card-title class="d-flex">
        <div>
          <v-icon left>
            {{ mdiPrinter }}
          </v-icon>
          {{ $t('actions.print') }}
        </div>
        <v-btn
          class="ml-auto"
          icon
          @click="dialog = false"
        >
          <v-icon>
            {{ mdiClose }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <div class="pa-4">
        <v-text-field
          v-model="reference"
          label="Référence de l'impression"
          hide-details
          clearable
          outlined
        />
        <div
          v-if="referencesSuggestion.length > 1"
          class="mt-2"
        >
          Suggestion :
          <v-chip
            v-for="(suggestion, suggestionIndex) in referencesSuggestion"
            :key="`suggestion-index-${suggestionIndex}`"
            class="mr-1"
            outlined
            @click="reference = suggestion"
          >
            {{ suggestion }}
          </v-chip>
        </div>
        <p class="text-decoration-underline mt-3 mb-0">
          Choisissez votre modèle d'étiquette :
        </p>
        <v-list>
          <v-list-item
            v-for="(label, labelIndex) in gymLabelTemplates"
            :key="`label-index-${labelIndex}`"
            class="border rounded-pill pr-2 mb-2"
            @click="print(label)"
          >
            <v-list-item-title class="d-flex">
              <div class="pt-2">
                {{ label.name }}
              </div>
              <v-btn
                elevation="0"
                class="ml-auto rounded-pill"
                color="primary"
              >
                {{ $t('actions.use') }}
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPrinter, mdiClose } from '@mdi/js'
import GymLabelTemplate from '~/models/GymLabelTemplate'

export default {
  name: 'PrintLabelDialog',
  props: {
    gym: {
      type: Object,
      required: true
    },
    fastPrinting: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      dialog: false,
      reference: null,
      referencesSuggestion: [],
      sectorId: null,
      routeIds: [],

      mdiPrinter,
      mdiClose
    }
  },

  computed: {
    gymLabelTemplates () {
      const labels = []
      for (const label of this.gym.gym_label_templates) {
        label.gym = this.gym
        labels.push(new GymLabelTemplate({ attributes: label }))
      }
      return labels
    }
  },

  methods: {
    openDialog (labelOptions) {
      if (labelOptions.sector) {
        this.reference = labelOptions.sector.name
        this.sectorId = labelOptions.sector.id
      }
      if (labelOptions.referencesSuggestion) {
        this.referencesSuggestion = labelOptions.referencesSuggestion
        this.reference = this.referencesSuggestion[0]
      }
      if (labelOptions.routeIds) {
        this.routeIds = labelOptions.routeIds
      }
      if (this.fastPrinting && this.gym.gym_label_templates.length === 1) {
        this.print(new GymLabelTemplate({ attributes: this.gym.gym_label_templates[0] }))
      } else {
        this.dialog = true
      }
    },

    print (label) {
      const query = {}
      if (this.routeIds.length > 0) { query['route_ids[]'] = this.routeIds }
      if (this.sectorId) { query.sector_id = this.sectorId }
      query.reference = this.reference

      const route = this.$router.resolve({ path: `${label.path}/print`, query })
      window.open(route.href, '_blank')
      this.dialog = false
    }
  }
}
</script>
