<template>
  <v-card
    style="max-width: 290px"
    class="align-self-stretch"
    :to="gymSpace.path"
  >
    <div class="d-flex flex-column" style="height: 100%">
      <div
        v-if="gymSpace.pictureAttachment"
        class="pa-4"
      >
        <v-img
          contain
          height="150"
          :src="imageVariant(gymSpace.pictureAttachment, { fit: 'scale-down', height: 720, width: 720 })"
          :lazy-src="imageVariant(gymSpace.pictureAttachment, { fit: 'scale-down', height: 100, width: 100 })"
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
        <v-chip
          v-if="gymSpace.draft"
          color="amber"
          small
          class="ml-1"
        >
          {{ $t('models.gymSpace.draft') }}
        </v-chip>
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
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'GymSpaceCard',
  components: { DescriptionLine },
  mixins: [DateHelpers, ImageVariantHelpers],
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
