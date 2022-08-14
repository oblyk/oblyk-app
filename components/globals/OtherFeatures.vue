<template>
  <div>
    <h4 class="mb-2">
      {{ $t('components.otherFeatures.title') }}
    </h4>
    <v-row>
      <v-col v-if="noThisFeature !== '/guide-books/features'">
        <v-sheet class="rounded-sm" outlined>
          <v-list-item
            link
            to="/guide-books/features"
          >
            <v-list-item-icon>
              <v-icon large color="primary">
                {{ mdiBookshelf }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('components.otherFeatures.links.guide.title') }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t('components.otherFeatures.links.guide.subtitle') }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>
      </v-col>
      <v-col v-if="noThisFeature !== '/about/partner-search'">
        <v-sheet class="rounded-sm" outlined>
          <v-list-item
            link
            to="/about/partner-search"
          >
            <v-list-item-icon>
              <v-icon large color="primary">
                {{ mdiAccountGroupOutline }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('components.otherFeatures.links.partner.title') }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t('components.otherFeatures.links.partner.subtitle') }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiBookshelf, mdiAccountGroupOutline } from '@mdi/js'

export default {
  name: 'OtherFeatures',
  props: {
    noThisFeature: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      mdiBookshelf,
      mdiAccountGroupOutline
    }
  }
}
</script>
