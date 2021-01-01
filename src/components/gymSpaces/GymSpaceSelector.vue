<template>
  <div>
    <v-select
      outlined
      v-model="selectedGymSpaceId"
      :items="gymSpaces"
      item-text="name"
      item-value="id"
      :label="$t('components.gymSpace.name')"
      v-if="!loadingGymSpaces && gymSpaces.length > 1"
      @change="onChange()"
    />
    <h1 class="title mb-7" v-if="gymSpaces.length === 1">
      {{ gymSpace.name }}
    </h1>
  </div>
</template>
<script>
import GymSpaceApi from '@/services/oblyk-api/gymSpaceApi'

export default {
  name: 'GymSpaceSelector',
  props: {
    gymSpace: Object
  },

  data () {
    return {
      selectedGymSpaceId: this.gymSpace.id,
      gymSpaces: [],
      loadingGymSpaces: true
    }
  },

  created () {
    this.getAllGymSpace()
  },

  methods: {
    getAllGymSpace: function () {
      this.loadingGymSpaces = true
      GymSpaceApi
        .all(this.gymSpace.gym.id)
        .then(resp => {
          this.gymSpaces = resp.data
          this.gymSpaces.push({
            name: this.$t('components.gymSpace.create'),
            id: 0
          })
        }).catch(err => {
          this.$root.$emit('alertFromApiError', err, 'gymSpace')
        }).finally(() => {
          this.loadingGymSpaces = false
        })
    },

    onChange: function () {
      if (this.loadingGymSpaces) return

      if (this.selectedGymSpaceId === 0) {
        this.$router.push(this.gymSpace.gymUrl('spaces/new'))
      } else {
        let selectedGymSpace = null

        for (const gymSpace of this.gymSpaces) {
          if (gymSpace.id === this.selectedGymSpaceId) {
            selectedGymSpace = gymSpace
          }
        }
        this.$router.push(`/gyms/${this.gymSpace.gym.id}/${this.gymSpace.gym.slug_name}/spaces/${this.selectedGymSpaceId}/${selectedGymSpace.slug_name}/plan`)
      }
    }
  }
}
</script>
