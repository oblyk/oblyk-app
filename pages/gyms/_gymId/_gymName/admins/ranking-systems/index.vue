<template>
  <v-container>
    <spinner v-if="!gym" />
    <div v-else>
      <v-breadcrumbs :items="breadcrumbs" />
      <h2 class="mb-0">
        {{ $t('components.gymRankingSystems.title') }}
      </h2>
      <p
        class="subtitle-1 mb-5"
        v-html="$t('components.gymRankingSystems.explain')"
      />
      <ranking-system-form :gym="gym" />
    </div>
  </v-container>
</template>

<script>
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import Spinner from '~/components/layouts/Spiner'
import RankingSystemForm from '~/components/gyms/forms/RankingSystemForm.vue'

export default {
  components: { RankingSystemForm, Spinner },
  meta: { orphanRoute: true },
  mixins: [GymFetchConcern],
  middleware: ['auth', 'gymAdmin'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'System de classement'
      },
      en: {
        metaTitle: 'Ranking system'
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
          text: this.$t('components.gymAdmin.rakingSystem'),
          to: `${this.gym?.adminPath}/ranking-systems`,
          exact: true
        }
      ]
    }
  }
}
</script>
