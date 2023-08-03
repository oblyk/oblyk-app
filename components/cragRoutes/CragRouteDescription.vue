<template>
  <div>
    <v-row>
      <v-col class="col-12 col-md-6">
        <v-simple-table class="no-hover-table">
          <template #default>
            <tbody>
              <!-- Crag -->
              <tr>
                <th
                  :title="$t('models.cragRoute.crag')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>{{ mdiTerrain }}</v-icon>
                </th>
                <td>
                  <nuxt-link
                    :to="cragRoute.Crag.path"
                  >
                    {{ cragRoute.Crag.name }}
                  </nuxt-link>
                </td>
              </tr>

              <!-- Difficulty appreciation -->
              <tr>
                <th
                  :title="$t('models.cragRoute.difficulty_appreciation')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>{{ mdiGauge }}</v-icon>
                </th>
                <td>
                  <crag-route-difficulty-modal
                    v-if="cragRoute.difficulty_appreciation"
                    :crag-route="cragRoute"
                  />
                  <cite
                    v-else
                    class="text--disabled"
                  >
                    {{ $t('components.difficulty.noVote') }}
                  </cite>
                </td>
              </tr>

              <!-- Open year -->
              <tr>
                <th
                  :title="$t('models.cragRoute.open_year')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>{{ mdiCalendar }}</v-icon>
                </th>
                <td>
                  <span v-if="cragRoute.open_year">
                    {{ cragRoute.open_year }}
                  </span>
                  <cite
                    v-else
                    class="text--disabled"
                  >
                    {{ $t('common.noInformation') }}
                  </cite>
                </td>
              </tr>

              <!-- Incline -->
              <tr v-if="cragRoute.sections.length === 1">
                <th
                  :title="$t('models.cragRoute.incline_type')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>{{ mdiAngleAcute }}</v-icon>
                </th>
                <td>
                  <span v-if="cragRoute.sections[0].incline_type">
                    {{ $t(`models.inclineType.${cragRoute.sections[0].incline_type}`) }}
                  </span>
                  <cite
                    v-else
                    class="text--disabled"
                  >
                    {{ $t('common.noInformation') }}
                  </cite>
                </td>
              </tr>

              <!-- Anchor -->
              <tr v-if="cragRoute.sections.length === 1 && isAnchorable(cragRoute.climbing_type)">
                <th
                  :title="$t('models.cragRoute.anchor_type')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>{{ mdiSourceFork }}</v-icon>
                </th>
                <td>
                  <span v-if="cragRoute.sections[0].anchor_type">
                    {{ $t(`models.anchorType.${cragRoute.sections[0].anchor_type}`) }}
                  </span>
                  <cite
                    v-else
                    class="text--disabled"
                  >
                    {{ $t('common.noInformation') }}
                  </cite>
                </td>
              </tr>

              <!-- Reception -->
              <tr v-if="cragRoute.sections.length === 1 && isReceptionable(cragRoute.climbing_type)">
                <th
                  :title="$t('models.cragRoute.reception_type')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>{{ mdiCropSquare }}</v-icon>
                </th>
                <td>
                  <span v-if="cragRoute.sections[0].reception_type">
                    {{ $t(`models.receptionType.${cragRoute.sections[0].reception_type}`) }}
                  </span>
                  <cite
                    v-else
                    class="text--disabled"
                  >
                    {{ $t('common.noInformation') }}
                  </cite>
                </td>
              </tr>

              <!-- Ascension count -->
              <tr v-if="cragRoute.ascents_count > 0">
                <th class="smallest-table-column text-right">
                  <v-icon>{{ mdiCheckAll }}</v-icon>
                </th>
                <td>
                  {{ $tc('components.ascent.countInfos', cragRoute.ascents_count, { count: cragRoute.ascents_count }) }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col class="col-12 col-md-6">
        <v-simple-table class="no-hover-table">
          <template #default>
            <tbody>
              <!-- Note -->
              <tr>
                <th
                  :title="$t('models.cragRoute.note')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>{{ mdiStarHalfFull }}</v-icon>
                </th>
                <td>
                  <crag-route-note-modal
                    v-if="cragRoute.note"
                    :crag-route="cragRoute"
                  />
                  <cite
                    v-else
                    class="text--disabled"
                  >
                    {{ $t('components.note.noVote') }}
                  </cite>
                </td>
              </tr>

              <!-- Sector -->
              <tr v-if="cragRoute.crag_sector">
                <th
                  :title="$t('models.cragRoute.crag_sector')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>{{ mdiTextureBox }}</v-icon>
                </th>
                <td>
                  <nuxt-link
                    v-if="cragRoute.crag_sector.id"
                    :to="cragRoute.CragSector.path"
                  >
                    {{ cragRoute.CragSector.name }}
                  </nuxt-link>
                  <cite
                    v-else
                    class="text--disabled"
                  >
                    {{ $t('common.noInformation') }}
                  </cite>
                </td>
              </tr>

              <!-- Climbing Type -->
              <tr>
                <th
                  :title="$t('models.cragRoute.climbing_type')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>{{ mdiSourceBranch }}</v-icon>
                </th>
                <td
                  class="climbs-pastille"
                  :class="cragRoute.climbing_type"
                >
                  {{ $t(`models.climbs.${cragRoute.climbing_type}`) }}
                </td>
              </tr>

              <!-- Height -->
              <tr>
                <th
                  :title="$t('models.cragRoute.height')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>{{ mdiArrowExpandVertical }}</v-icon>
                </th>
                <td>
                  <span v-if="cragRoute.height">
                    {{ cragRoute.height }} {{ $t('common.meters') }}
                  </span>
                  <cite
                    v-else
                    class="text--disabled"
                  >
                    {{ $t('common.noInformation') }}
                  </cite>
                </td>
              </tr>

              <!-- Bolt -->
              <tr v-if="cragRoute.sections.length === 1 && isBoltable(cragRoute.climbing_type)">
                <th
                  :title="$t('models.cragRoute.bolt_type')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>{{ mdiNut }}</v-icon>
                </th>
                <td>
                  <span v-if="cragRoute.sections[0].bolt_type">
                    {{ $t(`models.boltType.${cragRoute.sections[0].bolt_type}`) }}
                  </span>
                  <cite
                    v-else
                    class="text--disabled"
                  >
                    {{ $t('common.noInformation') }}
                  </cite>
                </td>
              </tr>

              <!-- Start -->
              <tr v-if="cragRoute.sections.length === 1 && isStartable(cragRoute.climbing_type)">
                <th
                  :title="$t('models.cragRoute.start_type')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>{{ mdiArrowExpandUp }}</v-icon>
                </th>
                <td>
                  <span v-if="cragRoute.sections[0].start_type">
                    {{ $t(`models.startType.${cragRoute.sections[0].start_type}`) }}
                  </span>
                  <cite
                    v-else
                    class="text--disabled"
                  >
                    {{ $t('common.noInformation') }}
                  </cite>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row v-if="cragRoute.opener">
      <v-col>
        <v-simple-table class="no-hover-table">
          <template #default>
            <tbody>
              <tr>
                <th
                  :title="$t('models.cragRoute.opener')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>
                    {{ mdiBolt }}
                  </v-icon>
                </th>
                <td>
                  <span v-if="cragRoute.opener">
                    {{ cragRoute.opener }}
                  </span>
                  <cite
                    v-else
                    class="text--disabled"
                  >
                    {{ $t('common.noInformation') }}
                  </cite>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <div v-if="cragRoute.sections.length > 1">
      <v-divider class="mt-3 mb-5" />
      <p>
        <v-icon left>
          {{ mdiSourceBranch }}
        </v-icon>
        {{ $t('components.cragRoute.pitches') }}
      </p>
      <crag-route-section-list :crag-route="cragRoute" />
    </div>
  </div>
</template>

<script>
import {
  mdiTerrain,
  mdiGauge,
  mdiCalendar,
  mdiAngleAcute,
  mdiSourceFork,
  mdiCropSquare,
  mdiStarHalfFull,
  mdiTextureBox,
  mdiSourceBranch,
  mdiArrowExpandVertical,
  mdiNut,
  mdiArrowExpandUp,
  mdiBolt,
  mdiCheckAll
} from '@mdi/js'
import CragRouteSectionList from '@/components/cragRoutes/CragRouteSectionList'
import CragRouteNoteModal from '@/components/cragRoutes/partial/CragRouteNoteModal'
import CragRouteDifficultyModal from '@/components/cragRoutes/partial/CragRouteDifficultyModal'
import { CragRouteHelpers } from '~/mixins/CragRouteHelpers'

export default {
  name: 'CragRouteDescription',
  components: {
    CragRouteDifficultyModal,
    CragRouteNoteModal,
    CragRouteSectionList
  },
  mixins: [
    CragRouteHelpers
  ],
  props: {
    cragRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiTerrain,
      mdiGauge,
      mdiCalendar,
      mdiAngleAcute,
      mdiSourceFork,
      mdiCropSquare,
      mdiStarHalfFull,
      mdiTextureBox,
      mdiSourceBranch,
      mdiArrowExpandVertical,
      mdiNut,
      mdiArrowExpandUp,
      mdiBolt,
      mdiCheckAll
    }
  }
}
</script>
