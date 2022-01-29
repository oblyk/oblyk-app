<template>
  <v-container>
    <div>
      <v-btn
        v-if="isLoggedIn"
        :to="`/a/photos/CragSector/${cragSector.id}/new?redirect_to=${$route.fullPath}`"
        text
        color="primary"
      >
        <v-icon left>
          mdi-image-plus
        </v-icon>
        {{ $t('actions.addPicture') }}
      </v-btn>
      <photo-gallery
        environnement-type="cragSector"
        :environnement-object="cragSector"
        gallery-type="CragSector"
        :gallery-id="cragSector.id"
        lg-col="col-lg-3"
      />
    </div>

    <spinner v-if="loadingVideos" :full-height="false" />
    <div v-if="!loadingVideos">
      <v-row>
        <v-col
          v-for="video in videos"
          :key="`video-${video.id}`"
          class="col-12 col-md-6 col-lg-3"
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
  </v-container>
</template>

<script>
import { SessionConcern } from '~/concerns/SessionConcern'
import CragSectorApi from '~/services/oblyk-api/CragSectorApi'
import Video from '~/models/Video'
import Spinner from '~/components/layouts/Spiner'
import PhotoGallery from '~/components/photos/PhotoGallery'
import VideoCard from '~/components/videos/VideoCard'

export default {
  name: 'CragSectorPhotosView',
  components: { VideoCard, PhotoGallery, Spinner },
  mixins: [SessionConcern],
  props: {
    cragSector: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingVideos: true,
      videos: []
    }
  },

  head () {
    return {
      title: this.cragSectorMetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.cragSectorMetaDescription
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.cragSectorMetaTitle
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.cragSectorMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.cragSectorMetaUrl
        }
      ]
    }
  },

  computed: {
    cragSectorMetaTitle () {
      if (this.cragSector) {
        return `
        ${this.$t('meta.generics.pictures')}
        ${this.$t('meta.cragSector.title', {
          name: this.cragSector.name,
          crag: this.cragSector.Crag.name
        })}
        `
      }
      return ''
    },
    cragSectorMetaDescription () {
      if (this.cragSector) {
        return `
        ${this.$t('meta.generics.pictures')}
        ${this.$t('meta.cragSector.description', {
          name: this.cragSector.name,
          crag: this.cragSector.Crag.name,
          region: this.cragSector.Crag.region,
          city: this.cragSector.Crag.city
        })}
        `
      }
      return ''
    },
    cragSectorMetaUrl () {
      if (this.cragSector) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.cragSector.path}/photos`
      }
      return ''
    }
  },

  mounted () {
    this.getVideos()
    this.$store.commit('layout/LAYOUT_PADDING', true)
  },

  methods: {
    getVideos () {
      this.loadingVideos = true
      new CragSectorApi(this.$axios, this.$auth)
        .videos(this.cragSector.id)
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