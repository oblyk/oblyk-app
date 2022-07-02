<template>
  <div>
    <v-select
      v-if="!loadingGymSpaces && gymSpaces.length > 1"
      v-model="selectedGymSpaceId"
      outlined
      :items="gymSpaces"
      item-text="name"
      item-value="id"
      :label="$t('components.gymSpace.name')"
      @change="onChange()"
    />
    <h1 v-if="gymSpaces.length === 1" class="title mb-7">
      {{ gymSpace.name }}
    </h1>
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'

export default {
  name: 'GymSpaceSelector',
  mixins: [SessionConcern],
  props: {
    gymSpace: {
      type: Object,
      required: true
    }
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
    getAllGymSpace () {
      this.loadingGymSpaces = true
      new GymSpaceApi(this.$axios, this.$auth)
        .all(this.gymSpace.gym.id)
        .then((resp) => {
          this.gymSpaces = resp.data
          if (this.currentUserIsGymAdmin()) {
            this.gymSpaces.push({
              name: this.$t('components.gymSpace.create'),
              id: 0
            })
          }
        }).catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymSpace')
        }).finally(() => {
          this.loadingGymSpaces = false
        })
    },

    onChange () {
      if (this.loadingGymSpaces) { return }

      if (this.selectedGymSpaceId === 0) {
        this.$router.push(`/a${this.gymSpace.gymPath}/spaces/new`)
      } else {
        let selectedGymSpace = null

        for (const gymSpace of this.gymSpaces) {
          if (gymSpace.id === this.selectedGymSpaceId) {
            selectedGymSpace = gymSpace
          }
        }
        this.$router.push(`/gym-spaces/${this.gymSpace.gym.id}/${this.gymSpace.gym.slug_name}/spaces/${this.selectedGymSpaceId}/${selectedGymSpace.slug_name}/plan`)
      }
    }
  }
}
</script>
