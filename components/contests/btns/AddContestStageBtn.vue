<template>
  <v-dialog
    v-model="addModal"
    width="600"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        text
        :disabled="disabled"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>
          {{ mdiPlus }}
        </v-icon>
        {{ $t('actions.add') }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Ajouter une épreuve
      </v-card-title>
      <div class="pa-4">
        <contest-stage-form
          :contest="contest"
          :gym="contest.Gym"
          submit-methode="post"
          :callback="addCallback"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPlus } from '@mdi/js'
import ContestStageForm from '~/components/contests/forms/ContestStageForm.vue'

export default {
  name: 'AddContestStageBtn',
  components: { ContestStageForm },
  props: {
    contest: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
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
      this.callback('latest')
    }
  }
}
</script>
