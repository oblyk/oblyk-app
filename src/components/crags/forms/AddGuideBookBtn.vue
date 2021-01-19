<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>mdi-plus</v-icon>
        {{ $t('actions.addGuideBook') }}
      </v-btn>
    </template>
    <v-list>
      <!-- Paper guide book -->
      <v-list-item
        link
        :to="crag.path('add-on-guide-book')"
      >
        <v-list-item-icon>
          <v-icon>mdi-book-open-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.guideBookPaper.fullName') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Pdf guide book -->
      <v-list-item
        link
        :to="`${crag.path('new-pdf-guide-book')}?redirect_to=${$route.fullPath}`"
      >
        <v-list-item-icon>
          <v-icon>mdi-file-pdf</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.guideBookPdf.fullName') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Web guide book -->
      <v-list-item
        link
        :to="`${crag.path('new-web-guide-book')}?redirect_to=${$route.fullPath}`"
      >
        <v-list-item-icon>
          <v-icon>mdi-web</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.guideBookWeb.fullName') }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'AddGuideBookBtn',
  props: {
    crag: Object
  }
}
</script>
