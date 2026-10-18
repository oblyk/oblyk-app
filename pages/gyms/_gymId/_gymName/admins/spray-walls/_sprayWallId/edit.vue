<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs" />
    <div v-if="!gym || !sprayWall">
      Chargement ...
    </div>
    <div v-else>
      <spray-wall-form
        :spray-wall="sprayWall"
        submit-methode="put"
        style="max-width: 600px"
        class="mx-auto"
      />
    </div>
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import OblykApi from '~/services/oblyk-api/OblykApi'
import SprayWallForm from '~/components/sprayWalls/forms/SprayWallForm.vue'

export default {
  components: { SprayWallForm },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      sprayWall: null
    }
  },

  computed: {
    breadcrumbs () {
      return [
        {
          text: this.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: `${this.gym?.adminPath}`,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.sprayWalls'),
          to: `${this.gym?.adminPath}/spray-walls`,
          exact: true
        },
        {
          text: this.sprayWall?.title,
          to: `${this.gym?.adminPath}/spray-walls/${this.sprayWall?.id}`,
          exact: true
        },
        {
          text: this.$t('actions.edit')
        }
      ]
    }
  },

  mounted () {
    this.getSprayWall()
  },

  methods: {
    getSprayWall () {
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.$route.params.gymId}/spray_walls/${this.$route.params.sprayWallId}`)
        .then((resp) => {
          this.sprayWall = resp.data
        })
    }
  }
}
</script>
