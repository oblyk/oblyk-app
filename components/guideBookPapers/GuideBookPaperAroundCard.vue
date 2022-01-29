<template>
  <div>
    <v-card flat>
      <v-list-item
        three-line
        link
        @click="openCard = !openCard"
      >
        <v-list-item-avatar
          rounded="0"
          size="70"
        >
          <v-img
            :src="guideBookPaper.thumbnailCoverUrl"
            contain
            max-width="70px"
            max-height="70px"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            <v-row>
              <v-col cols="10" class="text-truncate pr-0">
                <span class="vertical-align-middle">
                  <v-chip
                    v-if="guideBookPaper.fundingAttributes.displayed"
                    outlined
                    class="pr-1 pl-1 mr-1 mb-1"
                    small
                    :color="guideBookPaper.fundingAttributes.color"
                  >
                    <v-icon
                      small
                      :title="$t(guideBookPaper.fundingAttributes.labelKey)"
                    >
                      {{ guideBookPaper.fundingAttributes.icon }}
                    </v-icon>
                  </v-chip>
                  {{ guideBookPaper.name }} - {{ guideBookPaper.publication_year }}
                </span>
              </v-col>
              <v-col cols="2" class="text-right pt-1">
                <subscribe-btn
                  subscribe-type="GuideBookPaper"
                  :subscribe-id="guideBookPaper.id"
                  :large="false"
                  followed-color="deep-purple"
                  followed-icon="mdi-bookshelf"
                  unfollowed-icon="mdi-bookshelf"
                  subscribe-label="actions.addToLibrary"
                  unsubscribe-label="actions.removeFromLibrary"
                />
              </v-col>
            </v-row>
          </v-list-item-title>
          <v-list-item-subtitle class="mt-n2 mb-4">
            <v-alert
              dense
              class="d-inline-block mr-1 mb-0 pl-2 pr-2 pt-0 pb-0"
              text
              v-html="$tc('components.guideBookPaperFind.crags', cragIn.length, { count: cragIn.length })"
            />
            <span v-if="cragOut.length !== 0">
              {{ $tc('components.guideBookPaperFind.withMoreCrag', cragOut.length, { count: cragOut.length, dist: dist }) }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-expand-transition>
        <div
          v-if="openCard"
          class="ml-4 mr-4"
        >
          <v-row>
            <v-col>
              <p class="text-decoration-underline mb-1">
                {{ $tc('components.guideBookPaperFind.cragsInGuide', cragIn.length, { count: cragIn.length, dist: dist, city: place.city }) }}
              </p>
              <div>
                <div
                  v-for="(crag, index) in cragIn"
                  :key="`crag-${crag.id}-${index}`"
                >
                  <div v-if="index < cragListLimite">
                    <crag-small-card
                      :crag="recordToObject('Crag', crag)"
                      :small="true"
                    />
                  </div>
                  <div
                    v-if="index === cragListLimite"
                    class="text-center"
                  >
                    <v-btn
                      text
                      small
                      color="primary"
                      @click="cragListLimite = cragIn.length"
                    >
                      {{ $tc('components.guideBookPaperFind.seeMore', cragIn.length - cragListLimite, { count: cragIn.length - cragListLimite }) }}
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col>
              <p class="text-decoration-underline mb-1">
                {{ $t('components.guideBookPaperFind.cragsMap') }}
              </p>
              <div class="guide-book-around-map">
                <client-only>
                  <leaflet-map
                    class="rounded"
                    map-style="outdoor"
                    :geo-jsons="geoJson"
                    :clustered="false"
                    :track-location="false"
                    :latitude-force="place.lat"
                    :longitude-force="place.lng"
                    :zoom-force="10"
                    :circle-properties="circleProperties"
                  />
                </client-only>
              </div>
            </v-col>
          </v-row>
          <div class="text-right pb-3">
            <v-btn
              outlined
              color="primary"
              :to="guideBookPaper.path"
            >
              {{ $t('common.moreInformation') }}
            </v-btn>
          </div>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import { RecordToObjectHelpers } from '@/mixins/RecordToObjectHelpers'
import SubscribeBtn from '@/components/forms/SubscribeBtn'
import CragSmallCard from '@/components/crags/CragSmallCard'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'GuideBookPaperAroundCard',
  components: { LeafletMap, CragSmallCard, SubscribeBtn },
  mixins: [RecordToObjectHelpers],
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    },
    cragIn: {
      type: Array,
      required: true
    },
    cragOut: {
      type: Array,
      required: true
    },
    dist: {
      type: Number,
      required: true
    },
    place: {
      type: Object,
      required: true
    },
    geoJson: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      openCard: false,
      cragListLimite: 5
    }
  },

  computed: {
    circleProperties () {
      return {
        radius: this.dist * 1000,
        center: [this.place.lat, this.place.lng],
        color: '#43a047',
        weight: 1,
        fill: true,
        dashArray: [10, 5],
        fillColor: '#43a047',
        fillOpacity: 0.1
      }
    }
  },

  watch: {
    openCard () {
      if (this.openCard === true) {
        setTimeout(() => {
          this.$root.$emit('fitMapOnGeoJsonBounds')
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .guide-book-around-map {
    width: 100%;
    height: 380px;
  }
</style>