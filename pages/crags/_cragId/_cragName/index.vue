<template>
  <div v-if="crag">
    <!-- Crag information, map, etc. -->
    <v-row>
      <v-col class="col-12">
        <crag-info :crag="crag" />
      </v-col>
    </v-row>
    <client-only>
      <v-row v-if="$auth.loggedIn">
        <lazy-hydrate when-visible>
          <v-col class="col-12">
            <crag-user-ascents
              v-if="$auth.loggedIn"
              :crag="crag"
            />
          </v-col>
        </lazy-hydrate>
      </v-row>
    </client-only>

    <!-- Guide book and climbers around -->
    <lazy-hydrate when-visible>
      <v-row>
        <v-col class="col-12 col-md-7">
          <crag-guides-card :crag="crag" />
        </v-col>
        <v-col class="col-12 col-md-5">
          <!-- Around climbers -->
          <climbers-around
            :latitude="crag.latitude"
            :longitude="crag.longitude"
          />
        </v-col>
      </v-row>
    </lazy-hydrate>

    <!-- Crag articles -->
    <lazy-hydrate when-visible>
      <v-row v-if="crag.articles_count > 0">
        <v-col cols="12">
          <crag-articles :crag="crag" />
        </v-col>
      </v-row>
    </lazy-hydrate>

    <!-- Crag figures, graph, etc. -->
    <lazy-hydrate when-visible>
      <v-row v-if="crag.routes_figures.route_count > 0">
        <v-col
          v-intersect="loadCragFigures"
          cols="12"
        >
          <crag-figures
            v-if="cragFigures"
            :crag="crag"
          />
        </v-col>
      </v-row>
    </lazy-hydrate>

    <!-- Crag comments -->
    <lazy-hydrate when-visible>
      <v-row>
        <v-col
          v-intersect="loadComments"
          cols="12"
        >
          <crag-comment
            v-if="comments"
            :crag="crag"
          />
        </v-col>
      </v-row>
    </lazy-hydrate>

    <!-- Crag versions -->
    <lazy-hydrate when-visible>
      <v-row>
        <v-col cols="12">
          <version-information
            :object="crag"
            object-type="crag"
          />
        </v-col>
      </v-row>
    </lazy-hydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import CragInfo from '@/components/crags/CragDescription'
import CragGuidesCard from '@/components/crags/CragGuidesCard'
import ClimbersAround from '~/components/partners/ClimbersAround'
import VersionInformation from '~/components/ui/VersionInformation'
const CragArticles = () => import('@/components/crags/CragArticles')
const CragUserAscents = () => import('~/components/crags/CragUserAscents')
const CragComment = () => import('@/components/crags/CragComment')
const CragFigures = () => import('~/components/crags/CragFigures')

export default {
  components: {
    LazyHydrate,
    VersionInformation,
    ClimbersAround,
    CragGuidesCard,
    CragInfo,
    CragArticles,
    CragUserAscents,
    CragFigures,
    CragComment
  },
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      cragFigures: false,
      comments: false
    }
  },

  methods: {
    loadCragFigures (entries, observer) {
      if (entries[0].isIntersecting) {
        this.cragFigures = true
      }
    },

    loadComments (entries, observer) {
      if (entries[0].isIntersecting) {
        this.comments = true
      }
    }
  }
}
</script>
