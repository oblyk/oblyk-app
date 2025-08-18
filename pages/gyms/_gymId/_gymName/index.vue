<template>
  <v-container v-if="gym">
    <gym-head
      :gym="gym"
      class="mb-3"
    />
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
  </v-container>
</template>

<script>
import GymContact from '@/components/gyms/GymContact'
import GymDescription from '@/components/gyms/GymDescription'
import ClimbersAround from '~/components/partners/ClimbersAround'
import VersionInformation from '~/components/ui/VersionInformation'
import GymUserAscents from '~/components/gyms/GymUserAscents'
import GymHead from '~/components/gyms/layouts/GymHead'

export default {
  components: { GymHead, GymUserAscents, VersionInformation, ClimbersAround, GymDescription, GymContact },
  scrollToTop: true,
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  created () {
    this.$store.dispatch('oblykEnvironment/pushHubs', { hub: this.gym.path, page: this.$route.path })
  }
}
</script>
