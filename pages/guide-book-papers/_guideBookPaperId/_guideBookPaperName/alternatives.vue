<template>
  <div>
    <h2 class="mb-4 mt-7">
      {{ $t('components.guideBookPaper.alternative.title') }} : {{ guideBookPaper.name }}
    </h2>

    <!-- Loading -->
    <div v-if="$fetchState.pending">
      <v-skeleton-loader
        class="mx-auto"
        type="card-heading"
      />
      <div class="row mt-2">
        <div class="col-12 col-md-2">
          <v-skeleton-loader
            v-bind="attrs"
            type="image"
          />
        </div>
        <div class="col-12 col-md-2">
          <v-skeleton-loader
            v-bind="attrs"
            type="image"
          />
        </div>
      </div>
    </div>

    <!-- Guides list -->
    <div
      v-for="(alternative, cragIndex) in crags"
      :key="`alternative-crag-${cragIndex}`"
    >
      <crag-small-card
        :crag="cragObject(alternative.crag)"
        small
      />
      <div class="row mt-1 mb-10">
        <div
          v-if="alternative.guides.length === 0"
          class="col-12"
        >
          <p class="text--disabled">
            {{ $t('components.guideBookPaper.alternative.notFound')}} <strong>{{ alternative.crag.name }}</strong>
          </p>
        </div>
        <div
          v-for="(guide, guideIndex) in alternative.guides"
          :key="`alternative-guide-${guideIndex}`"
          class="col-12 col-md-4 col-lg-2"
        >
          <guide-book-paper-cover-card
            :guide-book-paper="guideBookPaperObject(guide)"
            cover-height="100px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
import CragSmallCard from '~/components/crags/CragSmallCard'
import GuideBookPaperCoverCard from '~/components/guideBookPapers/GuideBookPaperCoverCard'
import GuideBookPaper from '~/models/GuideBookPaper'
import Crag from '~/models/Crag'

export default {
  components: { GuideBookPaperCoverCard, CragSmallCard },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      crags: [],
      guideBookPaperMetaTitle: this.$t('metaTitle', { name: this.guideBookPaper?.name }),
      guideBookPaperMetaDescription: this.$t('metaDescription', { name: this.guideBookPaper?.name })
    }
  },

  async fetch () {
    await new GuideBookPaperApi(
      this.$axios,
      this.$store
    ).alternatives(
      this.$route.params.guideBookPaperId
    ).then((resp) => {
      this.crags = resp.data
    })
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Topos alternatifs à %{name}',
        metaDescription: "Liste des autres topos d'escalades qui traitent des mêmes sites que le topo %{name}"
      },
      en: {
        metaTitle: 'Alternative guides to %{name}',
        metaDescription: 'List of other climbing guidebooks that deal with the same crags as the guidebook %{name}'
      }
    }
  },

  head () {
    return {
      title: this.guideBookPaperMetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.guideBookPaperMetaDescription
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.guideBookPaperMetaTitle
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.guideBookPaperMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.guideBookPaper.path}/alternatives`
        }
      ]
    }
  },

  methods: {
    guideBookPaperObject (object) {
      return new GuideBookPaper({ attributes: object })
    },

    cragObject (object) {
      return new Crag({ attributes: object })
    }
  }
}
</script>
