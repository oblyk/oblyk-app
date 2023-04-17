<template>
  <v-card
    class="mb-5 border"
  >
    <v-list class="pb-0">
      <v-list-item>
        <v-list-item-avatar size="55">
          <v-avatar>
            <v-img :src="climberLocality.User.thumbnailAvatarUrl" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ climberLocality.User.first_name }}
            <v-chip
              v-if="climberLocality.new"
              color="red"
              text-color="white"
              class="ml-2 vertical-align-text-bottom"
              small
            >
              nouveau !
            </v-chip>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ genderAndAge }}, {{ $t('date.lastActivity', { date: dateFromNow(climberLocality.User.last_activity_at) }) }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            outlined
            text
            primary
            color="primary"
            :to="climberLocality.User.path"
          >
            {{ $t('actions.see')}}
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-card-text
      class="pt-0"
    >
      <div v-html="climberLocality.User.description" />
      <div v-if="climberLocality.locality_user.description">
        <u>Note par rapport à {{ climberLocality.locality.name }}</u>
        <div v-html="climberLocality.locality_user.description" />
      </div>
      <div v-if="climberLocality.User.partner_search">
        <v-chip
          v-for="(climbingType, climbingTypeIndex) in climberLocality.User.climbingTypes"
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
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiCircle, mdiAccountSearch } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import { GradeMixin } from '~/mixins/GradeMixin'
import { ClimbingTypeMixin } from '~/mixins/ClimbingTypeMixin'

export default {
  name: 'LocalityUserCard',
  mixins: [DateHelpers, GradeMixin, ClimbingTypeMixin],

  props: {
    climberLocality: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiCircle,
      mdiAccountSearch
    }
  },

  computed: {
    genderAndAge () {
      const genreAndAge = []
      if (this.climberLocality.User.genre) {
        genreAndAge.push(this.$t(`models.genres.climbers.${this.climberLocality.User.genre}`))
      }

      if (this.climberLocality.User.age) {
        genreAndAge.push(`${this.climberLocality.User.age} ans`)
      }
      return genreAndAge.join(', ')
    },

    level () {
      return `
      ${this.$t('common.from').toLowerCase()}
      ${this.gradeToHtml(this.climberLocality.User.grade_min, this.gradeValueToText(this.climberLocality.User.grade_min) || '1a')}
      ${this.$t('common.to').toLowerCase()}
      ${this.gradeToHtml(this.climberLocality.User.grade_max, this.gradeValueToText(this.climberLocality.User.grade_max) || '∞')}
      `
    },

    climbingTypes () {
      return this.climberLocality.User.climbingTypes.map((climb) => { return this.$t(`models.climbs.${climb}`) }).join(', ')
    }
  }
}
</script>
