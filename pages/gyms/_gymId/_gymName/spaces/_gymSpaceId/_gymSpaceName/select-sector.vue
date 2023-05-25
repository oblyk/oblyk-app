<template>
  <v-container v-if="gymSpace">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.gymSector.chooseSector') }}
        </h2>
        <v-card
          v-for="sector in gymSpace.gym_sectors"
          :key="sector.id"
          link
          :to="`${gymSpace.path}/sectors/${sector.id}/routes/new`"
          class="mb-4"
        >
          <v-card-title>
            <v-icon left>
              {{ mdiTextureBox }}
            </v-icon>
            {{ sector.name }}
          </v-card-title>
          <v-card-text>
            {{ sector.description }}
          </v-card-text>
        </v-card>

        <div
          v-if="gymAuthCan(gymSpace.gym, 'manage_space')"
          class="text-right"
        >
          <v-btn
            elevation="0"
            outlined
            text
            color="primary"
            :to="`${gymSpace.path}/sectors/new?redirect_to=add-route`"
          >
            <v-icon left>
              {{ mdiPlus }}
            </v-icon>
            {{ $t('actions.newSector') }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiTextureBox, mdiPlus } from '@mdi/js'
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'

export default {
  meta: { orphanRoute: true },
  mixins: [GymSpaceConcern, GymRolesHelpers],

  data () {
    return {
      mdiTextureBox,
      mdiPlus
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Choisissez un secteur'
      },
      en: {
        metaTitle: 'Choose a sector'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  }
}
</script>
