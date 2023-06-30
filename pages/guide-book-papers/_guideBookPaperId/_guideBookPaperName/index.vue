<template>
  <div>
    <v-sheet
      rounded
      color="mb-4"
    >
      <h2 class="text-h6 pa-3">
        <v-icon left>
          {{ mdiTerrain }}
        </v-icon>
        {{ $t('components.guideBookPaper.cragsTitle', { name: guideBookPaper.name }) }}
      </h2>
      <v-skeleton-loader
        v-if="crags === null"
        type="text, text, text"
      />
      <guide-book-paper-crags
        v-if="crags"
        :crags-data="crags"
        :guide-book-paper="guideBookPaper"
      />
    </v-sheet>

    <!-- Articles -->
    <guide-book-paper-articles
      v-if="guideBookPaper.haveArticles"
      :guide-book-paper="guideBookPaper"
      class="mb-4"
    />

    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="pb-0 text-h6 font-weight-regular">
            <v-icon left small>
              {{ mdiComment }}
            </v-icon>
            {{ $t('components.comment.climbersComments') }}
          </v-card-title>
          <v-card-text>
            <comment-list
              :commentable-id="guideBookPaper.id"
              commentable-type="GuideBookPaper"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <version-information
      class="mt-4"
      :object="guideBookPaper"
      object-type="guideBookPaper"
    />
  </div>
</template>

<script>
import { mdiComment, mdiTerrain } from '@mdi/js'
import GuideBookPaperArticles from '@/components/guideBookPapers/GuideBookPaperArticles'
import CommentList from '~/components/comments/CommentList'
import VersionInformation from '~/components/ui/VersionInformation'
import GuideBookPaperApi from '~/services/oblyk-api/GuideBookPaperApi'
import GuideBookPaperCrags from '~/components/guideBookPapers/GuideBookPaperCrags'

export default {
  components: {
    GuideBookPaperCrags,
    VersionInformation,
    CommentList,
    GuideBookPaperArticles
  },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      crags: null,

      mdiComment,
      mdiTerrain
    }
  },

  async fetch () {
    await new GuideBookPaperApi(
      this.$axios,
      this.$store
    ).cragsFigures(
      this.$route.params.guideBookPaperId
    ).then((resp) => {
      this.crags = resp.data
    })
  }
}
</script>
