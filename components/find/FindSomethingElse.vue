<template>
  <div class="mt-15">
    <p class="mb-2 font-weight-bold">
      {{ $t('common.pages.find.somethingElse.title') }}
    </p>
    <v-row>
      <v-col v-if="exclude !== 'crags'">
        <v-sheet class="rounded-sm" outlined>
          <v-list-item
            link
            to="/find/crags"
          >
            <v-list-item-icon>
              <v-icon large color="primary">
                {{ mdiTerrain }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('common.pages.find.somethingElse.crag') }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t('common.pages.find.somethingElse.cragSubtitle') }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>
      </v-col>
      <v-col v-if="exclude !== 'gyms'">
        <v-sheet class="rounded-sm" outlined>
          <v-list-item
            link
            to="/find/gyms"
          >
            <v-list-item-icon>
              <v-icon large color="primary">
                {{ mdiOfficeBuildingMarkerOutline }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('common.pages.find.somethingElse.gym') }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t('common.pages.find.somethingElse.gymSubtitle') }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>
      </v-col>
      <v-col v-if="exclude !== 'guide-books'">
        <v-sheet class="rounded-sm" outlined>
          <v-list-item
            link
            to="/find/guide-books"
          >
            <v-list-item-icon>
              <v-icon large color="primary">
                {{ mdiBookshelf }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('common.pages.find.somethingElse.guideBook') }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t('common.pages.find.somethingElse.guideBookSubtitle') }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>
      </v-col>
      <v-col v-if="exclude !== 'climbers'">
        <v-sheet class="rounded-sm" outlined>
          <v-list-item
            link
            to="/find/climbers"
          >
            <v-list-item-icon>
              <v-icon large color="primary">
                {{ mdiAccountGroupOutline }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('common.pages.find.somethingElse.climbers') }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t('common.pages.find.somethingElse.climbersSubtitle') }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiTerrain, mdiBookshelf, mdiAccountGroupOutline, mdiOfficeBuildingMarkerOutline } from '@mdi/js'

export default {
  name: 'FindSomethingElse',
  props: {
    exclude: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      mdiTerrain,
      mdiBookshelf,
      mdiAccountGroupOutline,
      mdiOfficeBuildingMarkerOutline
    }
  }
}
</script>
