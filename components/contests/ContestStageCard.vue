<template>
  <div>
    <v-card class="pa-4 rounded-sm">
      <div class="text-right">
        <v-menu>
          <template #activator="{ on, attrs }">
            <v-btn
              :loading="loadingAction"
              outlined
              text
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>
                {{ mdiDotsVertical }}
              </v-icon>
              Actions
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
            <v-list-item @click="deleteStage()">
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
    </v-card>

    <!-- Steps -->
    <div class="mt-4 mb-1 d-flex">
      <h2 class="pl-1">
        {{ $t(`models.climbs.${contestStage.climbing_type}`) }} : Les étapes
      </h2>
      <v-spacer />
      <add-contest-stage-step-btn
        :contest-stage="contestStage"
        :contest="contest"
        :callback="getSteps"
      />
    </div>

    <!-- Steps -->
    <v-progress-circular
      v-if="loadingSteps"
      indeterminate
    />
    <div v-else>
      <v-card
        v-for="(step, stepIndex) in steps"
        :key="`step-${stepIndex}`"
        class="pa-2 rounded-sm mb-4"
      >
        <contest-stage-step-card
          :get-stage-steps="getSteps"
          :contest-stage-step="step"
          :contest-stage="contestStage"
          :contest="contest"
        />
      </v-card>
      <div v-if="steps.length === 0">
        <p class="my-5 text-center text--disabled">
          Ajouter les étapes comme les Qualifications, Demi-final, Final, etc.
        </p>
      </div>
    </div>

    <!-- Edit stage modal -->
    <v-dialog
      v-model="editModal"
      width="600"
    >
      <v-card>
        <v-card-title>
          {{ $t('actions.edit') }} {{ contestStage.name }}
        </v-card-title>
        <div class="pa-4">
          <contest-stage-form
            :key="`contest-stage-id-${contestStage.id}`"
            :gym="contest.Gym"
            :contest="contest"
            :contest-stage="contestStage"
            submit-methode="put"
            :callback="editCallback"
          />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiDotsVertical, mdiPencil, mdiTrashCan } from '@mdi/js'
import ContestStageApi from '~/services/oblyk-api/ContestStageApi'
import ContestStageForm from '~/components/contests/forms/ContestStageForm'
import ContestStageStepApi from '~/services/oblyk-api/ContestStageStepApi'
import ContestStageStep from '~/models/ContestStageStep'
import AddContestStageStepBtn from '~/components/contests/btns/AddContestStageStepBtn'
import ContestStageStepCard from '~/components/contests/ContestStageStepCard'

export default {
  name: 'ContestStageCard',
  components: {
    ContestStageStepCard,
    AddContestStageStepBtn,
    ContestStageForm
  },
  props: {
    contest: {
      type: Object,
      required: true
    },
    contestStage: {
      type: Object,
      required: true
    },
    getStages: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      editModal: false,
      loadingAction: false,

      loadingSteps: true,
      steps: [],

      mdiDotsVertical,
      mdiPencil,
      mdiTrashCan
    }
  },

  mounted () {
    this.getSteps()
  },

  methods: {
    deleteStage () {
      if (confirm('ếtes vous sûr de supprimer cette épreuve ?')) {
        this.loadingAction = true
        new ContestStageApi(this.$axios, this.$auth)
          .delete(this.contest.gym_id, this.contest.id, this.contestStage.id)
          .then(() => {
            this.getStages()
          })
          .finally(() => {
            this.loadingAction = false
          })
      }
    },

    getSteps () {
      this.loadingSteps = true
      new ContestStageStepApi(this.$axios, this.$auth)
        .all(
          this.contest.gym_id,
          this.contest.id,
          this.contestStage.id,
          { with_routes: true }
        )
        .then((resp) => {
          this.steps = []
          for (const step of resp.data) {
            this.steps.push(new ContestStageStep({ attributes: step }))
          }
        })
        .finally(() => {
          this.loadingSteps = false
        })
    },

    editCallback () {
      this.editModal = false
      this.getStages()
    }
  }
}
</script>
