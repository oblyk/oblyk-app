<template>
  <div>
    <p>
      <strong>Le département {{ $t(`components.department.namePrefixType.${department.name_prefix_type}`) }} {{ department.name }} ({{ department.department_number }})</strong>,
      présente {{ department.figures.crags.count.all }} sites d’escalade.
      <span
        v-if="department.figures.crags.count.all > 0"
        class="span-comma"
      >
        on trouve notamment
        <span v-if="department.figures.crags.count.types.sport_climbing > 0">
          {{ $tc('components.town.pluralStyle', department.figures.crags.count.types.sport_climbing, { count: department.figures.crags.count.types.sport_climbing }) }} de voie
        </span>
        <span v-if="department.figures.crags.count.types.bouldering > 0">
          {{ $tc('components.town.pluralStyle', department.figures.crags.count.types.bouldering, { count: department.figures.crags.count.types.bouldering }) }} de bloc
        </span>
        <span v-if="department.figures.crags.count.types.multi_pitch > 0">
          {{ $tc('components.town.pluralStyle', department.figures.crags.count.types.multi_pitch, { count: department.figures.crags.count.types.multi_pitch }) }} de grande voie
        </span>
        <span v-if="department.figures.crags.count.types.trad_climbing > 0">
          {{ $tc('components.town.pluralStyle', department.figures.crags.count.types.trad_climbing, { count: department.figures.crags.count.types.trad_climbing }) }} de trad
        </span>
        <span v-if="department.figures.crags.count.types.aid_climbing > 0">
          {{ $tc('components.town.pluralStyle', department.figures.crags.count.types.aid_climbing, { count: department.figures.crags.count.types.aid_climbing }) }} d'artif
        </span>
        <span v-if="department.figures.crags.count.types.deep_water > 0">
          {{ $tc('components.town.pluralStyle', department.figures.crags.count.types.deep_water, { count: department.figures.crags.count.types.deep_water }) }} de Deep Water
        </span>
        <span v-if="department.figures.crags.count.types.via_ferrata > 0">
          {{ $tc('components.town.pluralStyle', department.figures.crags.count.types.via_ferrata, { count: department.figures.crags.count.types.via_ferrata }) }} de via ferrata
        </span>.
      </span>
    </p>

    <p v-if="department.figures.crags.count.all > 0">
      Ces {{ department.figures.crags.count.all }} sites d’escalade proposent au total {{ department.figures.crag_routes.count.all }} voies.
      <span v-if="department.figures.crag_routes.hardest_sport_climbing">
        La voie la plus dure est
        <nuxt-link :to="cragRouteToObject(department.figures.crag_routes.hardest_sport_climbing).path">
          {{ department.figures.crag_routes.hardest_sport_climbing.name }},
          {{ department.figures.crag_routes.hardest_sport_climbing.grade_gap.max_grade_text }}
        </nuxt-link>
        (à <nuxt-link :to="cragToObject(department.figures.crag_routes.hardest_sport_climbing.crag).path">{{ department.figures.crag_routes.hardest_sport_climbing.crag.name }}</nuxt-link>).
      </span>
      <span v-if="department.figures.crag_routes.hardest_bouldering">
        Le bloc le plus dur est
        <nuxt-link :to="cragRouteToObject(department.figures.crag_routes.hardest_bouldering).path">
          {{ department.figures.crag_routes.hardest_bouldering.name }},
          {{ department.figures.crag_routes.hardest_bouldering.grade_gap.max_grade_text }}
        </nuxt-link>
        (à <nuxt-link :to="cragToObject(department.figures.crag_routes.hardest_bouldering.crag).path">{{ department.figures.crag_routes.hardest_bouldering.crag.name }}</nuxt-link>).
      </span>
      <span v-if="department.guide_book_papers.length > 0">
        {{ department.guide_book_papers.length }} topos d'escalades couvrent ces sites de grimpe.
      </span>
    </p>

    <p v-if="department.figures.gyms.count.all > 0">
      {{ $t(`components.department.namePrefixType.${department.name_prefix_type}`) }} {{ department.name }} compte {{ department.figures.gyms.count.all }} salles d'escalade pour grimper en intérieur.
    </p>

    <p class="text-right text--disabled mb-0">
      <small>
        {{ $t('components.department.selfGeneratedDescription') }}
      </small>
    </p>
  </div>
</template>

<script>
import CragRoute from '~/models/CragRoute'
import Crag from '~/models/Crag'

export default {
  name: 'DepartmentDescription',

  props: {
    department: {
      type: Object,
      required: true
    }
  },

  methods: {
    cragRouteToObject (route) {
      return new CragRoute({ attributes: route })
    },

    cragToObject (route) {
      return new Crag({ attributes: route })
    }
  }
}
</script>
