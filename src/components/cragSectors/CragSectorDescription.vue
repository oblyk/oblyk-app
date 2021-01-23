<template>
  <v-simple-table class="no-hover-table">
    <template v-slot:default>
      <tbody>
        <tr>
          <th class="smallest-table-column text-right">
            {{ $t('components.cragSector.sectorOf') }} :
          </th>
          <td>
            <router-link
              :to="cragSector.Crag.path()"
            >
              {{ cragSector.Crag.name }}
            </router-link>
          </td>
        </tr>
        <tr>
          <th class="smallest-table-column text-right">
            {{ $t('components.input.orientations') }} :
          </th>
          <td>
            {{ cragSector.orientations().map((climb) => { return $t(`models.crag.${climb}`) }).join(', ') }}
          </td>
        </tr>
        <tr>
          <th class="smallest-table-column text-right">
            {{ $t('components.input.rain') }} :
          </th>
          <td>
            {{ $t(`models.rains.${cragSector.rain}`) }}
          </td>
        </tr>
        <tr>
          <th class="smallest-table-column text-right">
            {{ $t('components.input.sun') }} :
          </th>
          <td>
            {{ $t(`models.suns.${cragSector.sun}`) }}
          </td>
        </tr>
        <tr>
          <th class="smallest-table-column text-right">
            {{ $t('components.crag.lines') }} :
          </th>
          <td>
            {{ cragSector.routes_figures.route_count }} {{ $t('components.crag.lines') }}.
            <span v-if="cragSector.routes_figures.route_count > 0">
              {{
                $t(
                  'components.crag.rangingFrom',
                  {
                    min: cragSector.routes_figures.grade.min_text,
                    max: cragSector.routes_figures.grade.max_text
                  }
                )
              }}
            </span>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="text-right">
            <contributions-label
              version-type="cragSector"
              :version-id="cragSector.id"
              :versions-count="cragSector.versions_count"
            />
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import ContributionsLabel from '@/components/globals/ContributionsLable'
export default {
  name: 'CragSectorDescription',
  components: { ContributionsLabel },
  props: {
    cragSector: Object
  }
}
</script>
