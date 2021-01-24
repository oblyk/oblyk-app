<template>
  <v-row>
    <v-col>
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
            <span v-if="cragSector.orientations().length > 0">
              {{ cragSector.orientations().map((climb) => { return $t(`models.crag.${climb}`) }).join(', ') }}
            </span>
                <cite v-else class="text--disabled">
                  {{ $t('common.noInformation')}}
                </cite>
              </td>
            </tr>
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('components.input.rain') }} :
              </th>
              <td>
            <span v-if="cragSector.rain">
              {{ $t(`models.rains.${cragSector.rain}`) }}
            </span>
                <cite v-if="!cragSector.rain" class="text--disabled">
                  {{ $t('common.noInformation')}}
                </cite>
              </td>
            </tr>
            <tr>
              <th class="smallest-table-column text-right">
                {{ $t('components.input.sun') }} :
              </th>
              <td>
            <span v-if="cragSector.sun">
              {{ $t(`models.suns.${cragSector.sun}`) }}
            </span>
                <cite v-if="!cragSector.sun" class="text--disabled">
                  {{ $t('common.noInformation')}}
                </cite>
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
    cragSector: Object
  }
}
</script>
