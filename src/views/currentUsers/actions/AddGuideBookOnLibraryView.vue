<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('components.guideBookPaper.addGuideBookInMyLibrary') }}
          </h2>
          <p>
            {{ $t('components.guideBookPaper.addInLibraryPart1') }}
            <v-icon>mdi-bookshelf</v-icon>
            {{ $t('components.guideBookPaper.addInLibraryPart2') }}
          </p>
          <add-guide-book-on-library-form />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import AddGuideBookOnLibraryForm from '@/components/guideBookPaperCrags/forms/AddGuideBookOnLibraryForm'

export default {
  name: 'AddGuideBookOnLibraryView',
  components: { AddGuideBookOnLibraryForm },

  metaInfo () {
    return {
      title: this.$t('meta.currentUser.addGuideBook')
    }
  }
}
</script>
