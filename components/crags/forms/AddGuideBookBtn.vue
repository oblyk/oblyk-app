<template>
  <v-menu offset-y>
    <template #activator="{ on, attrs }">
      <v-btn
        text
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>
          {{ mdiPlus }}
        </v-icon>
        {{ $t('actions.addGuideBook') }}
      </v-btn>
    </template>
    <v-list>
      <!-- Paper guide book -->
      <v-list-item
        link
        :to="`/a${crag.path}/add-on-guide-book`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiBookOpenVariant }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.guideBookPaper.fullName') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Pdf guide book -->
      <v-list-item
        link
        :to="`/a${crag.path}/new-pdf-guide-book?redirect_to=${$route.fullPath}`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiFilePdfBox }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.guideBookPdf.fullName') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Web guide book -->
      <v-list-item
        link
        :to="`/a${crag.path}/new-web-guide-book?redirect_to=${$route.fullPath}`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiWeb }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.guideBookWeb.fullName') }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mdiPlus, mdiBookOpenVariant, mdiFilePdfBox, mdiWeb } from '@mdi/js'

export default {
  name: 'AddGuideBookBtn',
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiPlus,
      mdiBookOpenVariant,
      mdiFilePdfBox,
      mdiWeb
    }
  }
}
</script>
