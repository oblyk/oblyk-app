<template>
  <div v-if="gym">
    <v-row>
      <v-col cols="12" md="7">
        <gym-description :gym="gym" />
      </v-col>
      <v-col cols="12" md="5">
        <gym-contact :gym="gym" />
      </v-col>
    </v-row>
    <client-only>
      <v-row v-if="$auth.loggedIn">
        <v-col cols="12">
          <gym-user-ascents :gym="gym" />
        </v-col>
      </v-row>
    </client-only>
    <v-row>
      <v-col cols="12">
        <!-- Around climbers -->
        <climbers-around :latitude="gym.latitude" :longitude="gym.longitude" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <version-information
          :object="gym"
          object-type="gym"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GymContact from '@/components/gyms/GymContact'
import GymDescription from '@/components/gyms/GymDescription'
import ClimbersAround from '~/components/partners/ClimbersAround'
import VersionInformation from '~/components/ui/VersionInformation'
import GymUserAscents from '~/components/gyms/GymUserAscents.vue'

export default {
  components: { GymUserAscents, VersionInformation, ClimbersAround, GymDescription, GymContact },
  props: {
    gym: {
      type: Object,
      required: true
    }
  }
}
</script>
