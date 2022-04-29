<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        {{ mdiInformation }}
      </v-icon>
      {{ $t('common.informations') }}
    </v-card-title>
    <v-card-text>
      <!-- Alerts list-->
      <alert-list :object-id="crag.id" object-type="Crag" />

      <v-simple-table class="no-hover-table">
        <template #default>
          <tbody>
            <!-- Climbing type -->
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('models.crag.climbing_types') }}
              </th>
              <td>
                <span v-if="crag.climbingTypes.length > 0">
                  {{ crag.climbingTypes.map((climb) => { return $t(`models.crag.${climb}`) }).join(', ') }}
                </span>
                <span v-else class="text--disabled">
                  {{ $t('common.noInformation') }}
                </span>
              </td>
            </tr>

            <!-- Rocks -->
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('models.crag.rocks') }}
              </th>
              <td>
                <span v-if="crag.rocks.length > 0">
                  {{ crag.rocks.map((rock) => { return $t(`models.rocks.${rock}`) }).join(', ') }}
                </span>
                <span v-else class="text--disabled">
                  {{ $t('common.noInformation') }}
                </span>
              </td>
            </tr>

            <!-- Seasons -->
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('models.crag.seasons') }}
              </th>
              <td>
                <span v-if="crag.seasons.length > 0">
                  {{ crag.seasons.map((season) => { return $t(`models.crag.${season}`) }).join(', ') }}
                </span>
                <span v-else class="text--disabled">
                  {{ $t('common.noInformation') }}
                </span>
              </td>
            </tr>

            <!-- Lines -->
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('components.crag.lines') }}
              </th>
              <td>
                {{ crag.routes_figures.route_count }} {{ $t('components.crag.lines') }}.
                <span
                  v-if="crag.routes_figures.route_count > 0"
                  v-html="$t('components.crag.rangingFrom', {
                    min: crag.routes_figures.grade.min_text,
                    max: crag.routes_figures.grade.max_text
                  })"
                />
              </td>
            </tr>

            <!-- Localization -->
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('components.crag.localization') }}
              </th>
              <td>
                {{ crag.city }}, {{ crag.region }}, {{ crag.country }}
              </td>
            </tr>
            <tr>
              <th class="smallest-table-column text-right" />
              <td>
                {{ latLng }}
                <qr-code-btn :value="latLng" />
                <!--<copy-btn :message="latLng" />-->
                <go-to-crag-modal :crag="crag" />
              </td>
            </tr>

            <!-- Orientations -->
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('components.crag.orientations') }}
              </th>
              <td>
                {{ crag.orientations.map((climb) => { return $t(`models.crag.${climb}`) }).join(', ') }}
              </td>
            </tr>

            <!-- Elevation -->
            <tr v-if="crag.elevation">
              <th class="smallest-table-column text-right">
                {{ $t('components.crag.elevation') }}
              </th>
              <td>
                {{ parseInt(crag.elevation) }} {{ $t('common.meters') }}
              </td>
            </tr>

            <!-- Areas -->
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('components.crag.group') }}
              </th>
              <td>
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
                    v-if="isLoggedIn"
                    :title="$t('components.crag.addOnArea')"
                    icon
                    small
                    fab
                    :to="`/a${crag.path}/add-on-area`"
                  >
                    <v-icon>
                      {{ mdiPlus }}
                    </v-icon>
                  </v-btn>
                </client-only>
              </td>
            </tr>

            <!-- Contribution -->
            <tr>
              <td colspan="2" class="text-right">
                <contributions-label
                  version-type="crag"
                  :version-id="crag.id"
                  :versions-count="crag.versions_count"
                />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>

    <!-- Around climbers -->
    <climbers-around :latitude="crag.latitude" :longitude="crag.longitude" />
  </v-card>
</template>

<script>
import { mdiInformation, mdiPlus } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import ContributionsLabel from '@/components/globals/ContributionsLable'
import QrCodeBtn from '@/components/forms/QrCodeBtn'
// import CopyBtn from '@/components/ui/CopyBtn'
import AlertList from '@/components/alerts/AlertList'
import GoToCragModal from '@/components/crags/GoToCragModal'
import ClimbersAround from '@/components/partners/ClimbersAround'

export default {
  name: 'CragInfo',
  components: {
    ClimbersAround,
    GoToCragModal,
    AlertList,
    // CopyBtn,
    QrCodeBtn,
    ContributionsLabel
  },
  mixins: [SessionConcern],
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiInformation,
      mdiPlus,
      latLng: `${this.crag.latitude}, ${this.crag.longitude}`
    }
  }
}
</script>
