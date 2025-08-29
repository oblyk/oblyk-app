<template>
  <v-row>
    <v-col>
      <v-sheet class="pa-4 rounded">

        <!-- Crag -->
        <description-line
          :icon="mdiTerrain"
          :item-title="$t('components.cragSector.sectorOf')"
          class="mb-5"
        >
          <template #content>
            <v-btn
              :to="cragSector.Crag.path"
              elevation="0"
              text
              outlined
              class="pl-1"
            >
              <v-avatar size="28" class="mr-2">
                <v-img :src="imageVariant(cragSector.Crag.attachments.cover, { fit: 'scale-down', width: 100, height: 100 })" />
              </v-avatar>
              {{ cragSector.Crag.name }}
            </v-btn>
          </template>
        </description-line>

        <v-row>
          <!-- Orientation -->
          <v-col>
            <description-line
              :icon="mdiCompass"
              :item-title="$t('components.input.orientations')"
              :item-value="orientations"
            />
          </v-col>
          <v-col v-if="cragSector.elevation">
            <!-- Elevation -->
            <description-line
              :icon="mdiArrowExpandUp"
              :item-title="$t('components.cragSector.elevation')"
              :item-value="parseInt(cragSector.elevation)"
              :item-suffix="$t('common.meters')"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <!-- Rain -->
            <description-line
              :icon="mdiWeatherPouring"
              :item-title="$t('components.input.rain')"
              :item-value="cragSector.rain ? $t(`models.rains.${cragSector.rain}`) : null"
            />
          </v-col>
          <v-col>
            <!-- Sun -->
            <description-line
              :icon="mdiWeatherSunny"
              :item-title="$t('components.input.sun')"
              :item-value="cragSector.sun ? $t(`models.suns.${cragSector.sun}`) : null"
            />
          </v-col>
        </v-row>

        <!-- Lines -->
        <description-line
          class="mt-5"
          :icon="mdiSourceBranch"
          :item-title="$t('components.crag.lines')"
        >
          <template #content>
            {{ cragSector.routes_figures.count }} {{ $t('components.crag.lines') }}.
            <span
              v-if="cragSector.routes_figures.count > 0"
              v-html="$t('components.crag.rangingFrom', {
                min: cragSector.routes_figures.grade.min_text,
                max: cragSector.routes_figures.grade.max_text
              })"
            />
          </template>
        </description-line>
        <div class="text-right">
          <contributions-label
            version-type="cragSector"
            :version-id="cragSector.id"
            :versions-count="cragSector.versions_count"
          />
          <client-only>
            <v-btn
              v-if="$auth.loggedIn"
              :to="`${cragSector.aPath}/edit`"
              text
              outlined
              class="ml-4"
            >
              {{ $t('actions.edit') }}
            </v-btn>
          </client-only>
        </div>
      </v-sheet>
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
import {
  mdiTerrain,
  mdiCompass,
  mdiArrowExpandUp,
  mdiWeatherPouring,
  mdiWeatherSunny,
  mdiSourceBranch
} from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import ContributionsLabel from '@/components/globals/ContributionsLable'
import CommentList from '@/components/comments/CommentList'
import DescriptionLine from '~/components/ui/DescriptionLine'

export default {
  name: 'CragSectorDescription',
  components: { DescriptionLine, CommentList, ContributionsLabel },
  mixins: [ImageVariantHelpers],
  props: {
    cragSector: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiTerrain,
      mdiCompass,
      mdiArrowExpandUp,
      mdiWeatherPouring,
      mdiWeatherSunny,
      mdiSourceBranch
    }
  },

  computed: {
    orientations () {
      if (this.cragSector.orientations.length > 0) {
        return this.cragSector.orientations.map((climb) => { return this.$t(`models.crag.${climb}`) }).join(', ')
      } else {
        return null
      }
    }
  }
}
</script>
