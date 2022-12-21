<template>
  <v-dialog
    v-model="editClimbingSessionModal"
    width="600"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        text
        small
        v-bind="attrs"
        v-on="on"
        v-text="climbingSession.description ? $t('components.climbingSession.editComment') : $t('components.climbingSession.addComment')"
      />
    </template>

    <v-card>
      <v-card-title
        v-text="climbingSession.description ? $t('components.climbingSession.editComment') : $t('components.climbingSession.addComment')"
      />
      <v-card-text>
        <climbing-session-form
          :climbing-session="climbingSession"
          :callback="dialogCallback"
          submit-methode="put"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import ClimbingSessionForm from '~/components/climbingSessions/forms/ClimbingSessionForm.vue'

export default {
  name: 'EditClimbingSessionBtn',
  components: { ClimbingSessionForm },

  props: {
    climbingSession: {
      type: Object,
      default: null
    },

    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      editClimbingSessionModal: false
    }
  },

  methods: {
    dialogCallback () {
      this.editClimbingSessionModal = false
      this.callback()
    }
  }
}
</script>
