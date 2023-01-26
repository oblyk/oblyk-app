<template>
  <div class="gym-spaces-selector">
    <div v-if="loadingGymSpaces">
      <v-skeleton-loader class="d-inline-block" type="avatar" />
      <v-skeleton-loader class="d-inline-block" type="avatar" />
      <v-skeleton-loader class="d-inline-block" type="avatar" />
    </div>
    <div v-if="!loadingGymSpaces && gymSpaces.length">
      <p class="mb-2">
        <small class="text--disabled">Les espaces de {{ gym.name }} :</small>
      </p>
      <div class="text-no-wrap overflow-x-auto">
        <nuxt-link
          v-for="(space, gymSpaceIndex) in gymSpaces"
          :key="`gym-space-index-${gymSpaceIndex}`"
          :to="space.path"
          class="gym-space-block text-center discrete-link"
          :class="selectedGymSpaceId === space.id ? 'active' : 'inactive'"
        >
          <v-avatar
            size="70"
            class="gym-space-avatar"
          >
            <v-img
              v-if="space.plan"
              :src="space.planThumbnailUrl"
              height="62"
              width="62"
              contain
            />
            <v-icon
              v-else
              size="40"
            >
              {{ mdiMapOutline }}
            </v-icon>
          </v-avatar>
          <p
            class="text-truncate text-center mb-0"
            :class="selectedGymSpaceId === space.id ? 'font-weight-bold' : ''"
          >
            <small>
              {{ space.name }}
            </small>
          </p>
        </nuxt-link>
        <nuxt-link
          v-if="gymSpace"
          :to="`/gyms/${gym.id}/${gym.slug_name}/spaces`"
          class="gym-space-block text-center discrete-link inactive"
        >
          <v-avatar
            size="70"
            class="gym-space-avatar"
          >
            <v-icon size="25">
              {{ mdiAsterisk }}
            </v-icon>
          </v-avatar>
          <p class="text-truncate text-center mb-0">
            <small>
              Tous
            </small>
          </p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiMapOutline, mdiAsterisk } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'
import GymSpace from '~/models/GymSpace'

export default {
  name: 'GymSpaceSelector',
  mixins: [SessionConcern],
  props: {
    gymSpace: {
      type: Object,
      default: null
    },
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      selectedGymSpaceId: this.gymSpace?.id,
      gymSpaces: [],
      loadingGymSpaces: true,

      mdiMapOutline,
      mdiAsterisk
    }
  },

  mounted () {
    this.getAllGymSpace()
  },

  methods: {
    getAllGymSpace () {
      this.loadingGymSpaces = true
      this.gymSpaces = []
      new GymSpaceApi(this.$axios, this.$auth)
        .all(this.gym.id)
        .then((resp) => {
          for (const space of resp.data) {
            this.gymSpaces.push(new GymSpace({ attributes: space }))
          }
        }).catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymSpace')
        }).finally(() => {
          this.loadingGymSpaces = false
        })
    },

    goToSpace (space) {
      this.$router.push(space.path)
    },

    onChange () {
      if (this.loadingGymSpaces) { return }

      if (this.selectedGymSpaceId === 0) {
        this.$router.push(`${this.gymSpace.gymPath}/spaces/new`)
      } else {
        let selectedGymSpace = null

        for (const gymSpace of this.gymSpaces) {
          if (gymSpace.id === this.selectedGymSpaceId) {
            selectedGymSpace = gymSpace
          }
        }
        this.$router.push(`/gyms/${this.gym.id}/${this.gym.slug_name}/spaces/${this.selectedGymSpaceId}/${selectedGymSpace.slug_name}`)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.gym-spaces-selector {
  .gym-space-block {
    display: inline-block;
    width: 80px;
  }
  .gym-space-avatar {
    border-style: solid;
    border-width: 4px;
    transition: background-color 0.3s, border-color 0.3s;
    &:hover {
      background: rgba(49, 153, 78, 0.2) !important;
      border-color: rgba(49, 153, 78, 0.3) !important;
    }
  }
  .active {
    .gym-space-avatar {
      border-color: rgb(49, 153, 78);
      background: rgba(49, 153, 78, 0.2);
    }
  }
}
.theme--light {
  .gym-spaces-selector {
    .inactive {
      .gym-space-avatar {
        background-color: rgb(240, 240, 245);
        border-color: rgb(220, 220, 225);
      }
    }
  }
}
.theme--dark {
  .gym-spaces-selector {
    .inactive {
      .gym-space-avatar {
        background-color: rgb(37, 37, 37);
        border-color: rgb(57, 57, 57);
      }
    }
  }
}
</style>
