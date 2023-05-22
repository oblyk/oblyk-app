<template>
  <div class="gym-space-list">
    <spinner v-if="loadingGymSpaces" :full-height="false" />
    <div v-else>
      <div
        v-for="(group, groupIndex) in groups"
        :key="`group-index-${groupIndex}`"
        class="mb-3 d-inline-block px-4 pt-2 rounded gym-space-list-groups"
      >
        <p class="mb-2 font-weight-bold">
          {{ group.name }}
        </p>
        <div class="d-flex flex-wrap">
          <gym-space-card
            v-for="(gymSpace, gymSpaceIndex) in group.gym_spaces"
            :key="`grouped-gym-space-index-${gymSpaceIndex}`"
            :gym-space="gymSpace"
            class="d-inline-block gym-space-card mb-4"
          />
        </div>
      </div>
      <div v-if="ungroupedSpaces.length > 0">
        <h3 class="mb-2">
          {{ $t('components.gym.spaces') }}
        </h3>
        <div class="d-flex flex-wrap ungrouped-gym-space-card">
          <gym-space-card
            v-for="(gymSpace, gymSpaceIndex) in ungroupedSpaces"
            :key="`ungrouped-gym-space-index-${gymSpaceIndex}`"
            :gym-space="gymSpace"
            class="gym-space-card mb-4"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'
import GymSpace from '~/models/GymSpace'
import Spinner from '~/components/layouts/Spiner.vue'
import GymSpaceCard from '~/components/gymSpaces/GymSpaceCard.vue'

export default {
  name: 'GymSpaceList',
  components: { GymSpaceCard, Spinner },

  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingGymSpaces: true,
      groups: [],
      ungroupedSpaces: []
    }
  },

  mounted () {
    this.getGymSpaces()
  },

  methods: {
    getGymSpaces () {
      this.loadingGymSpaces = true
      this.groups = []
      this.ungroupedSpaces = []
      new GymSpaceApi(this.$axios, this.$auth)
        .groups(this.gym.id)
        .then((resp) => {
          for (const group of resp.data.grouped_spaces) {
            const spaces = []
            for (const space of group.gym_spaces) {
              spaces.push(new GymSpace({ attributes: space }))
            }
            this.groups.push({
              name: group.name,
              id: group.id,
              order: group.order,
              gym_spaces: spaces
            })
          }
          for (const space of resp.data.ungrouped_spaces) {
            this.ungroupedSpaces.push(new GymSpace({ attributes: space }))
          }
        }).catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymSpace')
        }).finally(() => {
          this.loadingGymSpaces = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.gym-space-list {
  .gym-space-list-groups {
    vertical-align: top;
    border-width: 3px;
    border-style: solid;
    border-color: white;
    .gym-space-card {
      vertical-align: top;
      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
  .ungrouped-gym-space-card {
    .gym-space-card {
      vertical-align: top;
      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
}
.theme--dark {
  .gym-space-list {
    .gym-space-list-groups {
      border-color: rgb(37, 37, 37);
    }
  }
}
</style>
