<template>
  <v-container class="common-page-container">
    <v-sheet class="pa-4 rounded">
      <v-skeleton-loader
        v-if="!video"
        type="image"
      />
      <div v-else>
        <div v-html="video.iframe" />
        <div
          v-if="video.description"
          class="pa-4 mt-2 back-app-color rounded-sm"
        >
          <markdown-text
            v-if="video.description"
            :text="video.description"
          />
        </div>
        <v-row class="mt-2">
          <v-col cols="6" lg="6">
            <description-line
              :icon="mdiVideo"
              :item-title="$t('components.video.videoOf')"
              :item-value="video.viewable.name"
            />
          </v-col>
          <v-col cols="6" lg="3">
            <description-line
              :icon="mdiHeart"
              :item-title="$t('components.like.like')"
            >
              <template #content>
                <like-btn
                  :likeable-id="video.id"
                  likeable-type="Video"
                  :initial-like-count="video.likes_count"
                />
              </template>
            </description-line>
          </v-col>
          <v-col cols="12" lg="3">
            <description-line
              :icon="mdiAccount"
              :item-title="$t('components.video.postedBy')"
            >
              <template #content>
                <nuxt-link :to="`/climbers/${video.creator.slug_name}`">
                  {{ video.creator.first_name }}
                </nuxt-link>
              </template>
            </description-line>
          </v-col>
          <v-col
            v-if="$auth.loggedIn"
            cols="12"
            class="text-right"
          >
            <v-btn
              :to="`/reports/Photo/${video.id}/new?redirect_to=${$route.fullPath}`"
              :title="$t('actions.reportProblem')"
              outlined
              text
              icon
            >
              <v-icon small>
                {{ mdiFlag }}
              </v-icon>
            </v-btn>
            <v-btn
              v-if="video.creator.uuid === $auth.user.uuid"
              text
              outlined
              :to="`${video.path}/edit?redirect_to=${$route.fullPath}`"
            >
              {{ $t('actions.edit') }}
            </v-btn>
            <v-btn
              v-if="video.creator.uuid === $auth.user.uuid"
              text
              outlined
              :loading="deletingVideo"
              @click.stop="deleteVideo()"
            >
              {{ $t('actions.delete') }}
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-sheet>
  </v-container>
</template>

<script>
import { mdiVideo, mdiHeart, mdiAccount, mdiFlag } from '@mdi/js'
import { VideoConcern } from '~/concerns/VideoConcern'
import DescriptionLine from '~/components/ui/DescriptionLine.vue'
import LikeBtn from '~/components/forms/LikeBtn.vue'
import VideoApi from '~/services/oblyk-api/VideoApi'
const MarkdownText = () => import('~/components/ui/MarkdownText')

export default {
  components: {
    LikeBtn,
    DescriptionLine,
    MarkdownText
  },
  mixins: [VideoConcern],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Vidéo'
      },
      en: {
        metaTitle: 'Video'
      }
    }
  },

  data () {
    return {
      deletingVideo: false,

      mdiVideo,
      mdiHeart,
      mdiAccount,
      mdiFlag
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  methods: {
    deleteVideo () {
      if (confirm(this.$t('actions.areYouSur'))) {
        this.deletingVideo = true
        new VideoApi(this.$axios, this.$auth)
          .delete(this.video.id)
          .then(() => {
            this.$router.push('/')
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'video')
            this.deletingVideo = false
          })
      }
    }
  }
}
</script>
