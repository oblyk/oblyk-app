<template>
  <v-container>
    <spinner v-if="!gym" />
    <div v-else>
      <v-breadcrumbs :items="breadcrumbs" />
      <div class="d-flex mb-2">
        <h1>
          <v-icon left large color="primary">
            {{ oblykSprayWall }}
          </v-icon>
          Spray Wall
        </h1>
        <v-btn
          class="ml-auto"
          text
          outlined
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
      <v-list
        v-else-if="sprayWalls.length > 0"
        rounded
      >
        <v-list-item
          v-for="(sprayWall, sprayWallIndex) in sprayWalls"
          :key="`spray-wall-index-${sprayWallIndex}`"
        >
          <v-list-item-avatar tile size="50">
            <v-img
              class="rounded-sm"
              :src="imageVariant(sprayWall.attachments.picture, { fit: 'scale-down', width: 720, height: 720 })"
              max-width="50"
              min-width="50"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ sprayWall.title }}</v-list-item-title>
            <v-list-item-subtitle>
              <v-chip
                v-if="sprayWall.draft"
                color="amber"
                small
              >
                Brouillon
              </v-chip>
              {{ sprayWall.spray_wall_holds_count }} prises
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon :to="`${gym.adminPath}/spray-walls/${sprayWall.id}`">
              <v-icon color="primary">
                {{ mdiArrowRight }}
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
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
import { mdiArrowRight, mdiPlus } from '@mdi/js'
import { oblykSprayWall } from '~/assets/oblyk-icons'
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

      mdiArrowRight,
      oblykSprayWall,
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
