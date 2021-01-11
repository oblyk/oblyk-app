<template>
  <v-img
    @mouseenter="photoOver = true"
    @mouseleave="photoOver = false"
    :src="photo.thumbnailUrl()"
    max-height="200"
    :gradient="photoOver ? 'to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px' : 'to top, rgba(0, 0, 0, 0) 0%, transparent 72px'"
  >
    <template v-slot:placeholder>
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
    <div
      class="photo-actions"
      v-if="isLoggedIn && photoOver"
    >
      <v-btn
        icon
        dark
      >
        <v-icon small>
          mdi-flag
        </v-icon>
      </v-btn>
      <v-btn
        icon
        dark
        v-if="cragId"
        @click="defineAsBanner()"
        :loading="updatingBanner"
      >
        <v-icon small>
          mdi-panorama
        </v-icon>
      </v-btn>
      <v-btn
        icon
        dark
        :to="photo.url('edit')"
      >
        <v-icon small>
          mdi-pencil
        </v-icon>
      </v-btn>
    </div>
  </v-img>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import CragApi from '@/services/oblyk-api/cragApi'
import Crag from '@/models/Crag'

export default {
  name: 'PhotoThumbnail',
  mixins: [SessionConcern],
  props: {
    photo: Object
  },

  data () {
    return {
      photoOver: false,
      updatingBanner: false,
      cragId: this.$route.params.cragId
    }
  },

  methods: {
    defineAsBanner: function () {
      this.updatingBanner = true
      CragApi
        .update({
          photo_id: this.photo.id,
          id: this.cragId
        })
        .then((resp) => {
          const crag = new Crag(resp.data)
          this.$root.$emit('updateCragBannerSrc', crag.coverUrl())
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'crag')
        })
        .finally(() => {
          this.updatingBanner = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-actions {
  position: absolute;
  text-align: right;
  width: 100%;
  bottom: 0;
}
.bottom-gradient {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}
</style>
