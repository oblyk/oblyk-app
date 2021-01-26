<template>
  <div>
    <v-row>
      <v-col class="col-12 col-md-6">
        <v-simple-table class="no-hover-table">
          <template v-slot:default>
            <tbody>

              <!-- Name -->
              <tr>
                <th
                  :title="$t('models.cragRoute.name')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>mdi-format-letter-case</v-icon>
                </th>
                <td>
                  <crag-route-avatar :crag-route="cragRoute" />
                  {{ cragRoute.name }}
                </td>
              </tr>

              <!-- Crag -->
              <tr>
                <th
                  :title="$t('models.cragRoute.crag')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>mdi-terrain</v-icon>
                </th>
                <td>
                  <router-link
                    :to="cragRoute.Crag.path()"
                  >
                    {{ cragRoute.Crag.name }}
                  </router-link>
                </td>
              </tr>

              <!-- Difficulty appreciation -->
              <tr>
                <th
                  :title="$t('models.cragRoute.models.cragRoute.difficulty_appreciation')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>mdi-gauge</v-icon>
                </th>
                <td>
                  Difficulté
                </td>
              </tr>

              <!-- Open year -->
              <tr>
                <th
                  :title="$t('models.cragRoute.climbing_type')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>mdi-calendar</v-icon>
                </th>
                <td>
                  {{ cragRoute.open_year }}
                </td>
              </tr>

              <!-- Incline -->
              <tr v-if="cragRoute.sections.length === 1">
                <th
                  :title="$t('models.cragRoute.incline_type')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>mdi-angle-acute</v-icon>
                </th>
                <td>
                  <span v-if="cragRoute.sections[0].incline_type">
                    {{ $t(`models.inclineType.${cragRoute.sections[0].incline_type}`) }}
                  </span>
                </td>
              </tr>

              <!-- Anchor -->
              <tr v-if="cragRoute.sections.length === 1 && cragRoute.isAnchorable">
                <th
                  :title="$t('models.cragRoute.anchor_type')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>mdi-source-fork</v-icon>
                </th>
                <td>
                  <span v-if="cragRoute.sections[0].anchor_type">
                    {{ $t(`models.anchorType.${cragRoute.sections[0].anchor_type}`) }}
                  </span>
                </td>
              </tr>

              <!-- Reception -->
              <tr v-if="cragRoute.sections.length === 1 && cragRoute.isReceptionable">
                <th
                  :title="$t('models.cragRoute.reception_type')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>mdi-crop-square</v-icon>
                </th>
                <td>
                  <span v-if="cragRoute.sections[0].reception_type">
                    {{ $t(`models.receptionType.${cragRoute.sections[0].reception_type}`) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col class="col-12 col-md-6">
        <v-simple-table class="no-hover-table">
          <template v-slot:default>
            <tbody>

              <!-- Note -->
              <tr>
                <th
                  :title="$t('models.cragRoute.note')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>mdi-star-half-full</v-icon>
                </th>
                <td>
                  <crag-route-note :route="cragRoute" />
                </td>
              </tr>

              <!-- Sector -->
              <tr>
                <th
                  :title="$t('models.cragRoute.crag_sector')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>mdi-texture-box</v-icon>
                </th>
                <td>
                  <router-link
                    v-if="cragRoute.crag_sector.id"
                    :to="cragRoute.CragSector.path()"
                  >
                    {{ cragRoute.CragSector.name }}
                  </router-link>
                </td>
              </tr>

              <!-- Climbing Type -->
              <tr>
                <th
                  :title="$t('models.cragRoute.climbing_type')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>mdi-source-branch</v-icon>
                </th>
                <td
                  class="climbs-pastille"
                  v-bind:class="cragRoute.climbing_type"
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
                  <v-icon>mdi-arrow-expand-vertical</v-icon>
                </th>
                <td>
                <span v-if="cragRoute.height">
                  {{ cragRoute.height }} {{ $t('common.meters') }}
                </span>
                </td>
              </tr>

              <!-- Bolt -->
              <tr v-if="cragRoute.sections.length === 1 && cragRoute.isBoltable">
                <th
                  :title="$t('models.cragRoute.bolt_type')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>mdi-nut</v-icon>
                </th>
                <td>
                  <span v-if="cragRoute.sections[0].bolt_type">
                    {{ $t(`models.boltType.${cragRoute.sections[0].bolt_type}`) }}
                  </span>
                </td>
              </tr>

              <!-- Start -->
              <tr v-if="cragRoute.sections.length === 1 && cragRoute.isStartable">
                <th
                  :title="$t('models.cragRoute.start_type')"
                  class="smallest-table-column text-right"
                >
                  <v-icon>mdi-arrow-expand-up</v-icon>
                </th>
                <td>
                  <span v-if="cragRoute.sections[0].start_type">
                    {{ $t(`models.startType.${cragRoute.sections[0].start_type}`) }}
                  </span>
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
          <template v-slot:default>
            <tbody>
              <tr>
                <th
                  :title="$t('models.cragRoute.opener')"
                  class="smallest-table-column text-right">
                  <v-icon>
                    mdi-bolt
                  </v-icon>
                </th>
                <td>
                  {{ cragRoute.opener }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <div v-if="cragRoute.sections.length > 1">
      <crag-route-section-list :crag-route="cragRoute" />
    </div>

    <div class="text-right">
      <contributions-label
        version-type="cragRoute"
        :version-id="cragRoute.id"
        :versions-count="cragRoute.versions_count"
      />
    </div>

    <div>
      <p>
        <v-icon left>
          mdi-comment-account
        </v-icon>
        {{ $t('components.cragRoute.climberOpinion') }}
      </p>
      <comment-list
        :commentable-id="cragRoute.id"
        commentable-type="CragRoute"
        m-top-no-comment="mt-1"
      />
    </div>
  </div>
</template>

<script>
import CragRouteAvatar from '@/components/cragRoutes/partial/CragRouteAvatar'
import CragRouteNote from '@/components/cragRoutes/partial/CragRouteNote'
import CragRouteSectionList from '@/components/cragRoutes/CragRouteSectionList'
import ContributionsLabel from '@/components/globals/ContributionsLable'
import CommentList from '@/components/comments/CommentList'
export default {
  name: 'CragRouteDescription',
  components: { CommentList, ContributionsLabel, CragRouteSectionList, CragRouteNote, CragRouteAvatar },
  props: {
    cragRoute: Object
  }
}
</script>
