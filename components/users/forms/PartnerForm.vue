<template>
  <div>
    <v-form @submit.prevent="submit()">
      <v-checkbox
        v-model="data.partner_search"
        :label="$t('models.user.partner_search')"
      />

      <div v-if="data.partner_search">
        <div
          v-if="!$auth.user.date_of_birth"
          class="mb-10"
        >
          <p class="mt-5 mb-2 font-weight-bold text-decoration-underline">
            {{ $t('components.user.myDateOfBirth') }}
          </p>
          <date-of-birth-input
            v-model="data.date_of_birth"
            hide-details
            class="required-field"
          />
          <p
            class="text--disabled mt-1"
            v-html="$t('components.user.dateOfBirthExplain')"
          />
        </div>

        <p class="mt-5 font-weight-bold text-decoration-underline">
          {{ $t('components.user.whatClimbingType') }}
        </p>
        <climbing-type-input
          v-model="climbingTypes"
          environment="user"
        />

        <p class="mt-5 font-weight-bold text-decoration-underline">
          {{ $t('components.user.whichLevel') }}
        </p>
        <v-row>
          <v-col>
            <v-select
              v-model="data.grade_min"
              :items="gradesList"
              item-value="value"
              item-text="text"
              :label="$t('models.user.grade_min')"
              outlined
            />
          </v-col>
          <v-col>
            <v-select
              v-model="data.grade_max"
              :items="gradesList"
              item-value="value"
              item-text="text"
              :label="$t('models.user.grade_max')"
              outlined
            />
          </v-col>
        </v-row>

        <!-- Bio -->
        <p class="mt-5 font-weight-bold text-decoration-underline">
          {{ $t('components.user.completeBio') }}
        </p>
        <markdown-input
          v-model="data.description"
          :label="$t('models.user.description')"
        />

        <genre-input v-model="data.genre" />

        <!-- Localities -->
        <div class="mb-8">
          <p class="mb-2 mt-3 font-weight-bold text-decoration-underline">
            {{ $t('components.user.partnerLocalitiesTitle') }}
          </p>
          <search-place-localisation
            v-model="newLocality"
          />
          <div
            v-if="localityUsers.length > 0"
            class="mb-8 mt-10"
          >
            <p class="font-weight-bold text-decoration-underline mb-2">
              {{ $t('components.user.myCities') }}
            </p>

            <div
              v-for="(localityUser, localityUserIndex) in localityUsers"
              :key="`place-index-${localityUserIndex}`"
            >
              <locality-user-edit-card
                :locality-user="localityUser"
                :reload-localities="getLocalityUsers"
              />
            </div>
          </div>
        </div>
      </div>

      <submit-form
        :overlay="submitOverlay"
        submit-local-key="actions.save"
      />
    </v-form>
  </div>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import SubmitForm from '@/components/forms/SubmitForm'
import ClimbingTypeInput from '@/components/forms/ClimbingTypeInput'
import MarkdownInput from '@/components/forms/MarkdownInput'
import SearchPlaceLocalisation from '~/components/forms/SearchPlaceInput.vue'
import LocalityUserApi from '~/services/oblyk-api/LocalityUserApi'
import LocalityUser from '~/models/LocalityUser'
import LocalityUserEditCard from '~/components/localityUsers/forms/LocalityUserEditCard.vue'
import DateOfBirthInput from '~/components/forms/DateOfBirthInput.vue'
import GenreInput from '~/components/forms/GenreInput.vue'

