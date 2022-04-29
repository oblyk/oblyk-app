<template>
  <v-row>
    <v-col>
      <v-simple-table class="no-hover-table">
        <template #default>
          <tbody>
            <!-- Crag name -->
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('components.cragSector.sectorOf') }} :
              </th>
              <td>
                <nuxt-link
                  :to="cragSector.Crag.path"
                >
                  {{ cragSector.Crag.name }}
                </nuxt-link>
              </td>
            </tr>

            <!-- Orientation -->
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('components.input.orientations') }} :
              </th>
              <td>
                <span v-if="cragSector.orientations.length > 0">
                  {{ cragSector.orientations.map((climb) => { return $t(`models.crag.${climb}`) }).join(', ') }}
                </span>
                <cite v-else class="text--disabled">
                  {{ $t('common.noInformation') }}
                </cite>
              </td>
            </tr>

            <!-- Elevation -->
            <tr v-if="cragSector.elevation">
              <th class="smallest-table-column text-right">
                {{ $t('components.cragSector.elevation') }} :
              </th>
              <td>
                {{ parseInt(cragSector.elevation) }} {{ $t('common.meters') }}
              </td>
            </tr>

            <!-- Rain -->
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('components.input.rain') }} :
              </th>
              <td>
                <span v-if="cragSector.rain">
                  {{ $t(`models.rains.${cragSector.rain}`) }}
                </span>
                <cite v-if="!cragSector.rain" class="text--disabled">
                  {{ $t('common.noInformation') }}
                </cite>
              </td>
            </tr>

            <!-- Sun -->
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('components.input.sun') }} :
              </th>
              <td>
                <span v-if="cragSector.sun">
                  {{ $t(`models.suns.${cragSector.sun}`) }}
                </span>
                <cite v-if="!cragSector.sun" class="text--disabled">
                  {{ $t('common.noInformation') }}
                </cite>
              </td>
            </tr>

            <!-- Lines -->
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('components.crag.lines') }} :
              </th>
              <td>
                {{ cragSector.routes_figures.count }} {{ $t('components.crag.lines') }}.
                <span
                  v-if="cragSector.routes_figures.count > 0"
                  v-html=" $t('components.crag.rangingFrom', {
                    min: cragSector.routes_figures.grade.min_text,
                    max: cragSector.routes_figures.grade.max_text
                  })"
                />
              </td>
            </tr>

            <!-- Contribution -->
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
    </v-col>
    <v-col>
      <comment-list
        :commentable-id="cragSector.id"
        commentable-type="CragSector"
        m-top-no-comment="mt-0"
      />
    </v-col>
  </v-row>
</template>

<script>
import ContributionsLabel from '@/components/globals/ContributionsLable'
import CommentList from '@/components/comments/CommentList'

export default {
  name: 'CragSectorDescription',
  components: { CommentList, ContributionsLabel },
  props: {
    cragSector: {
      type: Object,
      required: true
    }
  }
}
</script>
