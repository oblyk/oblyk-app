<template>
  <div>
    <!-- Next version and place of sale -->
    <v-row>
      <v-col v-if="guideBookPaper.next_guide_book_paper">
        <guide-book-paper-next-version
          class="mb-5"
          :guide-book-paper="guideBookPaper.next_guide_book_paper"
        />
      </v-col>
      <v-col>
        <v-card class="full-height">
          <guide-book-paper-place-of-sale :guide-book-paper="guideBookPaper" />
        </v-card>
      </v-col>
      <v-col v-if="guideBookPaper.haveArticles">
        <guide-book-paper-articles :guide-book-paper="guideBookPaper" />
      </v-col>
    </v-row>

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
      object-type="GuideBookPaper"
    />
  </div>
</template>

<script>
import { mdiComment } from '@mdi/js'
import GuideBookPaperPlaceOfSale from '@/components/guideBookPapers/GuideBookPaperPlaceOfSales'
import GuideBookPaperArticles from '@/components/guideBookPapers/GuideBookPaperArticles'
import GuideBookPaperNextVersion from '@/components/guideBookPapers/GuideBookPaperNextVersion'
import CommentList from '~/components/comments/CommentList'
import VersionInformation from '~/components/ui/VersionInformation'

export default {
  components: {
    VersionInformation,
    CommentList,
    GuideBookPaperNextVersion,
    GuideBookPaperArticles,
    GuideBookPaperPlaceOfSale
  },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiComment
    }
  }
}
</script>
