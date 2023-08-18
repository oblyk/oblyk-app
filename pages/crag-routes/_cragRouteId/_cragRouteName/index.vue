<template>
  <div>
    <div v-if="$fetchState.pending">
      <v-container>
        <v-skeleton-loader
          class="mx-auto"
          type="image, table-heading, divider, list-item-three-line, actions"
        />
      </v-container>
    </div>

    <div
      v-else
      class="crag-route-card mb-10"
    >
      <v-card>
        <crag-route-head :crag-route="cragRoute" />
        <v-container>
          <crag-route-description :crag-route="cragRoute" />
        </v-container>
      </v-card>

      <client-only>
        <!-- Ascents -->
        <v-card
          v-if="$auth.loggedIn"
          class="mt-5"
        >
          <v-container>
            <p class="mb-0">
              <v-icon left>
                {{ mdiCheckAll }}
              </v-icon>
              {{ $t('components.cragRoute.inMyLogbook') }}
            </p>
            <crag-route-ascent :crag-route="cragRoute" />
          </v-container>
        </v-card>
      </client-only>

      <!-- Comments -->
      <v-card class="mt-5">
        <v-container>
          <crag-route-comments :crag-route="cragRoute" />
        </v-container>
      </v-card>

      <!-- Photos -->
      <v-card class="mt-5">
        <v-container>
          <crag-route-photos lg-col="col-lg-4" :crag-route="cragRoute" />
        </v-container>
      </v-card>

      <!-- Videos -->
      <v-card class="mt-5">
        <v-container>
          <crag-route-videos lg-col="col-lg-4" :crag-route="cragRoute" />
        </v-container>
      </v-card>

      <v-row>
        <v-col cols="12">
          <version-information
            :object="cragRoute"
            object-type="cragRoute"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mdiCheckAll } from '@mdi/js'
import { CragRouteConcern } from '~/concerns/CragRouteConcern'
import CragRouteHead from '~/components/cragRoutes/layout/CragRouteHead'
import CragRouteDescription from '~/components/cragRoutes/CragRouteDescription'
import CragRouteComments from '~/components/cragRoutes/CragRouteComments'
import CragRoutePhotos from '~/components/cragRoutes/CragRoutePhotos'
import CragRouteVideos from '~/components/cragRoutes/CragRouteVideos'
import CragRouteAscent from '~/components/cragRoutes/CragRouteAscent'
import VersionInformation from '~/components/ui/VersionInformation'

export default {
  components: {
    VersionInformation,
    CragRouteAscent,
    CragRouteVideos,
    CragRoutePhotos,
    CragRouteComments,
    CragRouteDescription,
    CragRouteHead
  },
  mixins: [CragRouteConcern],

  data () {
    return {
      mdiCheckAll
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: '%{name} %{grade}, %{cragName}',
        metaDescription: "%{name} %{grade}, %{type} faisant partie du site d'escalade %{cragName}. voir le detail de la ligne : cotation, photo, avis, etc."
      },
      en: {
        metaTitle: '%{name} %{grade}, %{cragName}',
        metaDescription: '%{name} %{grade}, %{type} forming part of the climbing site %{cragName}. see the details of the line: grade, photo, opinion, etc.'
      }
    }
  },

  head () {
    return {
      title: this.cragMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.cragMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.cragMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.cragMetaDescription },
        { hid: 'og:image', property: 'og:image', content: this.cragMetaImage },
        { hid: 'og:url', property: 'og:url', content: this.cragMetaUrl }
      ]
    }
  },

  computed: {
    cragMetaTitle () {
      return this.$t(
        'metaTitle',
        {
          name: this.cragRoute?.name,
          grade: this.cragRoute?.grade_to_s,
          cragName: this.cragRoute?.crag?.name
        }
      )
    },
    cragMetaDescription () {
      return this.$t(
        'metaDescription',
        {
          name: this.cragRoute?.name,
          grade: this.cragRoute?.grade_to_s,
          type: this.$t(`models.climbs.${this.cragRoute?.climbing_type}`),
          cragName: this.cragRoute?.crag?.name
        }
      )
    },
    cragMetaImage () {
      if (this.cragRoute && this.cragRoute.photo) {
        return this.cragRoute.coverUrl
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    cragMetaUrl () {
      return `${process.env.VUE_APP_OBLYK_APP_URL}${this.cragRoute?.path}`
    }
  }
}
</script>

<style lang="scss" scoped>
.crag-route-card {
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
}
</style>
