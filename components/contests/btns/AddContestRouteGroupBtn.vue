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
      Ajouter des {{ $t(`models.climbs.${contestStage.climbing_type}`) }}s
    </v-btn>
    <v-dialog
      v-model="addModal"
      width="700"
    >
      <v-card>
        <v-card-title>
          Ajouter des {{ $t(`models.climbs.${contestStage.climbing_type}`) }}s
        </v-card-title>
        <div class="pa-4">
          <contest-route-group-form
            :contest="contest"
            :contest-stage="contestStage"
            :contest-stage-step="contestStageStep"
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
import ContestRouteGroupForm from '~/components/contests/forms/ContestRouteGroupForm.vue'

export default {
  name: 'AddContestRouteGroupBtn',
  components: { ContestRouteGroupForm },
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
