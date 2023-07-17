<template>
  <v-card
    style="max-width: 290px"
    class="align-self-stretch"
    :to="gymSpace.path"
  >
    <div class="d-flex flex-column" style="height: 100%">
      <div
        v-if="gymSpace.plan"
        class="pa-4"
      >
        <v-img
          contain
          height="150"
          :src="gymSpace.planUrl"
          :lazy-src="gymSpace.planThumbnailUrl"
        >
          <template #placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-row>
          </template>
        </v-img>
      </div>
      <v-card-title class="pb-1">
        {{ gymSpace.name }}
      </v-card-title>
      <v-card-text :class="gymSpace.figures.routes_count > 0 ? 'pb-0' : ''">
        {{ gymSpace.description }}
      </v-card-text>
      <v-card-text
        v-if="gymSpace.figures.routes_count > 0"
        class="pt-0 mt-auto"
      >
        <v-row
          class="align-end"
          :class="gymSpace.description ? 'mt-1' : ''"
        >
          <v-col cols="6">
            <description-line
              :icon="mdiSourceBranch"
              item-title="Nb. lignes"
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
              item-title="Der. ouverture"
              :item-value="dateFromToday(gymSpace.figures.last_route_opened_at)"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import { mdiSourceBranch, mdiCalendar } from '@mdi/js'
import DescriptionLine from '~/components/ui/DescriptionLine.vue'
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  name: 'GymSpaceCard',
  components: { DescriptionLine },
  mixins: [DateHelpers],
  props: {
    gymSpace: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiSourceBranch,
      mdiCalendar
    }
  }
}
</script>
