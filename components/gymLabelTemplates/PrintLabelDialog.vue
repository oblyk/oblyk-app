<template>
  <v-dialog
    v-model="dialog"
    width="450"
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
      <div class="pa-2">
        <p>Grouper les lignes par :</p>
        <v-radio-group v-model="groupBy">
          <v-radio value="anchor">
            <template #label>
              Une page par <strong class="ml-1 text-decoration-underline">relais</strong>
            </template>
          </v-radio>
          <v-radio value="sector">
            <template #label>
              Une page par <strong class="ml-1 text-decoration-underline">secteur</strong>
            </template>
          </v-radio>
          <v-radio
            label="Un maximum de ligne par page"
            value="ungroup"
          />
        </v-radio-group>
        <div v-if="groupBy === 'ungroup'">
          <div class="d-flex">
            <v-text-field
              v-model="routesByPage"
              label="Voies par page"
              class="rounded-tr-0 rounded-br-0"
              clearable
              outlined
            />
            <v-select
              v-model="sortBy"
              outlined
              label="Ordonner par"
              class="rounded-tl-0 rounded-bl-0"
              :items="sortItems"
              item-text="text"
              item-value="value"
            />
          </div>
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
        <div
          v-if="gymLabelTemplates.length === 0"
          class="text-center"
        >
          <div class="text--disabled mb-1">
            Créez un modèle d'étiquette pour lancer l'impression
          </div>
          <v-btn
            elevation="0"
            color="primary"
            :to="`${gym.adminPath}/label-templates`"
          >
            Créer une étiquette
          </v-btn>
        </div>
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
      groupBy: 'sector',
      sortBy: 'grade.asc',
      routesByPage: 7,

      sortItems: [
        { text: 'Du plus facile au plus dure', value: 'grade.asc' },
        { text: 'Du plus dure au plus facile', value: 'grade.desc' },
        { text: 'Par relais', value: 'anchor.asc' },
        { text: 'Par secteur', value: 'sector.asc' },
        { text: 'Ouverture les plus récentes', value: 'opened_at.desc' },
        { text: 'Ouverture les plus vielles', value: 'opened_at.asc' }
      ],

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
      const previousGroupBy = localStorage.getItem('printGymLabelBy')
      const previousRouteByPage = localStorage.getItem('printGymLabelRoutesByPage')
      const previousSortBy = localStorage.getItem('printGymLabelSortBy')
      if (previousGroupBy) {
        this.groupBy = previousGroupBy
      }
      if (previousRouteByPage) {
        this.routesByPage = previousRouteByPage
      }
      if (previousSortBy) {
        this.sortBy = previousSortBy
      }
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
      if (labelOptions.reference) {
        this.reference = labelOptions.reference
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
      query.group_by = this.groupBy
      query.routes_by_page = this.routesByPage
      query.sort_by = this.sortBy.split('.')[0]
      query.sort_direction = this.sortBy.split('.')[1]
      localStorage.setItem('printGymLabelBy', this.groupBy)
      localStorage.setItem('printGymLabelRoutesByPage', this.routesByPage)
      localStorage.setItem('printGymLabelSortBy', this.sortBy)

      const route = this.$router.resolve({ path: `${label.path}/print`, query })
      window.open(route.href, '_blank')
      this.dialog = false
    }
  }
}
</script>
