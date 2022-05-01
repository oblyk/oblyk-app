<template>
  <div>
    <p class="mb-0">
      <strong>{{ town.name }}</strong> ({{ town.zipcode }}) ville située dans le département de
      <nuxt-link :to="toDepartmentObject(town.department).path">
        {{ $t(`components.department.namePrefixType.${town.department.name_prefix_type}`).toLocaleLowerCase() }}{{ town.department.name }}
      </nuxt-link>,
      <span v-if="town.crags.around.length > 0">
        {{ town.name }} présente {{ $t(densityLabelKey) }} de sites d’escalade : {{ town.crags.around.length }} sites dans un rayon de {{ town.dist }}km.
      </span>
      <span class="span-comma">
        on trouve notamment
        <span v-if="climbingTypes.sport_climbing > 0">
          {{ $tc('components.town.pluralStyle', climbingTypes.sport_climbing, { count: climbingTypes.sport_climbing }) }} de voie
        </span>
        <span v-if="climbingTypes.bouldering > 0">
          {{ $tc('components.town.pluralStyle', climbingTypes.bouldering, { count: climbingTypes.bouldering }) }} de bloc
        </span>
        <span v-if="climbingTypes.multi_pitch > 0">
          {{ $tc('components.town.pluralStyle', climbingTypes.multi_pitch, { count: climbingTypes.multi_pitch }) }} de grande voie
        </span>
        <span v-if="climbingTypes.trad_climbing > 0">
          {{ $tc('components.town.pluralStyle', climbingTypes.trad_climbing, { count: climbingTypes.trad_climbing }) }} de trad
        </span>
        <span v-if="climbingTypes.aid_climbing > 0">
          {{ $tc('components.town.pluralStyle', climbingTypes.aid_climbing, { count: climbingTypes.aid_climbing }) }} d'artif
        </span>
        <span v-if="climbingTypes.deep_water > 0">
          {{ $tc('components.town.pluralStyle', climbingTypes.deep_water, { count: climbingTypes.deep_water }) }} de Deep Water
        </span>
        <span v-if="climbingTypes.via_ferrata > 0">
          {{ $tc('components.town.pluralStyle', climbingTypes.via_ferrata, { count: climbingTypes.via_ferrata }) }} de via ferrata
        </span>.
      </span>
      <span v-if="town.crags.around.length === 0">
        ne possède aucun site d’escalade dans un rayon proche ({{ town.dist }}km).
      </span>
    </p>

    <!-- If crags around -->
    <p v-if="town.crags.around.length > 0">
      Ces {{ town.crags.around.length }} sites d’escalade proposent au total {{ town.crags.route_figures.route_count }} voies :
      la ligne la plus dure est
      <nuxt-link :to="toCragRouteObject(town.crags.route_figures.grade.max.crag_route).path">
        {{ town.crags.route_figures.grade.max.crag_route.name }}, {{ town.crags.route_figures.grade.max.text }}
      </nuxt-link>
      à
      <nuxt-link :to="toCragObject(town.crags.route_figures.grade.max.crag_route.crag).path">
        {{ town.crags.route_figures.grade.max.crag_route.crag.name }}
      </nuxt-link>.
    </p>

    <!-- No crag around -->
    <p v-if="town.crags.around.length === 0">
      Le site d’escalade le plus proche de {{ town.name }} est
      <nuxt-link :to="toCragObject(town.crags.nearest).path">
        {{ town.crags.nearest.name }}
      </nuxt-link>
      (site de {{ nearestCragsType }}), situé {{ town.crags.nearest.city }}, à {{ town.crags.nearest_dist }}km de distance.
    </p>

    <!-- Guide books -->
    <p
      v-if="town.guide_book_papers.length > 0"
      class="a-comma"
    >
      Les sites d’escalade autour de {{ town.name }} sont présentés dans {{ town.guide_book_papers.length }} topos :
      <nuxt-link
        v-for="(guide, index) in town.guide_book_papers"
        :key="`guide-book-index'${index}`"
        :to="toGuideObject(guide).path"
      >
        "{{ guide.name }}"
      </nuxt-link>.
    </p>

    <!-- No indoor -->
    <p v-if="town.gyms.around.length === 0">
      Côté indoor, il n’y a aucune salle située à proximité de {{ town.name }},
      la plus proche étant la SAE
      <nuxt-link :to="toGymObject(town.gyms.nearest).path">
        {{ town.gyms.nearest.name }}
      </nuxt-link>
      à {{ town.gyms.nearest.city }} ({{ town.gyms.nearest_dist }}kms de {{ town.name }}).
    </p>

    <!-- Indoor around -->
    <p v-else>
      Côté indoor, on trouve à {{ town.name }} et au alentour {{ town.gyms.around.length }} salles d'escalade en intérieur :
      <span class="a-comma">
        <nuxt-link
          v-for="(gym, index) in town.gyms.around"
          :key="`gym-index'${index}`"
          :to="toGymObject(gym).path"
        >
          {{ gym.name }}
        </nuxt-link>.
      </span>
    </p>

    <p class="text-right text--disabled mb-0">
      <small>
        {{ $t('components.department.selfGeneratedDescription') }}
      </small>
    </p>
  </div>
</template>

<script>
import GuideBookPaper from '~/models/GuideBookPaper'
import Gym from '~/models/Gym'
import Crag from '~/models/Crag'
import Department from '~/models/Department'
import CragRoute from '~/models/CragRoute'

export default {
  name: 'TownDescription',

  props: {
    town: {
      type: Object,
      required: true
    }
  },

  computed: {
    densityLabelKey () {
      if (this.town.crags.around.length === 0) {
        return null
      } else if (this.town.crags.around.length <= 5) {
        return 'components.town.density.low'
      } else if (this.town.crags.around.length <= 10) {
        return 'components.town.density.medium'
      } else {
        return 'components.town.density.large'
      }
    },

    climbingTypes () {
      const types = {
        sport_climbing: 0,
        bouldering: 0,
        multi_pitch: 0,
        trad_climbing: 0,
        aid_climbing: 0,
        deep_water: 0,
        via_ferrata: 0
      }
      for (const crag of this.town.crags.around) {
        if (crag.sport_climbing) { types.sport_climbing += 1 }
        if (crag.bouldering) { types.bouldering += 1 }
        if (crag.multi_pitch) { types.multi_pitch += 1 }
        if (crag.trad_climbing) { types.trad_climbing += 1 }
        if (crag.aid_climbing) { types.aid_climbing += 1 }
        if (crag.deep_water) { types.deep_water += 1 }
        if (crag.via_ferrata) { types.via_ferrata += 1 }
      }
      return types
    },

    nearestCragsType () {
      const types = []
      for (const type of this.toCragObject(this.town.crags.nearest).climbingTypes) {
        types.push(this.$t(`models.climbs.${type}`).toLocaleLowerCase())
      }
      return types.join(', ')
    }
  },

  methods: {
    toCragObject (crag) {
      return new Crag({ attributes: crag })
    },

    toCragRouteObject (cragRoute) {
      return new CragRoute({ attributes: cragRoute })
    },

    toGuideObject (guide) {
      return new GuideBookPaper({ attributes: guide })
    },

    toGymObject (gym) {
      return new Gym({ attributes: gym })
    },

    toDepartmentObject (department) {
      return new Department({ attributes: department })
    }
  }
}
</script>
