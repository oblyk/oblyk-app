<template>
  <v-card class="full-height rounded-lg">
    <v-card-title>
      <h2 class="h2-title-in-card-title">
        <v-icon left>
          {{ mdiComment }}
        </v-icon>
        {{ $t('components.crag.opinion') }}
      </h2>
    </v-card-title>
    <v-card-text>
      <comment-list
        :commentable-id="crag.id"
        commentable-type="Crag"
        m-top-no-comment="mt-2"
        add-comment-translate-key="actions.addOpinion"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiComment } from '@mdi/js'
import CommentList from '@/components/comments/CommentList'

export default {
  name: 'CragComment',
  components: { CommentList },
  props: {
    crag: {
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
