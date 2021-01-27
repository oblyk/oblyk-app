<template>
  <div>
    <p>
      <v-icon left>
        mdi-comment-account
      </v-icon>
      {{ $t('components.cragRoute.climberOpinion') }}
    </p>
    <comment-list
      :commentable-id="cragRoute.id"
      commentable-type="CragRoute"
      m-top-no-comment="mt-1"
    />
  </div>
</template>

<script>
import CommentList from '@/components/comments/CommentList'

export default {
  name: 'CragRouteComments',
  components: { CommentList },
  props: {
    cragRoute: Object
  }
}
</script>
