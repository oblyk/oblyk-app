<template>
  <v-dialog
    v-model="addModal"
    width="600"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        text
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
        Ajouter une vague
      </v-card-title>
      <div class="pa-4">
        <contest-wave-form
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
import ContestWaveForm from '~/components/contests/forms/ContestWaveForm.vue'

export default {
  name: 'AddContestWaveBtn',
  components: { ContestWaveForm },
  props: {
    contest: {
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
