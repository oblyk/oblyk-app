<template>
  <v-list-group
    :prepend-icon="mdiBookOpenVariant"
    no-action
  >
    <template #activator>
      <v-list-item-content>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.guideBook.title') }}
        </v-list-item-title>
      </v-list-item-content>
    </template>

    <v-list-item to="/guide-book-papers/find">
      <v-list-item-icon>
        <v-icon>
          {{ mdiMapMarkerRadiusOutline }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.guideBookPaper.findGuideBook') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item to="/library">
      <v-list-item-icon>
        <v-icon>
          {{ mdiAlertDecagram }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.guideBook.news') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item to="/guide-books/features">
      <v-list-item-icon>
        <v-icon>
          {{ mdiAlertDecagram }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.guideBook.features') }}
      </v-list-item-title>
    </v-list-item>
  </v-list-group>
</template>

<script>
import { mdiBookOpenVariant, mdiMapMarkerRadiusOutline, mdiAlertDecagram, mdiStarCircleOutline } from '@mdi/js'

export default {
  name: 'AppDrawerGuideBook',

  data () {
    return {
      mdiBookOpenVariant,
      mdiMapMarkerRadiusOutline,
      mdiAlertDecagram,
      mdiStarCircleOutline
    }
  }
}
</script>
