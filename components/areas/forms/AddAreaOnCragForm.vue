<template>
  <div>
    <div class="mb-10">
      <area-search-form
        :callback="addArea"
        :linkable-result="false"
      />
    </div>

    <p class="text-decoration-underline">
      {{ $t('components.crag.areaAroundThisCrag') }} : {{ crag.name }}
    </p>

    <spinner v-if="loadingAroundAreas" :full-height="false" />

    <div v-if="!loadingAroundAreas">
      <div
        v-for="area in aroundAreas"
        :key="`around-area-${area.id}`"
        @click="addArea(area)"
      >
        <area-small-card
          class="mb-3"
          :area="area"
          :linkable="false"
        />
      </div>

      <p
        v-if="aroundAreas.length === 0"
        class="text-center text--disabled"
      >
        {{ $t('components.area.noAreaAround') }}
      </p>

      <p class="text-decoration-underline mt-10 mb-5">
        {{ $t('components.area.explainNewTopo') }}
      </p>

      <div class="text-right">
        <v-btn
          text
          color="primary"
          to="/a/areas/new"
        >
          <v-icon
            left
          >
            {{ mdiPlus }}
          </v-icon>
          {{ $t('actions.addArea') }}
        </v-btn>
      </div>
    </div>
    <close-form />
    <overlay-form :overlay="submitOverlay" />
  </div>
</template>

<script>
import { mdiPlus } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import CragApi from '~/services/oblyk-api/CragApi'
import Spinner from '@/components/layouts/Spiner'
import CloseForm from '@/components/forms/CloseForm'
import OverlayForm from '@/components/forms/OverlayForm'
import AreaSearchForm from '@/components/areas/forms/AreaSearchForm'
import AreaSmallCard from '@/components/areas/AreaSmallCard'
import Area from '@/models/Area'
import AreaApi from '~/services/oblyk-api/AreaApi'

export default {
  name: 'AddAreaOnCragForm',
  components: { AreaSmallCard, AreaSearchForm, OverlayForm, CloseForm, Spinner },
  mixins: [FormHelpers],
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiPlus,
      loadingAroundAreas: true,
      aroundAreas: []
    }
  },

  mounted () {
    this.getAreAround()
  },

  methods: {
    getAreAround () {
      this.loadingAroundAreas = true
      new CragApi(this.$axios, this.$auth)
        .areasAround(this.crag.id)
        .then((resp) => {
          for (const area of resp.data) {
            this.aroundAreas.push(new Area({ attributes: area }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'area')
        })
        .finally(() => {
          this.loadingAroundAreas = false
        })
    },

    addArea (area) {
      new AreaApi(this.$axios, this.$auth)
        .addCrag(area.id, this.crag.id)
        .then(() => {
          this.$router.push(this.crag.path)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'area')
        })
    }
  }
}
</script>
