<template>
  <div>
    <v-card
      link
      flat
      :to="linkable ? cragSector.path : null"
    >
      <v-list-item three-line>
        <v-list-item-avatar
          size="70"
        >
          <v-avatar
            color="grey"
            size="70"
            tile
          >
            <v-img :src="cragSector.thumbnailCoverUrl" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            <span class="vertical-align-middle">
              {{ cragSector.name }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle class="mt-n3 mb-4">
            <v-alert
              dense
              text
              class="d-inline-block mr-1 mb-0 pl-2 pr-2 pt-0 pb-0"
            >
              Secteur
            </v-alert>
            {{ cragSector.Crag.name }}, {{ cragSector.Crag.city }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'CragSectorSmallCard',
  props: {
    cragSector: Object,
    linkable: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>
