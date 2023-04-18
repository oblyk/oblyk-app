<template>
  <div>
    <spinner v-if="loadingGymSpaces" :full-height="false" />
    <v-row v-else>
      <v-col
        v-for="(gymSpace, gymSpaceIndex) in gymSpaces"
        :key="`gym-space-index-${gymSpaceIndex}`"
        cols="4"
      >
        <v-card :to="gymSpace.path">
          <div
            v-if="gymSpace.plan"
            class="pa-4"
          >
            <v-img
              contain
              height="150"
              :src="gymSpace.planUrl"
              :lazy-src="gymSpace.planThumbnailUrl"
            />
          </div>
          <v-card-title class="pb-1">
            {{ gymSpace.name }}
          </v-card-title>
          <v-card-text>
            {{ gymSpace.description }}
            <v-row :class="gymSpace.description ? 'mt-1' : ''">
              <v-col cols="6">
                <description-line
                  :icon="mdiSourceBranch"
                  item-title="Nombre de voie"
                  :item-value="`${gymSpace.figures.routes_count} ligne(s)`"
                />
              </v-col>
              <v-col
                v-if="gymSpace.figures.last_route_opened_at"
                cols="6"
              >
                <description-line
                  :icon="mdiCalendar"
                  :title="humanizeDate(gymSpace.figures.last_route_opened_at)"
                  item-title="Dernière ouverture"
                  :item-value="dateFromToday(gymSpace.figures.last_route_opened_at)"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiSourceBranch, mdiCalendar } from '@mdi/js'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'
import GymSpace from '~/models/GymSpace'
import Spinner from '~/components/layouts/Spiner.vue'
import DescriptionLine from '~/components/ui/DescriptionLine.vue'
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  name: 'GymSpaceList',
  components: { DescriptionLine, Spinner },
  mixins: [DateHelpers],

  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingGymSpaces: true,
      gymSpaces: [],

      mdiSourceBranch,
      mdiCalendar
    }
  },

  mounted () {
    this.getGymSpaces()
  },

  methods: {
    getGymSpaces () {
      this.loadingGymSpaces = true
      this.gymSpaces = []
      new GymSpaceApi(this.$axios, this.$auth)
        .all(this.gym.id)
        .then((resp) => {
          for (const space of resp.data) {
            this.gymSpaces.push(new GymSpace({ attributes: space }))
          }
        }).catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymSpace')
        }).finally(() => {
          this.loadingGymSpaces = false
        })
    }
  }
}
</script>
