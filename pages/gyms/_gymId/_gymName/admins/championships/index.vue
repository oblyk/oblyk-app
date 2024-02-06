<template>
  <v-container>
    <spinner v-if="loadingChampionships && !gym" />
    <div v-if="!loadingChampionships && gym">
      <v-breadcrumbs :items="breadcrumbs" />
      <v-list
        v-if="championships.length > 0"
        class="mb-4"
      >
        <championship-item-list
          v-for="(championship, championshipIndex) in championships"
          :key="`championship-index-${championshipIndex}`"
          :championship="championship"
          :public-path="false"
        />
      </v-list>
      <p
        v-else
        class="text-center text--disabled py-5"
      >
        Pas de championnat
      </p>
      <div class="text-right">
        <v-btn
          elevation="0"
          color="primary"
          :to="`${gym.adminPath}/championships/new`"
        >
          Nouveau championnat
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import Spinner from '~/components/layouts/Spiner'
import ChampionshipApi from '~/services/oblyk-api/ChampionshipApi'
import ChampionshipItemList from '~/components/championships/ChampionshipItemList.vue'
import Championship from '~/models/Championship'

export default {
  components: { ChampionshipItemList, Spinner },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern, GymRolesHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      loadingChampionships: true,
      championships: []
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Les championnats'
      },
      en: {
        metaTitle: 'Championships'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
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
          text: this.$t('components.gymAdmin.championships'),
          to: `${this.gym?.adminPath}/championships`,
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getChampionships()
  },

  methods: {
    getChampionships () {
      this.loadingChampionships = true
      new ChampionshipApi(this.$axios, this.$auth)
        .all(this.$route.params.gymId)
        .then((resp) => {
          this.championships = []
          for (const championship of resp.data) {
            this.championships.push(new Championship({ attributes: championship }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'championship')
        })
        .finally(() => {
          this.loadingChampionships = false
        })
    }
  }
}
</script>
