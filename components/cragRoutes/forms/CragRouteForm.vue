<template>
  <v-form @submit.prevent="submit()">
    <div class="mb-2">
      <small @click="data.name = ''" v-html="$t('components.cragRoute.tips')" />
    </div>
    <v-row>
      <v-col class="pb-0">
        <v-select
          ref="cragSectorInput"
          v-model="data.crag_sector_id"
          v-disabled-icon-focus
          :label="$t('models.cragRoute.crag_sector')"
          :items="sectors"
          tabindex="1"
          outlined
          clearable
          :prepend-inner-icon="mdiTextureBox"
          item-value="id"
          item-text="name"
        />
      </v-col>
      <v-col class="pb-0">
        <v-select
          ref="climbingTypeInput"
          v-model="data.climbing_type"
          :label="$t('models.cragRoute.climbing_type')"
          :items="climbingCragList"
          tabindex="2"
          outlined
          :prepend-inner-icon="mdiSourceBranch"
          item-value="value"
          item-text="text"
        />
      </v-col>
    </v-row>

    <crag-route-search
      v-if="!isEditingForm()"
      v-model="data.name"
      :icon="mdiFormatLetterCase"
      :crag="crag"
      :tabindex="3"
      label-key="models.cragRoute.name"
      :hide-detail="false"
      event-trigger="showSimilarRoute"
    />

    <v-text-field
      v-if="isEditingForm()"
      v-model="data.name"
      outlined
      tabindex="3"
      :prepend-inner-icon="mdiFormatLetterCase"
      :label="$t('models.cragRoute.name')"
    />

    <div v-if="similarRoutes.length > 0" class="mb-10 mt-n5">
      <p class="mb-0">
        <v-icon left small color="red">
          {{ mdiAlert }}
        </v-icon>
        {{ $tc('components.cragRoute.similarRoute', similarRoutes.length, { count: similarRoutes.length }) }} :
      </p>
      <ul>
        <li
          v-for="(similarRoute, index) in similarRoutes"
          :key="`similar-route-${index}`"
          class="li-similar-route"
          :class="`climbs-pastille ${similarRoute.climbing_type}`"
        >
          <nuxt-link
            class="discrete-link"
            :to="similarRoute.path"
          >
            {{ similarRoute.grade_to_s }} -
            {{ similarRoute.name }}
            <cite
              v-if="similarRoute.CragSector.name"
              class="text--disabled"
            >
              ({{ $t('models.cragRoute.crag_sector') }} : {{ similarRoute.CragSector.name }})
            </cite>
          </nuxt-link>
        </li>
      </ul>
    </div>

    <!-- If multi pitch -->
    <div v-if="sectionnable()">
      <v-text-field
        v-model="data.height"
        outlined
        tabindex="4"
        :prepend-inner-icon="mdiArrowExpandVertical"
        type="number"
        :hint="$t('components.cragRoute.inMeters')"
        :label="$t('models.cragRoute.total_height')"
      />

      <v-card
        v-for="(section, index) in data.sections"
        :key="`section-${index}`"
        class="mb-6"
      >
        <v-card-title class="caption font-weight-bold">
          {{ $t('components.cragRoute.pitch') }} : {{ index + 1 }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col class="pb-0">
              <!-- Grade -->
              <v-text-field
                v-model="data.sections[index].grade"
                outlined
                :tabindex="5 + index * 7"
                :prepend-inner-icon="mdiNumeric0BoxMultipleOutline"
                hide-details
                :label="$t('models.cragRoute.grade')"
              />
            </v-col>
            <v-col class="pb-0">
              <v-text-field
                v-model="data.sections[index].height"
                outlined
                hide-details
                :tabindex="6 + index * 7"
                :prepend-inner-icon="mdiArrowExpandVertical"
                type="number"
                :hint="$t('components.cragRoute.inMeters')"
                :label="$t('models.cragRoute.height')"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <anchor-input
                v-model="data.sections[index].anchor_type"
                :tabindex="7 + index * 7"
                :hide-details="true"
              />
            </v-col>
            <v-col>
              <bolt-input
                v-model="data.sections[index].bolt_type"
                :tabindex="8 + index * 7"
                :hide-details="true"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="data.sections[index].bolt_count"
                outlined
                :tabindex="9 + index * 7"
                :prepend-inner-icon="mdiDotsVertical"
                type="number"
                hide-details
                :label="$t('models.cragRoute.bolt_count')"
              />
            </v-col>
          </v-row>
          <tags-input
            v-model="data.sections[index].tags"
            class="mb-4"
            :tabindex="10 + index * 7"
            :hide-details="true"
          />
          <v-textarea
            v-model="data.sections[index].description"
            outlined
            :tabindex="11 + index * 7"
            :hide-details="true"
            :label="$t('models.cragRoute.description')"
            rows="2"
          />
        </v-card-text>
      </v-card>

      <div class="text-right mb-3 mt-n3">
        <v-btn
          v-if="data.sections.length > 1"
          icon
          :title="$t('components.cragRoute.removePitch')"
          @click="removePitch"
        >
          <v-icon>{{ mdiMinus }}</v-icon>
        </v-btn>
        <v-btn
          icon
          :title="$t('components.cragRoute.addPitch')"
          @click="addPitch"
        >
          <v-icon>{{ mdiPlus }}</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- If sigle pitch -->
    <div v-else>
      <!-- Grade -->
      <v-text-field
        v-model="data.sections[0].grade"
        outlined
        tabindex="4"
        :prepend-inner-icon="mdiNumeric0BoxMultipleOutline"
        :hint="$t('components.cragRoute.gradeExample')"
        :label="$t('models.cragRoute.grade')"
      />

      <v-text-field
        v-model="data.height"
        outlined
        tabindex="5"
        :prepend-inner-icon="mdiArrowExpandVertical"
        type="number"
        :hint="$t('components.cragRoute.inMeters')"
        :label="$t('models.cragRoute.height')"
      />

      <incline-input
        v-model="data.sections[0].incline_type"
        :tabindex="6"
      />

      <v-row v-if="startable() || receptionable()">
        <v-col class="pb-0 pt-0">
          <start-input
            v-if="startable()"
            v-model="data.sections[0].start_type"
            :tabindex="7"
          />
        </v-col>
        <v-col class="pb-0 pt-0">
          <reception-input
            v-if="receptionable()"
            v-model="data.sections[0].reception_type"
            :tabindex="8"
          />
        </v-col>
      </v-row>

      <v-row v-if="anchorable() || boltable()">
        <v-col class="pb-0 pt-0">
          <anchor-input
            v-if="anchorable()"
            v-model="data.sections[0].anchor_type"
            :tabindex="9"
          />
        </v-col>
        <v-col class="pb-0 pt-0">
          <bolt-input
            v-model="data.sections[0].bolt_type"
            :tabindex="10"
          />
        </v-col>
        <v-col class="pb-0 pt-0">
          <v-text-field
            v-model="data.sections[0].bolt_count"
            tabindex="11"
            outlined
            :prepend-inner-icon="mdiDotsVertical"
            type="number"
            :label="$t('models.cragRoute.bolt_count')"
          />
        </v-col>
      </v-row>

      <tags-input
        v-model="data.sections[0].tags"
        :tabindex="12"
      />
    </div>

    <!-- Common of all routes -->
    <v-row>
      <v-col class="pt-0">
        <v-text-field
          v-model="data.opener"
          outlined
          :tabindex="12 + 7 * data.sections.length"
          :prepend-inner-icon="mdiBolt"
          :label="$t('models.cragRoute.opener')"
        />
      </v-col>
      <v-col class="pt-0">
        <v-text-field
          v-model="data.open_year"
          outlined
          :tabindex="13 + 7 * data.sections.length"
          :prepend-inner-icon="mdiCalendar"
          type="number"
          :label="$t('models.cragRoute.open_year')"
        />
      </v-col>
    </v-row>

    <close-form />
    <submit-form
      :tabindex="14 + 7 * data.sections.length"
      :overlay="submitOverlay"
      :submit-local-key="submitCragRouteText()"
    >
      <v-btn
        v-if="!isEditingForm()"
        :tabindex="15 + 7 * data.sections.length"
        class="float-right mr-2"
        text
        @click="submit(false)"
      >
        {{ $t('actions.createAndQuite') }}
      </v-btn>
    </submit-form>
  </v-form>
</template>

<script>
import {
  mdiTextureBox,
  mdiSourceBranch,
  mdiFormatLetterCase,
  mdiAlert,
  mdiArrowExpandVertical,
  mdiNumeric0BoxMultipleOutline,
  mdiDotsVertical,
  mdiMinus,
  mdiPlus,
  mdiBolt,
  mdiCalendar
} from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import { InputHelpers } from '@/mixins/InputHelpers'
import { CragRouteHelpers } from '~/mixins/CragRouteHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'
import CloseForm from '@/components/forms/CloseForm'
import CragRoute from '@/models/CragRoute'
import AnchorInput from '@/components/forms/AnchorInput'
import BoltInput from '@/components/forms/BoltInput'
import ReceptionInput from '@/components/forms/ReceptionInput'
import StartInput from '@/components/forms/StartInput'
import InclineInput from '@/components/forms/InclineInput'
import TagsInput from '@/components/forms/TagsInput'
import CragRouteSearch from '@/components/cragRoutes/partial/CragRouteSearch'

export default {
  name: 'CragRouteForm',
  components: {
    CragRouteSearch,
    TagsInput,
    InclineInput,
    StartInput,
    ReceptionInput,
    BoltInput,
    AnchorInput,
    CloseForm,
    SubmitForm
  },
  mixins: [
    FormHelpers,
    InputHelpers,
    CragRouteHelpers
  ],
  props: {
    crag: {
      type: Object,
      default: null
    },
    cragSector: {
      type: Object,
      default: null
    },
    cragRoute: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      mdiTextureBox,
      mdiSourceBranch,
      mdiFormatLetterCase,
      mdiAlert,
      mdiArrowExpandVertical,
      mdiNumeric0BoxMultipleOutline,
      mdiDotsVertical,
      mdiMinus,
      mdiPlus,
      mdiBolt,
      mdiCalendar,
      similarRoutes: [],
      climbingCragList: [
        { text: this.$t('models.climbs.sport_climbing'), value: 'sport_climbing' },
        { text: this.$t('models.climbs.bouldering'), value: 'bouldering' },
        { text: this.$t('models.climbs.multi_pitch'), value: 'multi_pitch' },
        { text: this.$t('models.climbs.trad_climbing'), value: 'trad_climbing' },
        { text: this.$t('models.climbs.aid_climbing'), value: 'aid_climbing' },
        { text: this.$t('models.climbs.deep_water'), value: 'deep_water' },
        { text: this.$t('models.climbs.via_ferrata'), value: 'via_ferrata' }
      ],
      data: {
        id: (this.cragRoute || {}).id,
        name: (this.cragRoute || {}).name,
        climbing_type: (this.cragRoute || {}).climbing_type,
        crag_sector_id: ((this.cragRoute || {}).crag_sector || {}).id || (this.cragSector || {}).id,
        height: (this.cragRoute || {}).height,
        opener: (this.cragRoute || {}).opener,
        open_year: (this.cragRoute || {}).open_year,
        crag_id: (this.cragRoute || {}).crag_id || this.crag.id,
        sections: (this.cragRoute || {}).sections || [this.defaultSection()]
      }
    }
  },

  computed: {
    sectors () {
      return this.crag.sectors || []
    }
  },

  mounted () {
    this.$root.$on('showSimilarRoute', (results) => {
      this.showSimilarRoute(results)
    })
  },

  beforeDestroy () {
    this.$root.$off('showSimilarRoute')
  },

  methods: {
    defaultSection () {
      return {
        grade: null,
        height: null,
        description: null,
        bolt_count: null,
        bolt_type: null,
        climbing_type: null,
        anchor_type: null,
        incline_type: null,
        start_type: null,
        reception_type: null,
        tags: []
      }
    },

    showSimilarRoute (results) {
      this.similarRoutes = results
    },

    submitCragRouteText () {
      return this.isEditingForm() ? 'actions.edit' : 'actions.continueToAdd'
    },

    submit (continueToCreate = true) {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new CragRouteApi(this.$axios, this.$auth).update(this.data) : new CragRouteApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const route = new CragRoute({ attributes: resp.data })
          if (this.isEditingForm() || continueToCreate === false) {
            this.$router.push(route.path)
          } else {
            this.data.name = null
            if (this.sectionnable()) {
              this.data.sections = [this.defaultSection()]
            } else {
              this.data.sections[0].grade = null
              this.data.sections[0].tags = []
              this.data.sections[0].bolt_count = null
            }
            this.$root.$emit('clearRouteSearchGiveFocus')
            this.$root.$emit('alertSimpleSuccess', this.$t('components.cragRoute.routeAdded', { name: route.name }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'cragRoute')
        })
        .then(() => {
          this.submitOverlay = false
        })
    },

    addPitch () {
      this.data.sections.push(this.defaultSection())
    },

    removePitch () {
      this.data.sections.pop()
    },

    sectionnable () {
      return this.isSectionnable(this.data.climbing_type)
    },

    anchorable () {
      return this.isAnchorable(this.data.climbing_type)
    },

    startable () {
      return this.isStartable(this.data.climbing_type)
    },

    receptionable () {
      return this.isReceptionable(this.data.climbing_type)
    },

    boltable () {
      return this.isBoltable(this.data.climbing_type)
    }
  }
}
</script>

<style lang="scss" scoped>
.li-similar-route {
  list-style-type: none;
}
</style>
