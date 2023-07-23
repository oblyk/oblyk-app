<template>
  <v-container class="common-page-container">
    <v-sheet class="pa-4 rounded">
      <v-skeleton-loader
        v-if="!photo"
        type="image"
      />
      <div v-else>
        <v-img
          class="rounded-sm"
          :src="photo.pictureUrl"
          :lazy-src="photo.thumbnailUrl"
        >
          <template #placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-row>
          </template>
        </v-img>
        <div
          v-if="photo.description"
          class="pa-4 mt-2 back-app-color rounded-sm"
        >
          <markdown-text
            v-if="photo.description"
            :text="photo.description"
          />
        </div>
        <v-row class="mt-2">
          <v-col cols="6" lg="6">
            <description-line
              :icon="mdiCamera"
              :item-title="$t('components.photo.photoOf')"
              :item-value="photo.illustrable.name"
            />
          </v-col>
          <v-col cols="6" lg="3">
            <description-line
              :icon="mdiHeart"
              :item-title="$t('components.like.like')"
            >
              <template #content>
                <like-btn
                  :likeable-id="photo.id"
                  likeable-type="Photo"
                  :initial-like-count="photo.likes_count"
                />
              </template>
            </description-line>
          </v-col>
          <v-col cols="12" lg="3">
            <description-line
              :icon="mdiAccount"
              :item-title="$t('components.photo.postedBy')"
            >
              <template #content>
                <nuxt-link :to="`/climbers/${photo.creator.slug_name}`">
                  {{ photo.creator.first_name }}
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
              :to="`/reports/Photo/${photo.id}/new?redirect_to=${$route.fullPath}`"
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
              v-if="photo.creator.uuid === $auth.user.uuid"
              text
              outlined
              :to="`${photo.path}/edit?redirect_to=${$route.fullPath}`"
            >
              {{ $t('actions.edit') }}
            </v-btn>
            <v-btn
              v-if="photo.creator.uuid === $auth.user.uuid"
              text
              outlined
              :loading="deletingPhoto"
              @click.stop="deletePhoto()"
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
import { mdiCamera, mdiHeart, mdiFlag, mdiAccount } from '@mdi/js'
import { PhotoConcern } from '~/concerns/PhotoConcern'
import DescriptionLine from '~/components/ui/DescriptionLine.vue'
import LikeBtn from '~/components/forms/LikeBtn.vue'
import PhotoApi from '~/services/oblyk-api/PhotoApi'
const MarkdownText = () => import('~/components/ui/MarkdownText')

export default {
  components: { LikeBtn, DescriptionLine, MarkdownText },
  mixins: [PhotoConcern],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Photo'
      },
      en: {
        metaTitle: 'Photo'
      }
    }
  },

  data () {
    return {
      deletingPhoto: false,

      mdiCamera,
      mdiHeart,
      mdiFlag,
      mdiAccount
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  methods: {
    deletePhoto () {
      if (confirm(this.$t('actions.areYouSur'))) {
        this.deletingPhoto = true
        new PhotoApi(this.$axios, this.$auth)
          .delete(this.photo.id)
          .then(() => {
            this.$router.push('/')
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'photo')
            this.deletingPhoto = false
          })
      }
    }
  }
}
</script>
