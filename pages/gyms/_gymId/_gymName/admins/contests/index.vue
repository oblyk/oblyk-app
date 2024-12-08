<template>
  <v-container>
    <spinner v-if="loadingContests && !gym" />
    <div v-if="!loadingContests && gym">
      <v-breadcrumbs :items="breadcrumbs" />
      <v-list
        v-if="contests.length > 0"
        class="mb-4"
      >
        <div
          v-for="(contest, contestIndex) in contests"
          :key="`contest-index-${contestIndex}`"
        >
          <p
            v-if="archiveSeparator(contest, contestIndex)"
            class="mt-4 pb-2 border-bottom pl-3 font-weight-bold"
          >
            <v-icon left>
              {{ mdiBookshelf }}
            </v-icon>
            Contests archivés
          </p>
          <contest-item-list
            :contest="contest"
            :public-path="false"
            :archived="contest.archived_at !== null"
          />
        </div>
      </v-list>
      <p
        v-else
        class="text-center text--disabled py-5"
      >
        Aucun contest trouvé
      </p>
      <div class="text-right">
        <v-btn
          color="primary"
          elevation="0"
          :to="`${gym.adminPath}/contests/new`"
        >
          Nouveau contest
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mdiBookshelf } from '@mdi/js'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import Spinner from '~/components/layouts/Spiner'
import ContestApi from '~/services/oblyk-api/ContestApi'
import Contest from '~/models/Contest'
import ContestItemList from '~/components/contests/ContestItemList'

export default {
  components: { ContestItemList, Spinner },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern, GymRolesHelpers],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      loadingContests: true,
      contests: [],

      mdiBookshelf
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Les contests'
      },
      en: {
        metaTitle: 'Contests'
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
          text: this.$t('components.gymAdmin.contests'),
          to: `${this.gym?.adminPath}/contests`,
          exact: true
        }
      ]
    }
  },

  mounted () {
    this.getGymContests()
  },

  methods: {
    getGymContests () {
      this.loadingContests = true
      new ContestApi(this.$axios, this.$auth)
        .all(this.$route.params.gymId)
        .then((resp) => {
          this.contests = []
          for (const contest of resp.data) {
            this.contests.push(new Contest({ attributes: contest }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'contest')
        })
        .finally(() => {
          this.loadingContests = false
        })
    },

    archiveSeparator (contest, contestIndex) {
      return (contestIndex === 0 && contest.archived_at !== null) || (contestIndex > 0 && contest.archived_at !== null && this.contests[contestIndex - 1].archived_at === null)
    }
  }
}
</script>
