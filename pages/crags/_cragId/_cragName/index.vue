<template>
  <div v-if="crag">
    <v-row>
      <v-col class="col-12">
        <crag-info :crag="crag" />
      </v-col>
    </v-row>
    <v-row v-if="$auth.loggedIn">
      <v-col class="col-12">
        <crag-user-ascents :crag="crag" />
      </v-col>
    </v-row>
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
    <v-row v-if="crag.haveArticles">
      <v-col cols="12">
        <crag-articles :crag="crag" />
      </v-col>
    </v-row>
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
    <v-row>
      <v-col cols="12">
        <crag-comment :crag="crag" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <version-information :object="crag" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CragInfo from '@/components/crags/CragDescription'
import CragGuidesCard from '@/components/crags/CragGuidesCard'
import CragComment from '@/components/crags/CragComment'
import CragArticles from '@/components/crags/CragArticles'
import ClimbersAround from '~/components/partners/ClimbersAround'
import VersionInformation from '~/components/ui/VersionInformation'
import CragUserAscents from '~/components/crags/CragUserAscents'
const CragFigures = () => import('~/components/crags/CragFigures')

export default {
  name: 'CragInfoView',
  components: {
    CragUserAscents,
    VersionInformation,
    CragFigures,
    ClimbersAround,
    CragArticles,
    CragComment,
    CragGuidesCard,
    CragInfo
  },
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      cragFigures: false
    }
  },

  methods: {
    loadCragFigures (entries, observer) {
      if (entries[0].isIntersecting) {
        this.cragFigures = true
      }
    }
  }
}
</script>
