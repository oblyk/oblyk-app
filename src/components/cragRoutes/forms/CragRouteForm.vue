<template>
  <v-form @submit.prevent="submit()">
    <small v-html="$t('components.cragRoute.tips')" @click="data.name = ''" />
    <v-row>
      <v-col class="pb-0">
        <v-select
          :label="$t('models.cragRoute.crag_sector')"
          :items="crag.sectors"
          v-model="data.crag_sector_id"
          outlined
          clearable
          prepend-inner-icon="mdi-texture-box"
          item-value="id"
          item-text="name"
        />
      </v-col>
      <v-col class="pb-0">
        <v-select
          :label="$t('models.cragRoute.climbing_type')"
          :items="climbingCragList"
          v-model="data.climbing_type"
          outlined
          prepend-inner-icon="mdi-source-branch"
          item-value="value"
          item-text="text"
        />
      </v-col>
    </v-row>

    <crag-route-search
      v-if="!isEditingForm()"
      icon="mdi-format-letter-case"
      :crag="crag"
      label-key="models.cragRoute.name"
      :hide-detail="false"
      v-model="data.name"
      event-trigger="showSimilarRoute"
    />

    <v-text-field
      v-if="isEditingForm()"
      outlined
      prepend-inner-icon="mdi-format-letter-case"
      :label="$t('models.cragRoute.name')"
      v-model="data.name"
    />

    <div v-if="similarRoutes.length > 0" class="mb-10 mt-n5">
      <p class="mb-0">
        <v-icon left small color="red">mdi-alert</v-icon>
        {{ $tc('components.cragRoute.similarRoute', similarRoutes.length, { count: similarRoutes.length }) }} :
      </p>
      <ul>
        <li
          class="li-similar-route"
          v-bind:class="`climbs-pastille ${similarRoute.climbing_type}`"
          v-for="(similarRoute, index) in similarRoutes"
          :key="`similar-route-${index}`"
        >
          <router-link
            class="discrete-link"
            :to="similarRoute.path()"
          >
            {{ similarRoute.grade_to_s }} -
            {{ similarRoute.name }}
            <cite
              class="text--disabled"
              v-if="similarRoute.CragSector.name"
            >
              (secteur : {{ similarRoute.CragSector.name }})
            </cite>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- If multi pitch -->
    <div v-if="sectionnable()">
      <v-text-field
        outlined
        prepend-inner-icon="mdi-arrow-expand-vertical"
        type="number"
        v-model="data.height"
        :hint="$t('components.cragRoute.inMeters')"
        :label="$t('models.cragRoute.total_height')"
      />

      <v-card
        class="mb-6"
        v-for="(section, index) in data.sections"
        :key="`section-${index}`"
      >
        <v-card-title class="caption font-weight-bold">
          {{ $t('components.cragRoute.pitch') }} : {{ index + 1}}
        </v-card-title>
        <v-card-text>

          <v-row>
            <v-col class="pb-0">
              <!-- Grade -->
              <v-text-field
                outlined
                prepend-inner-icon="mdi-numeric-7-box-multiple-outline"
                v-model="data.sections[index].grade"
                hide-details
                :label="$t('models.cragRoute.grade')"
              />
            </v-col>
            <v-col class="pb-0">
              <v-text-field
                outlined
                hide-details
                prepend-inner-icon="mdi-arrow-expand-vertical"
                type="number"
                v-model="data.sections[index].height"
                :hint="$t('components.cragRoute.inMeters')"
                :label="$t('models.cragRoute.height')"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <anchor-input
                :hide-details="true"
                v-model="data.sections[index].anchor_type"
              />
            </v-col>
            <v-col>
              <bolt-input
                :hide-details="true"
                v-model="data.sections[index].bolt_type"
              />
            </v-col>
            <v-col>
              <v-text-field
                outlined
                prepend-inner-icon="mdi-dots-vertical"
                type="number"
                hide-details
                v-model="data.sections[index].bolt_count"
                :label="$t('models.cragRoute.bolt_count')"
              />
            </v-col>
          </v-row>
          <tags-input
            class="mb-4"
            :hide-details="true"
            v-model="data.sections[index].tags"
          />
          <v-textarea
            outlined
            :hide-details="true"
            :label="$t('models.cragRoute.description')"
            rows="2"
            v-model="data.sections[index].description"
          />
        </v-card-text>
      </v-card>

      <div class="text-right mb-3 mt-n3">
        <v-btn
          icon
          v-if="data.sections.length > 1"
          :title="$t('components.cragRoute.removePitch')"
          @click="removePitch()"
        >
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-btn
          icon
          :title="$t('components.cragRoute.addPitch')"
          @click="addPitch()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- If sigle pitch -->
    <div v-else>

      <!-- Grade -->
      <v-text-field
        outlined
        prepend-inner-icon="mdi-numeric-7-box-multiple-outline"
        v-model="data.sections[0].grade"
        :hint="$t('components.cragRoute.gradeExample')"
        :label="$t('models.cragRoute.grade')"
      />

      <v-text-field
        outlined
        prepend-inner-icon="mdi-arrow-expand-vertical"
        type="number"
        v-model="data.height"
        :hint="$t('components.cragRoute.inMeters')"
        :label="$t('models.cragRoute.height')"
      />

      <incline-input
        v-model="data.sections[0].incline_type"
      />

      <v-row v-if="startable() || receptionable()">
        <v-col class="pb-0 pt-0">
          <start-input
            v-if="startable()"
            v-model="data.sections[0].start_type"
          />
        </v-col>
        <v-col class="pb-0 pt-0">
          <reception-input
            v-if="receptionable()"
            v-model="data.sections[0].reception_type"
          />
        </v-col>
      </v-row>

      <v-row v-if="anchorable() || boltable()">
        <v-col class="pb-0 pt-0">
          <anchor-input
            v-if="anchorable()"
            v-model="data.sections[0].anchor_type"
          />
        </v-col>
        <v-col class="pb-0 pt-0">
          <bolt-input
            v-model="data.sections[0].bolt_type"
          />
        </v-col>
        <v-col class="pb-0 pt-0">
          <v-text-field
            outlined
            prepend-inner-icon="mdi-dots-vertical"
            type="number"
            v-model="data.sections[0].bolt_count"
            :label="$t('models.cragRoute.bolt_count')"
          />
        </v-col>
      </v-row>

      <tags-input
        v-model="data.sections[0].tags"
      />
    </div>

    <v-row>
      <v-col class="pt-0">
        <v-text-field
          outlined
          prepend-inner-icon="mdi-bolt"
          v-model="data.opener"
          :label="$t('models.cragRoute.opener')"
        />
      </v-col>
      <v-col class="pt-0">
        <v-text-field
          outlined
          prepend-inner-icon="mdi-calendar"
          v-model="data.open_year"
          type="number"
          :label="$t('models.cragRoute.open_year')"
        />
      </v-col>
    </v-row>

    <close-form/>
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitCragRouteText()"
    >
      <v-btn
        class="float-right mr-2"
        text
        @click="submit(false)"
        v-if="!isEditingForm()"
      >
        {{ $t('actions.createAndQuite') }}
      </v-btn>
    </submit-form>
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import CragRouteApi from '@/services/oblyk-api/CragRouteApi'
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
  mixins: [FormHelpers],
  props: {
    crag: Object,
    cragSector: Object,
    cragRoute: Object
  },

  data () {
    return {
      similarRoutes: [],
      StaticRoute: new CragRoute(),
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
        crag_sector_id: (this.cragRoute || {}).crag_sector_id || (this.cragSector || {}).id,
        height: (this.cragRoute || {}).height,
        opener: (this.cragRoute || {}).opener,
        open_year: (this.cragRoute || {}).open_year,
        crag_id: (this.cragRoute || {}).crag_id || this.crag.id,
        sections: (this.cragRoute || {}).sections || [this.defaultSection()]
      }
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
    defaultSection: function () {
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

    showSimilarRoute: function (results) {
      this.similarRoutes = results
    },

    submitCragRouteText: function () {
      return this.isEditingForm() ? 'actions.edit' : 'actions.continueToAdd'
    },

    submit: function (continueToCreate = true) {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? CragRouteApi.update(this.data) : CragRouteApi.create(this.data)

      promise
        .then(resp => {
          const route = new CragRoute(resp.data)
          if (this.isEditingForm() || continueToCreate === false) {
            this.$router.push(route.path())
          } else {
            this.data.name = null
            if (this.sectionnable()) {
              this.data.sections = [this.defaultSection()]
            } else {
              this.data.sections[0].grade = null
            }
            this.$root.$emit('alertSimpleSuccess', this.$t('components.cragRoute.routeAdded', { name: route.name }))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'cragRoute')
        })
        .then(() => {
          this.submitOverlay = false
        })
    },

    addPitch: function () {
      this.data.sections.push(this.defaultSection())
    },

    removePitch: function () {
      this.data.sections.pop()
    },

    sectionnable: function () {
      const acceptable = [
        'multi_pitch',
        'trad_climbing',
        'aid_climbing',
        'via_ferrata'
      ]
      return (acceptable.includes(this.data.climbing_type))
    },

    anchorable: function () {
      return this.StaticRoute.isAnchorable(this.data.climbing_type)
    },

    startable: function () {
      return this.StaticRoute.isStartable(this.data.climbing_type)
    },

    receptionable: function () {
      return this.StaticRoute.isReceptionable(this.data.climbing_type)
    },

    boltable: function () {
      return this.StaticRoute.isBoltable(this.data.climbing_type)
    }
  }
}
</script>

<style lang="scss" scoped>
.li-similar-route {
  list-style-type: none;
}
</style>
