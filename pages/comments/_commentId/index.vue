<template>
  <v-container class="common-page-container">
    <v-sheet class="rounded pa-4">
      <v-skeleton-loader
        v-if="loadingComment"
        type="paragraph"
      />
      <div v-else>
        <p class="text-decoration-underline mb-1">
          {{ $t('components.comment.on') }}
        </p>
        <crag-small-card
          v-if="comment.commentable_type === 'Crag'"
          :crag="commentableObject"
          small
          bordered
        />
        <crag-sector-small-card
          v-if="comment.commentable_type === 'CragSector'"
          :crag-sector="commentableObject"
        />
        <crag-route-small-card
          v-if="comment.commentable_type === 'CragRoute'"
          :crag-route="commentableObject"
        />
        <article-feed-card
          v-if="comment.commentable_type === 'Article'"
          :article="commentableObject"
        />
        <guide-book-paper-small-card
          v-if="comment.commentable_type === 'GuideBookPaper'"
          :guide-book-paper="commentableObject"
        />
        <area-small-card
          v-if="comment.commentable_type === 'Area'"
          :area="commentableObject"
        />
        <gym-small-card
          v-if="comment.commentable_type === 'Gym'"
          :gym="commentableObject"
        />
        <comment-card
          v-if="comment.commentable_type === 'Comment'"
          :comment="commentableObject"
        />
        <comment-card
          class="mt-4"
          :comment="comment"
        />
      </div>
    </v-sheet>
  </v-container>
</template>

<script>
import { CommentConcern } from '~/concerns/CommentConcern'
import CommentCard from '~/components/comments/CommentCard'
import Crag from '~/models/Crag'
import Article from '~/models/Article'
import CragSector from '~/models/CragSector'
import CragRoute from '~/models/CragRoute'
import GuideBookPaper from '~/models/GuideBookPaper'
import Area from '~/models/Area'
import Gym from '~/models/Gym'
import Comment from '~/models/Comment'
const GymSmallCard = () => import('~/components/gyms/GymSmallCard')
const AreaSmallCard = () => import('~/components/areas/AreaSmallCard')
const GuideBookPaperSmallCard = () => import('~/components/guideBookPapers/GuideBookPaperSmallCard')
const CragRouteSmallCard = () => import('~/components/cragRoutes/CragRouteSmallCard')
const CragSectorSmallCard = () => import('~/components/cragSectors/CragSectorSmallCard')
const ArticleFeedCard = () => import('~/components/articles/ArticleFeedCard')
const CragSmallCard = () => import('~/components/crags/CragSmallCard')

export default {
  components: {
    CommentCard,
    GymSmallCard,
    AreaSmallCard,
    GuideBookPaperSmallCard,
    CragRouteSmallCard,
    CragSectorSmallCard,
    ArticleFeedCard,
    CragSmallCard
  },
  mixins: [CommentConcern],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Commentaire'
      },
      en: {
        metaTitle: 'Comment'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  computed: {
    commentableObject () {
      if (this.comment.commentable_type === 'Crag') {
        return new Crag({ attributes: this.comment.commentable })
      } else if (this.comment.commentable_type === 'CragSector') {
        return new CragSector({ attributes: this.comment.commentable })
      } else if (this.comment.commentable_type === 'CragRoute') {
        return new CragRoute({ attributes: this.comment.commentable })
      } else if (this.comment.commentable_type === 'Article') {
        return new Article({ attributes: this.comment.commentable })
      } else if (this.comment.commentable_type === 'GuideBookPaper') {
        return new GuideBookPaper({ attributes: this.comment.commentable })
      } else if (this.comment.commentable_type === 'Area') {
        return new Area({ attributes: this.comment.commentable })
      } else if (this.comment.commentable_type === 'Gym') {
        return new Gym({ attributes: this.comment.commentable })
      } else if (this.comment.commentable_type === 'Comment') {
        return new Comment({ attributes: this.comment.commentable })
      } else {
        return null
      }
    }
  }
}
</script>