export default {
  name: 'PartnerForm',
  components: {
    GenreInput,
    DateOfBirthInput,
    LocalityUserEditCard,
    SearchPlaceLocalisation,
    MarkdownInput,
    ClimbingTypeInput,
    SubmitForm
  },
  mixins: [FormHelpers],
  props: {
    user: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      newLocality: null,
      loadingLocalityUsers: true,
      localityUsers: [],
      climbingTypes: this.user ? this.user.climbingTypes : [],
      gradesList: [
        { text: '3a', value: 13 },
        { text: '3b', value: 15 },
        { text: '3c', value: 17 },
        { text: '4a', value: 19 },
        { text: '4b', value: 21 },
        { text: '4c', value: 23 },
        { text: '5a', value: 25 },
        { text: '5b', value: 27 },
        { text: '5c', value: 29 },
        { text: '6a', value: 31 },
        { text: '6b', value: 33 },
        { text: '6c', value: 35 },
        { text: '7a', value: 37 },
        { text: '7b', value: 39 },
        { text: '7c', value: 41 },
        { text: '8a', value: 43 },
        { text: '8b', value: 45 },
        { text: '8c', value: 47 },
        { text: '9a', value: 49 },
        { text: '9b', value: 51 },
        { text: '9c', value: 53 }
      ],
      data: {
        partner_search: this.user?.partner_search || false,
        date_of_birth: this.user?.date_of_birth,
        genre: this.user?.genre,
        bouldering: this.user?.bouldering,
        sport_climbing: this.user?.sport_climbing,
        multi_pitch: this.user?.multi_pitch,
        trad_climbing: this.user?.trad_climbing,
        aid_climbing: this.user?.aid_climbing,
        deep_water: this.user?.deep_water,
        via_ferrata: this.user?.via_ferrata,
        pan: this.user?.pan,
        grade_min: this.user?.grade_min,
        grade_max: this.user?.grade_max,
        description: this.user?.description
      }
    }
  },

  watch: {
    climbingTypes: {
      handler () {
        this.data.bouldering = this.climbingTypes.includes('bouldering')
        this.data.sport_climbing = this.climbingTypes.includes('sport_climbing')
        this.data.multi_pitch = this.climbingTypes.includes('multi_pitch')
        this.data.trad_climbing = this.climbingTypes.includes('trad_climbing')
        this.data.aid_climbing = this.climbingTypes.includes('aid_climbing')
        this.data.deep_water = this.climbingTypes.includes('deep_water')
        this.data.via_ferrata = this.climbingTypes.includes('via_ferrata')
        this.data.pan = this.climbingTypes.includes('pan')
      },
      deep: true
    },

    newLocality () {
      this.addLocalityUser(this.newLocality.lat, this.newLocality.lng)
    }
  },

  mounted () {
    this.getLocalityUsers()
  },

  methods: {
    submit () {
      this.submitOverlay = true

      // If no date of birth
      if (this.data.date_of_birth === null) {
        this.$root.$emit('alertSimpleError', `${this.$t('models.user.date_of_birth')} ${this.$t('errors.rules.is_required')}`)
        this.submitOverlay = false
        return false
      }

      // If user is minor
      if (
        this
          .$moment(this.data.date_of_birth)
          .isAfter(
            this.$moment().subtract(18, 'year')
          )
      ) {
        this.$root.$emit('alertSimpleError', this.$t('errors.rules.you_must_be_major'))
        this.submitOverlay = false
        return false
      }

      new CurrentUserApi(this.$axios, this.$auth)
        .update(this.data)
        .then(() => {
          this.$auth.fetchUser().then(() => {
            this.$router.push(this.data.partner_search ? '/maps/climbers' : '/home')
          })
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        }).then(() => {
          this.submitOverlay = false
        })
    },

    getLocalityUsers () {
      this.loadingLocalityUsers = true
      this.localityUsers = []
      new LocalityUserApi(this.$axios, this.$auth)
        .all()
        .then((resp) => {
          for (const localityUser of resp.data) {
            this.localityUsers.push(new LocalityUser({ attributes: localityUser }))
          }
        })
    },

    addLocalityUser (latitude, longitude) {
      new LocalityUserApi(this.$axios, this.$auth)
        .create({ latitude, longitude })
        .then(() => {
          this.getLocalityUsers()
        })
    }
  }
}
</script>
