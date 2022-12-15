<template>
  <div>
    <v-btn
      text
      outlined
      :block="blockBtn"
      color="primary"
      @click="clickOnBtn"
    >
      {{ $t('actions.addMyAscents') }}
    </v-btn>

    <v-dialog
      v-model="ascentsModal"
      width="500"
      :fullscreen="$vuetify.breakpoint.mobile"
    >
      <v-card class="add-gym-ascents">
        <v-card-title :class="$vuetify.breakpoint.mobile ? 'px-3' : ''">
          {{ $t('actions.addMyAscents') }}
        </v-card-title>
        <v-card-text :class="$vuetify.breakpoint.mobile ? 'px-3' : ''">
          <ascent-gym-bulk-form
            :gym="gym"
            :callback="callback"
            :close-ascent-modal="closeAscentModal"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AscentGymBulkForm from '~/components/ascentGymRoutes/forms/AscentGymBulkForm.vue'

export default {
  name: 'AddGymAscentsBtn',
  components: { AscentGymBulkForm },

  props: {
    gym: {
      type: Object,
      required: true
    },
    blockBtn: {
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
      ascentsModal: false
    }
  },

  computed: {
    haveSpaces () {
      return this.gym.gym_spaces.length > 0
    }
  },

  methods: {
    clickOnBtn () {
      if (this.haveSpaces) {
        this.$router.push(this.gym.firstSpacePath)
      } else {
        this.ascentsModal = true
      }
    },

    closeAscentModal () {
      this.ascentsModal = false
    }
  }
}
</script>
