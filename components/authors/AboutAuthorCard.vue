<template>
  <div>
    <h2 class="loved-by-king">
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
    <v-card flat>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            {{ article.author.name }}
          </v-list-item-title>
          <v-list-item-content>
            <markdown-text
              v-if="article.author.description"
              :text="article.author.description"
            />
          </v-list-item-content>
        </v-list-item-content>
        <v-list-item-avatar
          tile
          size="150"
          color="grey"
        >
          <v-img :alt="article.author.name" :src="article.Author.coverUrl" />
        </v-list-item-avatar>
      </v-list-item>
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
