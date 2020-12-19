<template>
  <div>
    <spinner v-if="load" />

    <v-container v-if="!load">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">{{ $t('actions.edit') }} {{ gym.name }}</h2>
          <gym-form :gym="gym" method="put" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import GymApi from '@/services/oblyk-api/gym'
import GymModel from '@/models/GymModel'
import GymForm from '@/components/gyms/forms/GymForm'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'GymEditView',
  components: { Spinner, GymForm },
  data () {
    return {
      gym: null,
      load: true
    }
  },

  created () {
    this.getGym()
  },

  methods: {
    getGym: function () {
      GymApi
        .find(this.$route.params.gymId)
        .then(resp => {
          this.gym = new GymModel(resp.data)
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.load = false
        })
    }
  }
}
</script>
