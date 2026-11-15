<template>
  <div class="gym-spaces-selector">
    <div v-if="loadingGymSpaces">
      <v-skeleton-loader class="d-inline-block" type="avatar" />
      <v-skeleton-loader class="d-inline-block" type="avatar" />
      <v-skeleton-loader class="d-inline-block" type="avatar" />
    </div>
    <div v-if="!loadingGymSpaces && (groups.length > 0 || ungroupedSpaces.length > 0)">
      <div
        id="gym-spaces-selector-overflow"
        class="text-no-wrap overflow-x-auto"
        @scrollend="saveScroll"
      >
        <!-- All spaces -->
        <nuxt-link
          :to="`/gyms/${gym.id}/${gym.slug_name}/spaces`"
          class="gym-space-block text-center discrete-link"
          :class="allGym ? 'active' : 'inactive'"
        >
          <v-avatar
            size="70"
            class="gym-space-avatar"
          >
            <v-img
              height="70"
              width="70"
              style="max-width: 70px"
              contain
              :src="imageVariant(gym.attachments.logo, { fit: 'scale-down', height: 100, width: 100 })"
            />
          </v-avatar>
          <p
            class="text-truncate text-center mb-0"
            :class="allGym ? 'font-weight-bold deep-purple--text text--accent-3' : ''"
          >
            <small>
              Salle
            </small>
          </p>
        </nuxt-link>

        <!-- Grouped spaces -->
        <div
          v-for="(group, groupIndex) in groups"
          :key="`gym-space-index-${groupIndex}`"
          class="d-inline-block gym-spaces-selector-groups"
        >
          <p class="text-center mb-1">
            <small class="font-weight-bold">
              {{ group.name }}
            </small>
          </p>
          <nuxt-link
            v-for="(space, gymSpaceIndex) in group.gym_spaces"
            :id="`gym-space-selector-${space.id}`"
            :key="`grouped-gym-space-index-${gymSpaceIndex}`"
            :to="space.app_path"
            class="gym-space-block text-center discrete-link"
            :class="parseInt(selectedGymSpaceId) === space.id ? 'active' : 'inactive'"
          >
            <v-avatar
              size="70"
              class="gym-space-avatar"
            >
              <v-img
                v-if="space.attachments.avatar.attached"
                :src="imageVariant(space.attachments.avatar, { fit: 'scale-down', height: 100, width: 100 })"
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
              :class="parseInt(selectedGymSpaceId) === space.id ? 'font-weight-bold deep-purple--text text--accent-3' : ''"
            >
              <small>
                {{ space.name }}
              </small>
            </p>
          </nuxt-link>
        </div>

        <!-- Ungrouped spaces -->
        <nuxt-link
          v-for="(space, gymSpaceIndex) in ungroupedSpaces"
          :id="`gym-space-selector-${space.id}`"
          :key="`ungrouped-gym-space-index-${gymSpaceIndex}`"
          :to="space.app_path"
          class="gym-space-block text-center discrete-link"
          :class="parseInt(selectedGymSpaceId) === space.id ? 'active' : 'inactive'"
        >
          <v-avatar
            size="70"
            class="gym-space-avatar"
          >
            <v-img
              v-if="space.attachments.avatar.attached"
              :src="imageVariant(space.attachments.avatar, { fit: 'scale-down', height: 100, width: 100 })"
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
            :class="parseInt(selectedGymSpaceId) === space.id ? 'font-weight-bold deep-purple--text text--accent-3' : ''"
          >
            <v-chip
              v-if="space.draft"
              color="amber"
              x-small
              class="px-1"
            >
              B
            </v-chip>
            <small>
              {{ space.name }}
            </small>
          </p>
        </nuxt-link>

        <!-- Spray Walls -->
        <nuxt-link
          v-for="(wall, sprayWallIndex) in sprayWalls"
          :id="`spray-wall-selector-${wall.id}`"
          :key="`spray-wall-index-${sprayWallIndex}`"
          :to="wall.app_path"
          class="gym-space-block text-center discrete-link"
          :class="parseInt(selectedSprayWallId) === wall.id ? 'active' : 'inactive'"
        >
          <v-avatar
            size="70"
            class="gym-space-avatar"
          >
            <v-img
              v-if="wall.attachments.picture.attached"
              :src="imageVariant(wall.attachments.picture, { fit: 'scale-down', height: 720, width: 720 })"
              height="62"
              width="62"
              cover
            />
            <v-icon
              v-else
              size="40"
            >
              {{ oblykSprayWall }}
            </v-icon>
          </v-avatar>
          <p
            class="text-truncate text-center mb-0"
            :class="parseInt(selectedSprayWallId) === wall.id ? 'font-weight-bold deep-purple--text text--accent-3' : ''"
          >
            <v-icon
              x-small
              :color="parseInt(selectedSprayWallId) === wall.id ? 'deep-purple accent-3' : 'primary'"
            >
              {{ oblykSprayWall }}
            </v-icon>
            <small>
              {{ wall.name }}
            </small>
          </p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiMapOutline } from '@mdi/js'
