<template>
  <div>
    <p class="mb-0">
      <strong>{{ town.name }}</strong> ({{ town.zipcode }}) est une ville située dans le département de
      <nuxt-link :to="toDepartmentObject(town.department).path">
        {{ $t(`components.department.namePrefixType.${town.department.name_prefix_type}`).toLocaleLowerCase() }}{{ town.department.name }}
      </nuxt-link>,
      <span v-if="town.crags.crag_count_around > 0">
        {{ town.name }} présente {{ $t(densityLabelKey) }} de sites d’escalade : {{ town.crags.crag_count_around }} sites dans un rayon de {{ town.dist }}km.
      </span>
      <span
        v-if="town.crags.crag_count_around > 0 && havingClimbingTypes > 0"
        class="span-comma"
      >
        On trouve notamment
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
      <span v-if="town.crags.crag_count_around === 0">
        ne possède aucun site d’escalade dans un rayon proche ({{ town.dist }}km).
      </span>
    </p>

    <!-- If crags around -->
    <p v-if="town.crags.crag_count_around > 0">
      <span v-if="town.crags.crag_count_around === 1">
        Ce site d’escalade présente au total {{ town.crags.route_figures.route_count }} voie{{ town.crags.route_figures.route_count > 1 ? 's' : '' }}{{ town.crags.route_figures.grade.max.crag_route ? ' :' : '.' }}
      </span>
      <span v-if="town.crags.crag_count_around > 1">
        Ces {{ town.crags.crag_count_around }} sites d’escalade proposent au total {{ town.crags.route_figures.route_count }} voies{{ town.crags.route_figures.grade.max.crag_route ? ' :' : '.' }}
      </span>
      <span v-if="town.crags.route_figures.grade.max.crag_route !== null">
        la ligne la plus dure est
        <nuxt-link :to="toCragRouteObject(town.crags.route_figures.grade.max.crag_route).path">
          {{ town.crags.route_figures.grade.max.crag_route.name }}, {{ town.crags.route_figures.grade.max.text }}
        </nuxt-link>
        à
        <nuxt-link :to="toCragObject(town.crags.route_figures.grade.max.crag_route.crag).path">
          {{ town.crags.route_figures.grade.max.crag_route.crag.name }}
        </nuxt-link>.
      </span>
    </p>

    <!-- No crag around -->
    <p v-if="town.crags.crag_count_around === 0">
      Le site d’escalade le plus proche de {{ town.name }} est
      <nuxt-link :to="toCragObject(town.crags.nearest).path">
        {{ town.crags.nearest.name }}
      </nuxt-link>
      situé à {{ town.crags.nearest.city }}, à {{ town.crags.nearest_dist }}km de distance.
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
        :to="`/guide-book-papers/${guide.id}/${guide.slug_name}`"
      >
        "{{ guide.name }}"
      </nuxt-link>.
    </p>

    <!-- No indoor -->
    <p v-if="town.gyms.around.length === 0">
      Côté indoor, il n’y a aucune salle située à proximité de {{ town.name }},
      la plus proche étant la SAE
      <nuxt-link :to="`/gyms/${town.gyms.nearest.id}/${town.gyms.nearest.slug_name}`">
        {{ town.gyms.nearest.name }}
      </nuxt-link>
      à {{ town.gyms.nearest.city }} ({{ town.gyms.nearest_dist }}kms de {{ town.name }}).
    </p>

    <!-- Indoor around -->
    <p v-else>
      Côté indoor, on trouve à {{ town.name }} et aux alentours {{ town.gyms.around.length }} salles d'escalade :
      <span class="a-comma">
        <nuxt-link
          v-for="(gym, index) in town.gyms.around"
          :key="`gym-index'${index}`"
          :to="`/gyms/${gym.id}/${gym.slug_name}`"
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
      if (this.town.crags.crag_count_around === 0) {
        return null
      } else if (this.town.crags.crag_count_around <= 5) {
        return 'components.town.density.low'
      } else if (this.town.crags.crag_count_around <= 10) {
        return 'components.town.density.medium'
      } else {
        return 'components.town.density.large'
      }
    },

    climbingTypes () {
      const types = this.town.crags.crag_count_by_climbing_types
      return {
        sport_climbing: types.sport_climbing,
        bouldering: types.bouldering,
        multi_pitch: types.multi_pitch,
        trad_climbing: types.trad_climbing,
        aid_climbing: types.aid_climbing,
        deep_water: types.deep_water,
        via_ferrata: types.via_ferrata
      }
    },

    havingClimbingTypes () {
      return Object.values(this.town.crags.crag_count_by_climbing_types).reduce((a, b) => a + b, 0)
    }
  },

  methods: {
    toCragObject (crag) {
      return new Crag({ attributes: crag })
    },

    toCragRouteObject (cragRoute) {
      return new CragRoute({ attributes: cragRoute })
    },

    toDepartmentObject (department) {
      return new Department({ attributes: department })
    }
  }
}
</script>
