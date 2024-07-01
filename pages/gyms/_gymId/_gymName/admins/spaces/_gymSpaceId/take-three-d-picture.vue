<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs" />
    <v-row v-if="gymSpace">
      <v-col cols="12" md="4">
        <v-btn
          block
          elevation="0"
          class="mb-3"
          text
          outlined
          :to="`${gymSpace.Gym.adminPath}/spaces/edit-three-d`"
        >
          <v-icon left>
            {{ mdiArrowLeft }}
          </v-icon>
          Retour à l'éditeur 3D
        </v-btn>
        <v-list-item class="border rounded mb-3 sheet-background-color">
          <v-list-item-avatar
            v-if="gymSpace.three_d_picture_tiny_thumbnail_url"
          >
            <v-img :src="gymSpace.three_d_picture_tiny_thumbnail_url" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ gymSpace.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-alert>
          Placez l'espace au mieux dans le cadre ci-contre et cliquez sur le bouton d'appareil photo
          en bas à droite pour prendre la capture de votre espace.
        </v-alert>

        <p class="text-decoration-underline mb-1 mt-5">
          Prendre les captures des autres espaces
        </p>
        <v-list
          v-if="!loadingGymSpaces"
          rounded
        >
          <v-list-item
            v-for="(space, spaceIndex) in gymSpaces"
            :key="`space-index-${spaceIndex}`"
            :to="`${gymSpace.Gym.adminPath}/spaces/${space.id}/take-three-d-picture`"
          >
            <v-list-item-avatar
              v-if="space.three_d_picture_tiny_thumbnail_url"
            >
              <v-img :src="space.three_d_picture_tiny_thumbnail_url" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ space.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col>
        <client-only>
          <div
            class="border rounded sheet-background-color"
            style="height: 500px; width: 500px"
          >
            <gym-space-three-d-picture
              v-if="gymSpace"
              :gym-space="gymSpace"
              :capture-callback="reSetGymSpace"
            />
          </div>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'
import { GymSpaceConcern } from '~/concerns/GymSpaceConcern'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'
import GymSpace from '~/models/GymSpace'
const GymSpaceThreeDPicture = () => import('~/components/gymSpaces/GymSpaceThreeDPicture')

export default {
  components: { GymSpaceThreeDPicture },
  meta: { orphanRoute: true },
  mixins: [GymSpaceConcern],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      gymSpaces: [],
      loadingGymSpaces: true,

      mdiArrowLeft
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.gymSpace?.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: `${this.gymSpace?.Gym?.adminPath}`,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.spaces'),
          exact: true
        },
        {
          text: this.$t('actions.edit'),
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getSpaces()
  },

  methods: {
    reSetGymSpace (gymSpace) {
      this.gymSpace = gymSpace
    },

    getSpaces () {
      this.loadingGymSpaces = true
      new GymSpaceApi(this.$axios, this.$auth)
        .all(
          this.$route.params.gymId
        )
        .then((resp) => {
          this.gymSpaces = []
          for (const space of resp.data) {
            this.gymSpaces.push(new GymSpace({ attributes: space }))
          }
        })
        .finally(() => {
          this.loadingGymSpaces = false
        })
    }
  }
}
</script>
