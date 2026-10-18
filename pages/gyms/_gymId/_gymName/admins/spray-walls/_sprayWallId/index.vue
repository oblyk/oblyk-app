<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs" />
    <div v-if="!gym || !sprayWall">
      Chargement ...
    </div>
    <div
      v-else
      class="d-flex"
    >
      <v-img
        :src="imageVariant(sprayWall.attachments.picture, { fit: 'scale-down', width: 720, height: 720 })"
        max-width="150"
        class="rounded mr-3"
      />
      <div>
        <div>
          <p class="mb-1">
            {{ sprayWall.title }}
            <v-btn
              icon
              small
              :to="`${sprayWall.admin_app_path}/edit`"
            >
              <v-icon small>
                {{ mdiPencil }}
              </v-icon>
            </v-btn>
          </p>
          <p>
            <v-chip
              v-if="sprayWall.draft"
              color="amber"
              small
            >
              Brouillon
            </v-chip>
            <strong>
              {{ sprayWall.spray_wall_holds_count }} prises
            </strong>
          </p>
        </div>
        <v-btn
          :to="`${sprayWall.admin_app_path}/studio`"
          outlined
          text
        >
          <v-icon left>
            {{ mdiVectorSquareEdit }}
          </v-icon>
          SprayWall Studio
        </v-btn>
        <v-btn
          v-if="sprayWall.draft"
          style="background-color: rgba(255, 193, 7, 0.2)"
          outlined
          text
          :loading="loadingPublish"
          @click="publish"
        >
          <v-icon left>
            {{ mdiPublish }}
          </v-icon>
          Publier
        </v-btn>
        <v-btn
          :to="sprayWall.app_path"
          outlined
          text
        >
          <v-icon left>
            {{ oblykSprayWall }}
          </v-icon>
          Page publique
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mdiVectorSquareEdit, mdiPencil, mdiPublish } from '@mdi/js'
import { oblykSprayWall } from 'assets/oblyk-icons'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern, ImageVariantHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      sprayWall: null,
      loadingPublish: false,

      mdiVectorSquareEdit,
      mdiPencil,
      mdiPublish,
      oblykSprayWall
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
        },
        {
          text: this.sprayWall?.title,
          to: `${this.gym?.adminPath}/spray-walls/${this.sprayWall?.id}`,
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getSprayWall()
  },

  methods: {
    getSprayWall () {
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.$route.params.gymId}/spray_walls/${this.$route.params.sprayWallId}`)
        .then((resp) => {
          this.sprayWall = resp.data
        })
        .finally(() => {
          this.loadingPublish = false
        })
    },

    publish () {
      this.loadingPublish = true
      new OblykApi(this.$axios, this.$auth)
        .put(`/gyms/${this.$route.params.gymId}/spray_walls/${this.$route.params.sprayWallId}/publish`)
        .then(() => {
          this.getSprayWall()
        })
    }
  }
}
</script>
