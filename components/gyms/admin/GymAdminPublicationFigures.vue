<template>
  <v-card class="full-height d-flex flex-column justify-space-between">
    <v-card-title class="d-flex">
      <v-icon left>
        {{ oblykArdoise }}
      </v-icon>
      {{ $t('components.gymAdmin.publications') }}
      <v-chip
        dark
        color="blue darken-2"
        class="ml-auto"
        small
      >
        <v-icon small left>
          {{ mdiCreation }}
        </v-icon>
        NEW
      </v-chip>
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7 d-flex justify-space-around">
      <div>
        <p class="big-font-size font-weight-bold">
          {{ figures.publications_count !== null ? figures.publications_count : '...' }}
        </p>
        <small>
          {{ $t('common.signboards') }}
        </small>
      </div>
      <div :class="figures.publication_drafts_count > 0 ? 'amber--text' : null">
        <p class="big-font-size font-weight-bold">
          {{ figures.publication_drafts_count !== null ? figures.publication_drafts_count : '...' }}
        </p>
        <small>
          {{ $t('common.drafts') }}
        </small>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        elevation="0"
        color="primary"
        class="ml-auto"
        :to="`${gym.app_path}/publications`"
      >
        <v-icon left>
          {{ oblykArdoise }}
        </v-icon>
        Mon ardoise
      </v-btn>
      <v-btn
        elevation="0"
        color="primary"
        :to="`${gym.app_path}/publications/new`"
      >
        <v-icon left>
          {{ mdiGreasePencil }}
        </v-icon>
        {{ $t('actions.write') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiNoteText, mdiGreasePencil, mdiCreation } from '@mdi/js'
import { oblykArdoise } from '~/assets/oblyk-icons'
import GymApi from '~/services/oblyk-api/GymApi'

export default {
  name: 'GymAdminPublicationsFigures',
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      figures: {},
      newCount: null,

      mdiNoteText,
      mdiGreasePencil,
      oblykArdoise,
      mdiCreation
    }
  },

  mounted () {
    this.getFigures()
  },

  methods: {
    getFigures () {
      new GymApi(this.$axios, this.$auth)
        .figures(this.gym.id, ['publications_count', 'publication_drafts_count'])
        .then((resp) => { this.figures = resp.data })
    }
  }
}
</script>
