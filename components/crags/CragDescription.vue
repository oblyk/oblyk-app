<template>
  <v-sheet class="pa-4 rounded">
    <v-row>
      <!-- Information -->
      <v-col class="col-12 col-md-6">
        <h2 class="h2-title-in-card-title mb-5">
          <v-icon left color="primary">
            {{ mdiInformation }}
          </v-icon>
          {{ $t('components.crag.information') }}
        </h2>

        <!-- Alerts list-->
        <alert-list
          :object-id="crag.id"
          object-type="Crag"
        />

        <v-row>
          <!-- Climbing type -->
          <v-col cols="12" md="6">
            <description-line
              :icon="mdiTerrain"
              :item-title="$t('models.crag.climbing_types')"
            >
              <template #content>
                <climbing-style-crag-chips
                  :crag="crag"
                />
              </template>
            </description-line>
          </v-col>

          <!-- Lines -->
          <v-col cols="12" md="6">
            <description-line
              :icon="mdiSourceBranch"
              :item-title="$t('components.crag.lines')"
            >
              <template #content>
                <div v-if="crag.routes_figures.route_count > 0">
                  <span class="text-lowercase">
                    <strong>{{ crag.routes_figures.route_count }}</strong> {{ $t('components.crag.lines') }}
                  </span>
                  <span
                    v-if="crag.routes_figures.route_count > 0"
                    class="text-lowercase"
                    v-html="$t('components.crag.rangingFrom', {
                      min: crag.routes_figures.grade.min_text,
                      max: crag.routes_figures.grade.max_text
                    })"
                  />
                  <v-btn
                    :to="`${crag.path}/routes`"
                    small
                    text
                    outlined
                    class="ml-1 vertical-align-bottom"
                  >
                    {{ $t('actions.see') }}
                    <v-icon right>
                      {{ mdiArrowRight }}
                    </v-icon>
                  </v-btn>
                </div>
                <p
                  v-else
                  class="mb-0 text--disabled"
                >
                  {{ $t('common.noInformation') }}
                </p>
              </template>
            </description-line>
          </v-col>

          <!-- Orientations -->
          <v-col cols="6">
            <description-line
              :icon="mdiCompass"
              :item-title="$t('components.crag.orientations')"
              :item-value="crag.orientations.map((orientation) => { return $t(`models.crag.${orientation}`) }).join(', ')"
            >
              <template #content>
                <compass
                  size="1.4em"
                  :orientations="crag.orientations"
                  class="mr-2 vertical-align-sub"
                />
                <span
                  v-if="crag.orientations.length === 0"
                  class="text--disabled"
                >
                  {{ $t('common.noInformation') }}
                </span>
                <strong v-if="crag.orientations.length > 0 && crag.orientations.length < 8">
                  {{ crag.orientations.map((orientation) => { return $t(`models.crag.${orientation}`) }).join(', ') }}
                </strong>
                <strong v-if="crag.orientations.length === 8">
                  {{ $t('models.orientations.all') }}
                </strong>
              </template>
            </description-line>
          </v-col>

          <!-- Elevation -->
          <v-col
            v-if="crag.elevation"
            cols="6"
          >
            <description-line
              :icon="mdiArrowExpandUp"
              :item-title="$t('components.crag.elevation')"
              :item-value="`${parseInt(crag.elevation)} ${$t('common.meters')}`"
            />
          </v-col>

          <!-- Rocks -->
          <v-col cols="6">
            <description-line
              :icon="mdiDiamond"
              :item-title="$t('models.crag.rocks')"
              :item-value="crag.rocks.map((rock) => { return $t(`models.rocks.${rock}`) }).join(', ')"
            />
          </v-col>

          <!-- Seasons -->
          <v-col cols="6">
            <description-line
              :icon="mdiLeafMaple"
              :item-title="$t('models.crag.seasons')"
            >
              <template #content>
                <seasons :seasons="crag.seasons" />
              </template>
            </description-line>
          </v-col>

          <!-- Rain -->
          <v-col cols="12" md="6">
            <description-line
              :icon="mdiWeatherPouring"
              :item-title="$t('models.crag.rain')"
              :item-value="crag.rain ? $t(`models.rains.${crag.rain}`) : null"
            />
          </v-col>

          <!-- Areas -->
          <v-col
            v-if="crag.Areas.length > 0"
            cols="12"
            md="6"
          >
            <description-line
              :icon="mdiUngroup"
              :item-title="$t('components.crag.group')"
            >
              <template #content>
                <div>
                  <nuxt-link
                    v-for="area in crag.Areas"
                    :key="`area-${area.id}`"
                    :to="area.path"
                  >
                    <v-chip
                      small
                      class="mr-1"
                    >
                      {{ area.name }}
                    </v-chip>
                  </nuxt-link>
                  <client-only>
                    <v-btn
                      v-if="$auth.loggedIn"
                      :title="$t('components.crag.addOnArea')"
                      icon
                      x-small
                      fab
                      :to="`${crag.path}/add-on-area`"
                    >
                      <v-icon>
                        {{ mdiPlus }}
                      </v-icon>
                    </v-btn>
                  </client-only>
                </div>
              </template>
            </description-line>
          </v-col>

          <!-- Approach time -->
          <v-col cols="12">
            <description-line
              :icon="mdiWalk"
              item-title="Temps d'approche"
            >
              <template #content>
                <strong v-if="crag.approaches.min_time !== crag.approaches.max_time">
                  de {{ crag.approaches.min_time }} à {{ crag.approaches.max_time }} minutes.
                </strong>
                <strong v-if="crag.approaches.min_time !== null && crag.approaches.min_time === crag.approaches.max_time">
                  {{ crag.approaches.min_time }} minutes.
                </strong>
                <span
                  v-if="crag.approaches.min_time === null"
                  class="text--disabled"
                >
                  {{ $t('common.noInformation') }}
                </span>
                <v-btn
                  v-if="crag.approaches.min_time !== null"
                  :to="`${crag.path}/maps`"
                  text
                  small
                  outlined
                  class="vertical-align-bottom"
                >
                  {{ $t('actions.see') }}
                  <v-icon right>
                    {{ mdiArrowRight }}
                  </v-icon>
                </v-btn>
              </template>
            </description-line>
          </v-col>

          <!-- Localization -->
          <v-col cols="12" class="text-center">
            <go-to-crag-modal :crag="crag" />
          </v-col>
        </v-row>
      </v-col>

      <!-- Map -->
      <v-col class="col-12 col-md-6">
        <h2 class="h2-title-in-card-title mb-2">
          <v-icon left color="primary">
            {{ mdiMap }}
          </v-icon>
          {{ $t('components.crag.locationAndAccess') }}
        </h2>
        <div>
          <strong>GPS :</strong>
          {{ latLng }}
          <client-only>
            <qr-code-btn :value="latLng" />
          </client-only>
        </div>
        <div style="height: calc(100% - 85px); min-height: 400px">
          <v-img
            class="rounded"
            height="100%"
            width="100%"
            :src="imageVariant(crag.attachments.static_map, { fit: 'scale-down', height: 1080, width: 1080 })"
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
                    color="primary"
                    rounded
                    large
                    :to="`/maps/crags?lat=${crag.latitude}&lng=${crag.longitude}&zoom=16&crag_id=${crag.id}`"
                  >
                    {{ $t('actions.seeMap') }}
                  </v-btn>
                </div>
                <div>
                  <small
                    class="d-inline-block font-weight-bold px-4 px-3 rounded mt-1"
                    style="background-color: rgba(255, 255, 255, 0.4)"
                  >
                    {{ $t('models.park.names') }} · {{ $t('models.rockBar.sunshine') }} · {{ $t('components.approach.names') }}
                  </small>
                </div>
              </v-col>
            </v-row>
          </v-img>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import {
  mdiInformation,
  mdiPlus,
  mdiTerrain,
  mdiDiamond,
  mdiLeafMaple,
  mdiSourceBranch,
  mdiCompass,
  mdiArrowExpandUp,
  mdiUngroup,
  mdiMap,
  mdiWalk,
  mdiWeatherPouring,
  mdiArrowRight
} from '@mdi/js'
import QrCodeBtn from '@/components/forms/QrCodeBtn'
import AlertList from '@/components/alerts/AlertList'
import GoToCragModal from '@/components/crags/GoToCragModal'
import DescriptionLine from '~/components/ui/DescriptionLine'
import Compass from '~/components/ui/Compass'
import Seasons from '~/components/ui/Seasons'
import ClimbingStyleCragChips from '~/components/crags/ClimbingStyleCragChips.vue'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'CragInfo',
  components: {
    ClimbingStyleCragChips,
    Seasons,
    Compass,
    DescriptionLine,
    GoToCragModal,
    AlertList,
    QrCodeBtn
  },
  mixins: [ImageVariantHelpers],
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      latLng: `${this.crag.latitude}, ${this.crag.longitude}`,

      mdiInformation,
      mdiPlus,
      mdiTerrain,
      mdiDiamond,
      mdiLeafMaple,
      mdiSourceBranch,
      mdiCompass,
      mdiArrowExpandUp,
      mdiUngroup,
      mdiMap,
      mdiWalk,
      mdiWeatherPouring,
      mdiArrowRight
    }
  }
}
</script>
