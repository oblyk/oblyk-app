<template>
  <v-sheet class="pa-4 rounded">
    <client-only>
      <v-btn
        v-if="$auth.loggedIn"
        :to="`/photos/Crag/${crag.id}/new?redirect_to=${$route.fullPath}`"
        text
        color="primary"
      >
        <v-icon left>
          {{ mdiImagePlus }}
        </v-icon>
        {{ $t('actions.addPicture') }}
      </v-btn>
    </client-only>

    <photo-gallery
      environnement-type="crag"
      :environnement-object="crag"
      gallery-type="Crag"
      :gallery-id="crag.id"
    />

    <client-only>
      <!-- Load videos -->
      <spinner v-if="loadingVideos" :full-height="false" />

      <div v-if="!loadingVideos">
        <v-btn
          v-if="$auth.loggedIn"
          :to="`/videos/Crag/${crag.id}/new?redirect_to=${$route.fullPath}`"
          text
          color="primary"
        >
          <v-icon left>
            {{ mdiVideoPlus }}
          </v-icon>
          {{ $t('actions.addVideo') }}
        </v-btn>
        <v-row>
          <v-col
            v-for="video in videos"
            :key="`video-${video.id}`"
            class="col-12 col-md-6 col-lg-4"
          >
            <video-card
              :video="video"
              :get-videos="getVideos"
            />
          </v-col>
        </v-row>
        <p
          v-if="videos.length === 0"
          class="text-center text--disabled mt-5 mb-5"
        >
          {{ $t('components.video.noVideo') }}
        </p>
      </div>
    </client-only>
  </v-sheet>
</template>

<script>
import { mdiImagePlus, mdiVideoPlus } from '@mdi/js'
import CragApi from '@/services/oblyk-api/CragApi'
import Spinner from '@/components/layouts/Spiner'
import PhotoGallery from '@/components/photos/PhotoGallery'
import VideoCard from '@/components/videos/VideoCard'
import Video from '@/models/Video'

export default {
  name: 'CragPhotosView',
  components: {
    VideoCard,
    PhotoGallery,
    Spinner
  },
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingVideos: true,
      videos: [],
      cragPhotoMetaTitle: this.$t('metaTitle', {
        name: this.crag?.name,
        region: this.crag?.region
      }),
      cragPhotoMetaDescription: this.$t('metaDescription', {
        name: this.crag?.name,
        region: this.crag?.region,
        city: this.crag?.city
      }),

      mdiImagePlus,
      mdiVideoPlus
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Les photos de %{name}, escalade en %{region}',
        metaDescription: "Les photos de %{name} : site d'escalade à %{city} en %{region}"
      },
      en: {
        metaTitle: 'Pictures of %{name}, climb in %{region}',
        metaDescription: 'Pictures of %{name} : climbing crag in %{city} in %{region}'
      }
    }
  },

  head () {
    return {
      titleTemplate: this.cragPhotoMetaTitle,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.cragPhotoMetaTitle
        },
        {
          hid: 'description',
          name: 'description',
          content: this.cragPhotoMetaDescription
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.cragPhotoMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.crag.path}/photos`
        }
      ]
    }
  },

  mounted () {
    this.getVideos()
  },

  methods: {
    getVideos () {
      this.loadingVideos = true
      new CragApi(this.$axios, this.$auth)
        .videos(this.crag.id)
        .then((resp) => {
          this.videos = []
          for (const video of resp.data) {
            this.videos.push(new Video({ attributes: video }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'video')
        })
        .finally(() => {
          this.loadingVideos = false
        })
    }
  }
}
</script>
