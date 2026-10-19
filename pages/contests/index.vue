<template>
  <div>
    <page-header
      :title="$t('components.contest.title')"
      back-to="/indoor"
    />
    <v-container>
      <v-btn
        text
        rounded
        :color="tab === 0 ? 'deep-purple accent-2' : ''"
        :class="tab === 0 ? 'v-btn--active' : ''"
        @click="tab = 0"
      >
        {{ $t('components.contest.currentAndUpcoming') }}
      </v-btn>
      <v-btn
        text
        rounded
        :color="tab === 1 ? 'deep-purple accent-2' : ''"
        :class="tab === 1 ? 'v-btn--active' : ''"
        @click="tab = 1"
      >
        {{ $t('components.contest.past') }}
      </v-btn>
      <v-tabs-items
        v-model="tab"
        class="rounded mt-2"
      >
        <v-tab-item>
          <contest-public-list projection="upcoming" />
        </v-tab-item>
        <v-tab-item>
          <contest-public-list projection="past" />
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import PageHeader from '~/components/layouts/PageHeader'
import ContestPublicList from '~/components/contests/ContestPublicList'

export default {
  components: { ContestPublicList, PageHeader },
  data () {
    return {
      tab: 0
    }
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
