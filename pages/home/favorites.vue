<template>
  <div>
    <page-header
      :title="$t('components.layout.appDrawer.user.favorites')"
      back-to="/home"
      :links="headerLinks"
    />

    <spinner v-if="!currentUser" />
    <div v-else>
      <v-container>
        <router-view :user="currentUser" />
      </v-container>
    </div>
  </div>
</template>

<script>
import { mdiTerrain, mdiOfficeBuildingMarker } from '@mdi/js'
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import Spinner from '~/components/layouts/Spiner'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import Gym from '~/models/Gym'
import Crag from '~/models/Crag'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: {
    PageHeader,
    Spinner
  },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  data () {
    return {
      loadingGyms: true,
      loadingCrags: true,
      gyms: [],
      crags: [],
      headerLinks: [
        {
          to: '/home/favorites/crags',
          title: this.$t('components.user.tabs.crags'),
          icon: mdiTerrain
        },
        {
          to: '/home/favorites/gyms',
          title: this.$t('components.user.tabs.gyms'),
          icon: mdiOfficeBuildingMarker
        }
      ]
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mes favorites'
      },
      en: {
        metaTitle: 'My favorites'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  },

  mounted () {
    this.getFavoriteGyms()
    this.getFavoriteCrags()
  },

  methods: {
    getFavoriteGyms () {
      this.loadingGyms = true
      new CurrentUserApi(this.$axios, this.$auth)
        .favoriteGyms()
        .then((resp) => {
          for (const gym of resp.data) {
            this.gyms = new Gym({ attributes: gym })
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingGyms = false
        })
    },

    getFavoriteCrags () {
      this.loadingCrags = true
      new CurrentUserApi(this.$axios, this.$auth)
        .favoriteCrags()
        .then((resp) => {
          for (const crag of resp.data) {
            this.crags = new Crag({ attributes: crag })
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        })
        .finally(() => {
          this.loadingCrags = false
        })
    }
  }
}
</script>
