<template>
  <div>
    <div class="d-flex mb-2 border-bottom">
      <h4 class="pl-1 mb-0 pt-2">
        {{ stageStep.step_order }} / {{ stageStep.name }}
      </h4>
      <v-spacer />
      <div>
        <v-btn
          icon
          @click="getStageStep"
        >
          <v-icon>
            {{ mdiRefresh }}
          </v-icon>
        </v-btn>
        <v-menu>
          <template #activator="{ on, attrs }">
            <v-btn
              :loading="loadingAction"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                {{ mdiDotsVertical }}
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              @click="editModal = true"
            >
              <v-list-item-icon>
                <v-icon>
                  {{ mdiPencil }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $t('actions.edit') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="deleteStageStep()">
              <v-list-item-icon>
                <v-icon>
                  {{ mdiTrashCan }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title class="red--text">
                {{ $t('actions.delete') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <ul>
      <li v-if="stageStep.default_participants_for_next_step">
        <strong>{{ stageStep.default_participants_for_next_step }}</strong> participants passe à l'étape suivante.
      </li>
      <li>
        Les participants renseignent eux-même leur réalisations :
        <v-chip small @click="editModal = true">
          {{ stageStep.self_reporting ? 'oui' : 'non' }}
        </v-chip>
      </li>
      <li>
        Type de classement :
        <v-chip small @click="editModal = true">
          {{ $t(`models.contestRankingType.${stageStep.ranking_type}`) }}
        </v-chip>
      </li>
      <li v-if="showAscentsLimit()">
        {{ $t('models.contestStageStep.ascents_limit') }}
        <v-chip small @click="editModal = true">
          {{ stageStep.ascents_limit }} meilleurs ascensions
        </v-chip>
      </li>
    </ul>
    <div class="d-flex mt-4">
      <h3>
        Les <span class="text-decoration-underline">{{ $t(`models.climbsContest.${contestStage.climbing_type}`) }}</span> de <span class="text-decoration-underline">{{ stageStep.name.toLowerCase() }}</span> par catégories :
      </h3>
      <v-spacer />
      <add-contest-route-group-btn
        :contest-stage-step="stageStep"
        :contest-stage="contestStage"
        :contest="contest"
        :callback="getStageStep"
      />
    </div>
    <v-row v-if="stageStep.contest_route_groups.length > 0">
      <v-col
        v-for="(routeGroup, routeGroupIndex) in stageStep.contest_route_groups"
        :key="`route-group-index-${routeGroupIndex}`"
        cols="12"
        :md="stageStep.contest_route_groups.length >= 2 ? 6 : 12"
        :lg="stageStep.contest_route_groups.length >= 3 ? 4 : 12 / stageStep.contest_route_groups.length"
      >
        <contest-route-group-card
          :contest-route-group="routeGroup"
          :contest-stage-step="stageStep"
          :contest-stage="contestStage"
          :contest="contest"
          :get-contest-stage-step="getStageStep"
        />
      </v-col>
    </v-row>
    <div v-else>
      <p class="text-center py-4 text--disabled">
        Ajouter les {{ $t(`models.climbsContest.${contestStage.climbing_type}`) }} à faire par catégorie
      </p>
    </div>

    <!-- Edit step -->
    <v-dialog
      v-model="editModal"
      width="600"
    >
      <v-card>
        <v-card-title>
          {{ $t('actions.edit') }} {{ stageStep.name }}
        </v-card-title>
        <div class="pa-4">
          <contest-stage-step-form
            :gym="contest.Gym"
            :contest="contest"
            :contest-stage="contestStage"
            :contest-stage-step="stageStep"
            submit-methode="put"
            :callback="editCallback"
          />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiDotsVertical, mdiPencil, mdiTrashCan, mdiRefresh } from '@mdi/js'
import ContestStageStepApi from '~/services/oblyk-api/ContestStageStepApi'
import ContestStageStepForm from '~/components/contests/forms/ContestStageStepForm'
import { DateHelpers } from '~/mixins/DateHelpers'
import AddContestRouteGroupBtn from '~/components/contests/btns/AddContestRouteGroupBtn.vue'
import ContestRouteGroupCard from '~/components/contests/ContestRouteGroupCard.vue'
import ContestStageStep from '~/models/ContestStageStep'

export default {
  name: 'ContestStageStepCard',
  components: { ContestRouteGroupCard, AddContestRouteGroupBtn, ContestStageStepForm },
  mixins: [DateHelpers],
  props: {
    contest: {
      type: Object,
      required: true
    },
    contestStage: {
      type: Object,
      required: true
    },
    contestStageStep: {
      type: Object,
      required: true
    },
    getStageSteps: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      editModal: false,
      loadingAction: false,
      stageStep: this.contestStageStep,

      mdiDotsVertical,
      mdiPencil,
      mdiTrashCan,
      mdiRefresh
    }
  },

  methods: {
    deleteStageStep () {
      if (confirm('ếtes vous sûr de supprimer cette étape ?')) {
        this.loadingAction = true
        new ContestStageStepApi(this.$axios, this.$auth)
          .delete(this.contest.gym_id, this.contest.id, this.contestStage.id, this.stageStep.id)
          .then(() => {
            this.getStageSteps()
          })
          .finally(() => {
            this.loadingAction = false
          })
      }
    },

    getStageStep () {
      this.loadingAction = true
      new ContestStageStepApi(this.$axios, this.$auth)
        .find(
          this.contest.gym_id,
          this.contest.id,
          this.contestStage.id,
          this.stageStep.id
        )
        .then((resp) => {
          this.stageStep = new ContestStageStep({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingAction = false
        })
    },

    editCallback () {
      this.editModal = false
      this.getStageStep()
    },

    showAscentsLimit () {
      return this.stageStep.ascents_limit !== null && ['fixed_points', 'point_relative_to_highest_hold'].includes(this.stageStep.ranking_type)
    }
  }
}
</script>
