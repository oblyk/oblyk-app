<template>
  <v-container>
    <spinner v-if="!gym" />
    <div v-else>
      <v-breadcrumbs :items="breadcrumbs" />
      <div class="d-md-flex mb-2">
        <h1>
          <v-icon left large color="primary">
            {{ oblykSprayWall }}
          </v-icon>
          Spray Wall
        </h1>
        <v-btn
          class="ml-auto"
          color="deep-purple accent-3"
          dark
          elevation="0"
          :to="`${gym.adminPath}/spray-walls/new`"
        >
          <v-icon left>
            {{ mdiPlus }}
          </v-icon>
          Créer un SprayWall
        </v-btn>
      </div>
      <div v-if="loadingSprayWalls">
        Chargement ...
      </div>
      <div v-else-if="sprayWalls.length > 0">
        <v-list-item
          v-for="(sprayWall, sprayWallIndex) in sprayWalls"
          :key="`spray-wall-index-${sprayWallIndex}`"
          class="rounded v-list--three-line v-sheet mb-2 pl-2 pr-0"
        >
          <v-list-item-avatar
            tile
            size="90"
          >
            <v-img
              class="rounded-sm"
              :src="imageVariant(sprayWall.attachments.picture, { fit: 'scale-down', width: 720, height: 720 })"
              max-width="90"
              min-width="90"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              {{ sprayWall.title }}
              <v-chip
                v-if="sprayWall.draft"
                color="amber"
                x-small
              >
                Brouillon
              </v-chip>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ sprayWall.spray_wall_holds_count }} prises, {{ sprayWall.spray_wall_routes_count }} blocs
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-btn
                elevation="0"
                :small="$vuetify.breakpoint.mobile"
                :to="`${gym.adminPath}/spray-walls/${sprayWall.id}`"
              >
                <v-icon left>
                  {{ oblykAddHold }}
                </v-icon>
                Admin
              </v-btn>
              <v-btn
                elevation="0"
                :small="$vuetify.breakpoint.mobile"
                :to="sprayWall.app_path"
              >
                <v-icon
                  left
                  color="deep-purple accent-3"
                >
                  {{ oblykSprayWall }}
                </v-icon>
                Spray Wall
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
      <p
        v-else
        class="text-center text--disabled"
      >
        Vous n'avez pas encore de Spray Wall
      </p>
    </div>
  </v-container>
</template>

<script>
import { mdiPlus, mdiPencil } from '@mdi/js'
import { oblykSprayWall, oblykAddHold } from '~/assets/oblyk-icons'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import Spinner from '~/components/layouts/Spiner'
import OblykApi from '~/services/oblyk-api/OblykApi'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  components: { Spinner },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern, ImageVariantHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      loadingSprayWalls: true,
      sprayWalls: [],

      mdiPencil,
      oblykSprayWall,
      oblykAddHold,
      mdiPlus
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: `${this.gym?.adminPath}`,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.sprayWalls'),
          to: `${this.gym?.adminPath}/spray-walls`,
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getSprayWalls()
  },

  methods: {
    getSprayWalls () {
      this.loadingSprayWalls = true
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.$route.params.gymId}/spray_walls`)
        .then((resp) => {
          this.sprayWalls = resp.data
        })
        .finally(() => {
          this.loadingSprayWalls = false
        })
    }
  }
}
</script>
