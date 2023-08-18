<template>
  <div>
    <div>
      <client-only>
        <div
          v-if="$auth.loggedIn"
          class="mt-2 mb-2"
        >
          <v-btn
            text
            outlined
            small
            color="primary"
            :to="`${crag.path}/maps/edit`"
          >
            <v-icon left>
              {{ mdiParking }}
            </v-icon>
            {{ $t('actions.addPark') }}
          </v-btn>
          <v-btn
            text
            outlined
            small
            color="primary"
            :to="`${crag.path}/maps/edit`"
          >
            <v-icon left>
              {{ mdiWalk }}
            </v-icon>
            {{ $t('actions.addApproach') }}
          </v-btn>
        </div>
      </client-only>

      <div v-if="approaches.length > 0" class="mb-7">
        <p class="mt-5">
          <v-icon small class="mr-1">
            {{ mdiWalk }}
          </v-icon>
          {{ $t('components.approach.cardTitle') }}
        </p>
        <div
          v-for="(approach, index) in approaches"
          :key="`approach-${index}`"
          class="mt-4"
        >
          <approach-card :approach="approach" />
        </div>
      </div>
    </div>

    <!-- Map -->
    <v-card>
      <v-card-title>
        <h2 class="h2-title-in-card-title">
          <v-icon left class="mr-1">
            {{ mdiMap }}
          </v-icon>
          {{ $t('components.map.title') }}
        </h2>
        <v-spacer />
        <client-only>
          <v-btn
            v-if="$auth.loggedIn"
            outlined
            text
            :to="`${crag.path}/maps/edit`"
          >
            {{ $t('actions.editMapElements') }}
          </v-btn>
        </client-only>
      </v-card-title>
      <v-card-text class="full-height">
        <v-img
          class="rounded"
          height="100%"
          width="100%"
          :src="crag.staticMapUrl"
        >
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-col class="text-center">
              <div>
                <v-btn
                  elevation="0"
                  dark
                  rounded
                  large
                  color="rgba(0,0,0,0.5)"
                  :to="`/maps/crags?lat=${crag.latitude}&lng=${crag.longitude}&zoom=16&crag_id=${crag.id}`"
                >
                  {{ $t('actions.seeMap') }}
                </v-btn>
              </div>
              <div>
                <small
                  class="d-inline-block font-weight-bold px-4 px-3 rounded mt-1 theme--dark"
                  style="background-color: rgba(255, 255, 255, 0.4)"
                >
                  {{ $t('models.park.names') }} · {{ $t('models.rockBar.sunshine') }} · {{ $t('components.approach.names') }}
                </small>
              </div>
            </v-col>
          </v-row>
        </v-img>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mdiParking, mdiWalk, mdiMap } from '@mdi/js'
import ApproachApi from '~/services/oblyk-api/ApproachApi'
import Approach from '~/models/Approach'
import ApproachCard from '~/components/approaches/ApproachCard.vue'

export default {
  name: 'CragMapDetailsView',
  components: { ApproachCard },
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      geoJsons: null,
      approaches: [],
      cragMapMetaTitle: this.$t('metaTitle', {
        name: this.crag?.name,
        region: this.crag?.region
      }),
      cragMapMetaDescription: this.$t('metaDescription', {
        name: this.crag?.name,
        region: this.crag?.region,
        city: this.crag?.city
      }),

      mdiParking,
      mdiWalk,
      mdiMap
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'La carte de %{name}, escalade en %{region}',
        metaDescription: "La carte de %{name} : site d'escalade à %{city} en %{region}"
      },
      en: {
        metaTitle: 'Map of %{name}, climb in %{region}',
        metaDescription: 'Map of %{name} : climbing crag in %{city} in %{region}'
      }
    }
  },

  head () {
    return {
      titleTemplate: this.cragMapMetaTitle,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.cragMapMetaTitle
        },
        {
          hid: 'description',
          name: 'description',
          content: this.cragMapMetaDescription
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.cragMapMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.crag.path}/maps`
        }
      ]
    }
  },

  mounted () {
    this.getApproaches()
  },

  methods: {
    getApproaches () {
      new ApproachApi(this.$axios, this.$auth)
        .all(this.crag.id)
        .then((resp) => {
          for (const approach of resp.data) {
            this.approaches.push(new Approach({ attributes: approach }))
          }
        })
    }
  }
}
</script>