import { oblykSprayWall } from '~/assets/oblyk-icons'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'GymSpaceSelector',
  mixins: [ImageVariantHelpers],
  props: {
    selectedGymSpaceId: {
      type: [Number, String],
      default: null
    },
    selectedSprayWallId: {
      type: [Number, String],
      default: null
    },
    allGym: {
      type: Boolean,
      default: false
    },
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      gymSpaces: [],
      loadingGymSpaces: true,
      groups: [],
      ungroupedSpaces: [],
      sprayWalls: [],

      mdiMapOutline,
      oblykSprayWall
    }
  },

  mounted () {
    this.getAllGymSpace()
  },

  methods: {
    getAllGymSpace () {
      this.loadingGymSpaces = true
      this.gymSpaces = []
      this.groups = []
      this.ungroupedSpaces = []
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.gym.id}/gym_spaces/groups`)
        .then((resp) => {
          for (const group of resp.data.grouped_spaces) {
            const spaces = group.gym_spaces
            this.groups.push({
              name: group.name,
              id: group.id,
              order: group.order,
              gym_spaces: spaces
            })
          }
          this.ungroupedSpaces = resp.data.ungrouped_spaces
          this.sprayWalls = resp.data.spray_walls
          this.loadingGymSpaces = false
          if (this.selectedGymSpaceId) {
            setTimeout(() => {
              const spaceElement = document.querySelector(`#gym-space-selector-${this.selectedGymSpaceId}`)
              const savedScroll = localStorage.getItem(`gym-space-selector-scroll-${this.gym.id}`) || null
              const scrollLeft = savedScroll !== null ? savedScroll : spaceElement.scrollLeft
              document.querySelector('#gym-spaces-selector-overflow').scrollTo({
                left: scrollLeft
              })
            }, 100)
          }
          if (this.selectedSprayWallId) {
            setTimeout(() => {
              const sprayWallElement = document.querySelector(`#spray-wall-selector-${this.selectedSprayWallId}`)
              const savedScroll = localStorage.getItem(`gym-space-selector-scroll-${this.gym.id}`) || null
              const scrollLeft = savedScroll !== null ? savedScroll : sprayWallElement.scrollLeft
              document.querySelector('#gym-spaces-selector-overflow').scrollTo({
                left: scrollLeft
              })
            }, 100)
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
    },

    saveScroll (element) {
      localStorage.setItem(`gym-space-selector-scroll-${this.gym.id}`, element.target.scrollLeft)
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
  .gym-spaces-selector-groups {
    border-width: 3px;
    border-style: solid;
    border-radius: 6px;
    padding-left: 3px;
    padding-right: 3px;
    margin-right: 10px;
    border-color: rgb(240, 240, 245);
  }
  .gym-space-avatar {
    border-style: solid;
    border-width: 4px;
    transition: background-color 0.3s, border-color 0.3s;
  }
}
.theme--light {
  .gym-spaces-selector {
    .inactive {
      .gym-space-avatar {
        border-color: rgb(220, 220, 225);
        background-color: rgb(240, 240, 245);
      }
    }
    .active {
      .gym-space-avatar {
        border-color: #651FFF;
        background-color: rgb(240, 240, 245);
      }
    }
    .gym-space-avatar {
      &:hover {
        border-color: #651FFF !important;
        background-color: rgb(240, 240, 245);
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
    .active {
      .gym-space-avatar {
        border-color: #651FFF;
        background: rgba(255, 255, 255, 0.2);
      }
    }
    .gym-space-avatar {
      &:hover {
        background: rgba(255, 255, 255, 0.2) !important;
        border-color: #651FFF !important;
      }
    }
  }
  .gym-spaces-selector-groups {
    border-color: rgb(37, 37, 37);
  }
}
</style>
