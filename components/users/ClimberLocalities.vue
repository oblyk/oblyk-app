<template>
  <div>
    <h4 class="mb-2">
      <v-icon left>
        {{ mdiMap }}
      </v-icon>
      {{ $t('components.user.climbersMap') }}
    </h4>
    <v-sheet class="pa-4 mb-2" rounded>
      <v-chip
        v-for="(climbingType, climbingTypeIndex) in user.climbingTypes"
        :key="`climbing-type-${climbingTypeIndex}`"
        class="mr-1"
        small
      >
        <v-icon
          left
          small
          :color="climbingTypeColors[climbingType]"
        >
          {{ mdiCircle }}
        </v-icon>
        {{ $t(`models.climbs.${climbingType}`) }}
      </v-chip>
      <span v-html="level" />
    </v-sheet>
    <v-card
      v-for="(userLocality, userLocalityIndex) in localities"
      :key="`user-locality-index-${userLocalityIndex}`"
      class="mb-2"
    >
      <v-card-title class="pb-2">
        {{ userLocality.locality.name }}
      </v-card-title>
      <v-card-subtitle class="pb-2">
        {{ userLocality.locality.region }}, {{ userLocality.locality.country }}
      </v-card-subtitle>
      <v-card-text>
        <div v-html="userLocality.description" />
      </v-card-text>
    </v-card>

    <div class="text-right">
      <v-btn
        text
        outlined
        to="/maps/climbers"
      >
        <v-icon left>
          {{ mdiMap }}
        </v-icon>
        {{ $t('components.layout.appDrawer.find.climbers.map') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiMap, mdiCircle } from '@mdi/js'
import UserApi from '~/services/oblyk-api/UserApi'
import LocalityUser from '~/models/LocalityUser'
import { ClimbingTypeMixin } from '~/mixins/ClimbingTypeMixin'
import { GradeMixin } from '~/mixins/GradeMixin'

export default {
  name: 'ClimberLocalities',
  mixins: [ClimbingTypeMixin, GradeMixin],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingLocalities: true,
      localities: [],

      mdiMap,
      mdiCircle
    }
  },

  computed: {
    level () {
      return `
      ${this.$t('common.from').toLowerCase()}
      ${this.gradeToHtml(this.user.grade_min, this.gradeValueToText(this.user.grade_min) || '1a')}
      ${this.$t('common.to').toLowerCase()}
      ${this.gradeToHtml(this.user.grade_max, this.gradeValueToText(this.user.grade_max) || '∞')}
      `
    }
  },

  mounted () {
    this.getUserLocalities()
  },

  methods: {
    getUserLocalities () {
      this.loadingLocalities = true
      new UserApi(this.$axios, this.$auth)
        .localities(this.user.slug_name)
        .then((resp) => {
          for (const locality of resp.data) {
            this.localities.push(new LocalityUser({ attributes: locality }))
          }
        })
        .finally(() => {
          this.loadingLocalities = false
        })
    }
  }
}
</script>
