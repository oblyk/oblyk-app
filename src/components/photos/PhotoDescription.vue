<template>
  <div class="pb-5 photo-description">
    <!-- Description -->
    <v-card-text>
      {{ photo.description }}
    </v-card-text>

    <!-- Crag, Sector, Route, etc. -->
    <v-card-title class="caption pb-0">
      <router-link
        :to="illustrableObject().path()"
        class="discrete-link"
      >
        <v-icon left small>mdi-terrain</v-icon>
        {{ illustrableObject().name }}
      </router-link>
    </v-card-title>

    <!-- Copyright -->
    <v-card-title
      class="caption text-truncate pb-0 pt-2"
      v-if="photo.source"
    >
      <v-icon left small>mdi-link</v-icon>
      {{ photo.source }}
    </v-card-title>

    <!-- Copyright -->
    <v-card-title class="caption pb-0 pt-2">
      <v-icon left small>mdi-copyright</v-icon>
      {{ photo.copy }}
    </v-card-title>

    <!-- Model et exif -->
    <v-card-title
      v-if="photo.exif_model || photo.exif_make"
      class="caption pb-0 pt-2"
    >
      <v-icon left small>mdi-camera</v-icon>
      {{ photo.exif_model }} {{ photo.exif_make }}
    </v-card-title>

    <!-- Model et exif -->
    <v-card-title
      v-if="photo.creator.id"
      class="caption pb-0 pt-2"
    >
      <v-icon left small>mdi-account</v-icon>
      {{ photo.creator.name }}
    </v-card-title>
  </div>
</template>
<script>
import Crag from '@/models/Crag'
import CragSector from '@/models/CragSector'

export default {
  name: 'PhotoDescription',
  props: {
    photo: Object
  },

  methods: {
    illustrableObject: function () {
      const object = this.photo.illustrable
      if (object.type === 'Crag') {
        return new Crag(object)
      } else if (object === 'CragSector') {
        return new CragSector(object)
      }
    }
  }
}
</script>

<style>
.photo-description {
  width: 250px;
}
</style>
