<template>
  <v-container>
    <h1>Les contests</h1>

    <!-- Coming contest -->
    <div v-if="isComingContests.length > 0">
      <p class="font-weight-bold mb-1 mt-6">
        À venir
      </p>
      <v-list class="rounded-sm">
        <contest-item-list
          v-for="(contest, contestIndex) in isComingContests"
          :key="`is-coming-contest-index-${contestIndex}`"
          :contest="contest"
          :public-path="true"
        />
      </v-list>
    </div>

    <!-- Ongoing contest -->
    <div v-if="ongoingContests.length > 0">
      <p class="font-weight-bold mb-1 mt-6">
        En cours
      </p>
      <v-list class="rounded-sm">
        <contest-item-list
          v-for="(contest, contestIndex) in ongoingContests"
          :key="`ongoing-contest-index-${contestIndex}`"
          :contest="contest"
          :public-path="true"
        />
      </v-list>
    </div>

    <!-- Pasts contest -->
    <div v-if="pastContests.length > 0">
      <p class="font-weight-bold mb-1 mt-6">
        Passé
      </p>
      <v-list class="rounded-sm">
        <contest-item-list
          v-for="(contest, contestIndex) in pastContests"
          :key="`past-contest-index-${contestIndex}`"
          :contest="contest"
          :public-path="true"
        />
      </v-list>
    </div>
  </v-container>
</template>

<script>
import ContestApi from '~/services/oblyk-api/ContestApi'
import Contest from '~/models/Contest'
import ContestItemList from '~/components/contests/ContestItemList.vue'

export default {
  components: { ContestItemList },
  data () {
    return {
      loadingContest: true,
      isComingContests: [],
      ongoingContests: [],
      pastContests: []
    }
  },

  async fetch () {
    this.loadingContest = true
    await new ContestApi(this.$axios, this.$auth)
      .opens()
      .then((resp) => {
        this.isComingContests = []
        this.ongoingContests = []
        this.pastContests = []
        for (const contest of resp.data.is_coming) {
          this.isComingContests.push(new Contest({ attributes: contest }))
        }
        for (const contest of resp.data.ongoing) {
          this.ongoingContests.push(new Contest({ attributes: contest }))
        }
        for (const contest of resp.data.past) {
          this.pastContests.push(new Contest({ attributes: contest }))
        }
      })
      .finally(() => {
        this.loadingContest = false
      })
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Les contests',
        metaDescription: "Trouver et participer à un contest organiser par une salles d'escalade"
      },
      en: {
        metaTitle: 'Opens',
        metaDescription: 'Find and take part in a competition organised by a climbing gym'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
