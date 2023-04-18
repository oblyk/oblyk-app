<template>
  <div>
    <v-select
      v-model="openers"
      :items="openersList"
      item-text="text"
      item-value="value"
      chips
      clearable
      :label="$t('components.input.gymOpener')"
      multiple
      outlined
      :loadin="loadingOpener"
      @change="onChange()"
    >
      <template
        v-if="gymAuthCan(gym, 'manage_opener')"
        #append-outer
      >
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              class="mt-n2"
              icon
              @click="addOpenerModal = true"
            >
              <v-icon v-on="on">
                {{ mdiAccountPlus }}
              </v-icon>
            </v-btn>
          </template>
          {{ $t('components.input.gymAddOpener') }}
        </v-tooltip>
      </template>
    </v-select>

    <v-dialog
      v-model="addOpenerModal"
      width="500"
    >
      <v-card>
        <v-card-title>
          {{ $t('components.input.gymAddOpener') }}
        </v-card-title>
        <v-card-text>
          <gym-opener-form
            :gym="gym"
            :callback="getOpeners"
            submit-methode="post"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiAccountPlus } from '@mdi/js'
import GymOpenerApi from '~/services/oblyk-api/GymOpenerApi'
import GymOpenerForm from '~/components/gyms/forms/GymOpenerForm.vue'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'

export default {
  name: 'GymOpenerInput',
  components: { GymOpenerForm },
  mixins: [GymRolesHelpers],
  props: {
    value: {
      type: Array,
      default: null
    },
    gym: {
      type: Object,
      required: true
    },
    withDeactivatedOpener: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      loadingOpener: true,
      openersList: [],
      openers: this.value,
      addOpenerModal: false,

      mdiAccountPlus
    }
  },

  mounted () {
    this.getOpeners()
  },

  methods: {
    getOpeners (opener = null) {
      this.loadingOpener = true
      this.openersList = []
      this.addOpenerModal = false
      const activate = this.withDeactivatedOpener ? null : true
      new GymOpenerApi(this.$axios, this.$auth)
        .all(this.gym.id, activate)
        .then((resp) => {
          for (const opener of resp.data) {
            this.openersList.push(
              {
                text: opener.name,
                value: opener.id
              }
            )
          }
          if (opener) {
            this.openers.push(opener.id)
          }
        })
        .finally(() => {
          this.loadingOpener = false
        })
    },

    onChange () {
      this.$emit('input', this.openers)
    }
  }
}
</script>
