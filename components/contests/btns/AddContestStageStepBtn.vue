<template>
  <div
    class="text-right"
    @click="addModal = true"
  >
    <v-btn
      text
      @click="addModal = true"
    >
      <v-icon left>
        {{ mdiPlus }}
      </v-icon>
      Ajouter une étape
    </v-btn>
    <v-dialog
      v-model="addModal"
      width="600"
    >
      <v-card>
        <v-card-title>
          Ajouter une étape
        </v-card-title>
        <v-card-subtitle>
          Qualification, demi-finale, finale, etc.
        </v-card-subtitle>
        <div class="pa-4">
          <contest-stage-step-form
            :contest="contest"
            :contest-stage="contestStage"
            :gym="contest.Gym"
            submit-methode="post"
            :callback="addCallback"
          />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiPlus } from '@mdi/js'
import ContestStageStepForm from '~/components/contests/forms/ContestStageStepForm.vue'

export default {
  name: 'AddContestStageStepBtn',
  components: { ContestStageStepForm },
  props: {
    contest: {
      type: Object,
      required: true
    },
    contestStage: {
      type: Object,
      required: true
    },
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      addModal: false,

      mdiPlus
    }
  },

  methods: {
    addCallback () {
      this.addModal = false
      this.callback()
    }
  }
}
</script>
