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
          :crag="comment.commentable"
          small
          bordered
        />
        <crag-sector-small-card
          v-if="comment.commentable_type === 'CragSector'"
          :crag-sector="comment.commentable"
        />
        <crag-route-small-card
          v-if="comment.commentable_type === 'CragRoute'"
          :crag-route="comment.commentable"
        />
        <article-card
          v-if="comment.commentable_type === 'Article'"
          :article="comment.commentable"
        />
        <guide-book-paper-small-card
          v-if="comment.commentable_type === 'GuideBookPaper'"
          :guide-book-paper="comment.commentable"
        />
        <area-small-card
          v-if="comment.commentable_type === 'Area'"
          :area="comment.commentable"
        />
        <gym-small-card
          v-if="comment.commentable_type === 'Gym'"
          :gym="comment.commentable"
        />
        <gym-route-list-item
          v-if="comment.commentable_type === 'GymRoute' || (comment.commentable_type === 'Ascent' && comment.commentable.gym_route_id !== null)"
          :gym-route="comment.commentable"
          :relative-path="false"
        />
        <publication-card
          v-if="comment.commentable_type === 'Publication'"
          :publication="comment.commentable"
          bordered
        />
        <comment-card
          v-if="comment.commentable_type === 'Comment'"
          :comment="comment.commentable"
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
const PublicationCard = () => import('~/components/publications/PublicationCard')
const GymRouteListItem = () => import('~/components/gymRoutes/GymRouteListItem')
const GymSmallCard = () => import('~/components/gyms/GymSmallCard')
const AreaSmallCard = () => import('~/components/areas/AreaSmallCard')
const GuideBookPaperSmallCard = () => import('~/components/guideBookPapers/GuideBookPaperSmallCard')
const CragRouteSmallCard = () => import('~/components/cragRoutes/CragRouteSmallCard')
const CragSectorSmallCard = () => import('~/components/cragSectors/CragSectorSmallCard')
const ArticleCard = () => import('~/components/articles/ArticleCard')
const CragSmallCard = () => import('~/components/crags/CragSmallCard')

export default {
  components: {
    CommentCard,
    PublicationCard,
    GymRouteListItem,
    GymSmallCard,
    AreaSmallCard,
    GuideBookPaperSmallCard,
    CragRouteSmallCard,
    CragSectorSmallCard,
    ArticleCard,
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
  }
}
</script>
