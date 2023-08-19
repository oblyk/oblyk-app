<template>
  <div>
    <div class="d-flex">
      <h2 class="mb-3">
        <v-icon left>
          {{ mdiFountainPenTip }}
        </v-icon>
        {{ $t('components.article.aboutAuthor') }}
      </h2>
      <div
        v-if="$auth.loggedIn && $auth.user.id === article.author.user_id"
        class="ml-auto"
      >
        <v-btn
          :to="`${article.Author.path}/edit?redirect_to=${$route.fullPath}`"
          icon
        >
          <v-icon small>
            {{ mdiPencil }}
          </v-icon>
        </v-btn>
        <v-btn
          :to="`${article.Author.path}/cover?redirect_to=${$route.fullPath}`"
          icon
        >
          <v-icon small>
            {{ mdiImageEdit }}
          </v-icon>
        </v-btn>
      </div>
    </div>

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
      <div class="px-3 py-3">
        <markdown-text
          v-if="article.author.description"
          :text="article.author.description"
        />
      </div>
      <div class="clear-both" />
    </v-card>
  </div>
</template>

<script>
import { mdiPencil, mdiImageEdit, mdiFountainPenTip } from '@mdi/js'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'AboutAuthorCard',
  components: { MarkdownText },
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
