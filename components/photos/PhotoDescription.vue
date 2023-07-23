<template>
  <div class="pb-5 photo-description">
    <!-- Description -->
    <v-card-text v-if="photo.description">
      <markdown-text :text="photo.description" />
    </v-card-text>

    <!-- Crag, Sector, Route, etc. -->
    <v-card-title class="caption pb-0">
      <nuxt-link
        :title="illustrableObject.name"
        :to="illustrableObject.path"
        class="discrete-link text-truncate"
      >
        <v-icon left small>
          {{ mdiTerrain }}
        </v-icon>
        {{ illustrableObject.name }}
      </nuxt-link>
    </v-card-title>

    <!-- Copyright -->
    <v-card-title
      v-if="photo.source"
      class="caption text-truncate pb-0 pt-2"
    >
      <v-icon left small>
        {{ mdiLink }}
      </v-icon>
      {{ photo.source }}
    </v-card-title>

    <!-- Copyright -->
    <v-card-title class="caption pb-0 pt-2">
      <v-icon left small>
        {{ mdiCopyright }}
      </v-icon>
      {{ photo.copy }}
    </v-card-title>

    <!-- Model et exif -->
    <v-card-title
      v-if="photo.exif_model || photo.exif_make"
      class="caption pb-0 pt-2"
    >
      <v-icon left small>
        {{ mdiCamera }}
      </v-icon>
      {{ photo.exif_model }} {{ photo.exif_make }}
    </v-card-title>

    <!-- Model et exif -->
    <v-card-title
      v-if="photo.creator.uuid"
      class="caption pb-0 pt-2"
    >
      <v-icon left small>
        {{ mdiAccount }}
      </v-icon>
      <nuxt-link
        :to="`/climbers/${photo.creator.slug_name}`"
      >
        {{ photo.creator.full_name }}
      </nuxt-link>
    </v-card-title>
  </div>
</template>

<script>
import { mdiTerrain, mdiLink, mdiCopyright, mdiCamera, mdiAccount } from '@mdi/js'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'PhotoDescription',
  components: { MarkdownText },
  props: {
    photo: Object,
    illustrableObject: Object
  },

  data () {
    return {
      mdiTerrain,
      mdiLink,
      mdiCopyright,
      mdiCamera,
      mdiAccount
    }
  }
}
</script>

<style lang="scss" >
.photo-description {
  width: 250px;
}
</style>
