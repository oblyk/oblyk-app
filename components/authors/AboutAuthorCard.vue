<template>
  <div>
    <h2 class="mb-3">
      <v-icon left>
        {{ mdiFountainPenTip }}
      </v-icon>
      {{ $t('components.article.aboutAuthor') }}
      <span v-if="isLoggedIn && loggedInUser.id === article.author.user_id">
        <v-btn
          :to="`/a${article.Author.path}/edit?redirect_to=${$route.fullPath}`"
          icon
        >
          <v-icon small>
            {{ mdiPencil }}
          </v-icon>
        </v-btn>
        <v-btn
          :to="`/a${article.Author.path}/cover?redirect_to=${$route.fullPath}`"
          icon
        >
          <v-icon small>
            {{ mdiImageEdit }}
          </v-icon>
        </v-btn>
      </span>
    </h2>

    <!-- About card -->
    <v-card flat>
      <v-avatar
        class="float-right ml-5"
        rounded
        size="115"
        color="grey"
      >
        <v-img :alt="article.author.name" :src="article.Author.coverUrl" />
      </v-avatar>
      <markdown-text
        v-if="article.author.description"
        :text="article.author.description"
      />
      <div class="clear-both" />
    </v-card>
  </div>
</template>

<script>
import { mdiPencil, mdiImageEdit, mdiFountainPenTip } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'AboutAuthorCard',
  components: { MarkdownText },
  mixins: [SessionConcern],
  props: {
    article: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiPencil,
      mdiImageEdit,
      mdiFountainPenTip
    }
  }
}
</script>
