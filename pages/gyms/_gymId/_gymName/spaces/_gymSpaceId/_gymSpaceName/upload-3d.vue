<template>
  <v-container v-if="gymSpace">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('components.gymSpace.uploadThreeDFor', { name: gymSpace.name }) }}
        </h2>
        <client-only>
          <gym-space-three-d-plan-form
            :gym-space="gymSpace"
          />
          <v-btn
            class="mt-4"
            text
            @click="goBackClick"
          >
            <v-icon left>
              {{ mdiArrowLeft }}
            </v-icon>
            {{ $t('actions.back') }}
          </v-btn>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'
import { GymSpaceConcern } from '@/concerns/GymSpaceConcern'
import GymSpaceThreeDPlanForm from '~/components/gymSpaces/forms/GymSpaceThreeDPlanForm'

export default {
  meta: { orphanRoute: true },
  components: { GymSpaceThreeDPlanForm },
  mixins: [GymSpaceConcern],

  data () {
    return {
      mdiArrowLeft
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Modifier le 3D'
      },
      en: {
        metaTitle: 'Modify the 3D'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  methods: {
    goBackClick () {
      this.$router.go(-1)
    }
  }
}
</script>
