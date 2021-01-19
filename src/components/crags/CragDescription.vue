<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        mdi-information
      </v-icon>
      {{ $t('common.informations') }}
    </v-card-title>
    <v-card-text>
      <v-simple-table class="no-hover-table">
        <template v-slot:default>
          <tbody>
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('models.crag.climbing_types') }}
              </th>
              <td>
                <span v-if="crag.climbingTypes().length > 0">
                  {{ crag.climbingTypes().map((climb) => { return $t(`models.crag.${climb}`) }).join(', ') }}
                </span>
                <span v-else class="text--disabled">
                  {{ $t('common.noInformation') }}
                </span>
              </td>
            </tr>
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
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('models.crag.seasons') }}
              </th>
              <td>
                <span v-if="crag.seasons().length > 0">
                  {{ crag.seasons().map((season) => { return $t(`models.crag.${season}`) }).join(', ') }}
                </span>
                <span v-else class="text--disabled">
                  {{ $t('common.noInformation') }}
                </span>
              </td>
            </tr>
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('components.crag.lines') }}
              </th>
              <td>
                {{ crag.routes_figures.route_count }} {{ $t('components.crag.lines') }}.
                <span v-if="crag.routes_figures.route_count > 0">
                  {{
                    $t(
                      'components.crag.rangingFrom',
                      {
                        min: crag.routes_figures.grade.min_text,
                        max: crag.routes_figures.grade.max_text
                      }
                    )
                  }}
                </span>
              </td>
            </tr>
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
  </v-card>
</template>
<script>
import ContributionsLabel from '@/components/globals/ContributionsLable'
export default {
  name: 'CragInfo',
  components: { ContributionsLabel },
  props: {
    crag: Object
  }
}
</script>
