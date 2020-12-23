<template>
  <div>
    <v-select
      outlined
      v-model="selectedGymSpaceId"
      :items="gymSpaces"
      item-text="name"
      item-value="id"
      v-if="!loadingGymSpaces"
      @change="onChange()"
    />
  </div>
</template>
<script>
import GymSpaceApi from '@/services/oblyk-api/gymSpaceApi'

export default {
  name: 'GymSpaceSelector',
  props: {
    gymId: Number
  },

  data () {
    return {
      selectedGymSpaceId: parseInt(this.$route.params.gymSpaceId),
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
        .all(this.gymId)
        .then(resp => {
          this.gymSpaces = resp.data
          this.gymSpaces.push({
            name: this.$t('components.gymSpace.create'),
            id: 0
          })
        }).catch(err => {
          console.error(err)
        }).finally(() => {
          this.loadingGymSpaces = false
        })
    },

    onChange: function () {
      if (this.loadingGymSpaces) return

      const gymSlugName = this.$route.params.gymSlug
      if (this.selectedGymSpaceId === 0) {
        this.$router.push(`/gyms/${this.gymId}/${gymSlugName}/spaces/new`)
      } else {
        let selectedGymSpace = null

        for (const gymSpace of this.gymSpaces) {
          if (gymSpace.id === this.selectedGymSpaceId) {
            selectedGymSpace = gymSpace
          }
        }
        this.$router.push(`/gyms/${this.gymId}/${gymSlugName}/spaces/${this.selectedGymSpaceId}/${selectedGymSpace.slug_name}/plan`)
      }
    }
  }
}
</script>
