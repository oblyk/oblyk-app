<template>
  <div>
    <v-select
      ref="gymOpenerInput"
      v-model="openers"
      :items="openersList"
      item-text="text"
      item-value="value"
      chips
      :label="$t('components.input.gymOpener')"
      :menu-props="{ maxHeight: 500 }"
      multiple
      outlined
      :prepend-inner-icon="icon"
      :disabled="loadingOpener"
      :loadin="loadingOpener"
      readonly
      :hide-details="hideDetails"
      @click="openModal"
      @focus="openModal"
    />

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

    <v-dialog
      v-model="openerModal"
      max-width="450"
      persistent
      :fullscreen="$vuetify.breakpoint.mobile"
    >
      <v-card class="d-flex flex-column">
        <v-card-text class="px-0">
          <v-sheet
            style="position: sticky; top: 0"
            class="pa-4 rounded"
          >
            <v-text-field
              v-model="openerQuery"
              :label="$t('components.input.searchOpener')"
              hide-details
              dense
              clearable
              outlined
              :prepend-inner-icon="icon"
            />
          </v-sheet>
          <div class="overflow-y-auto px-4">
            <opener-btn
              v-for="(opener, openerIndex) in filteredOpenersList"
              :key="`opener-index-${openerIndex}`"
              :opener="opener"
              :opener-list="openers"
              @input="addOpener"
            />
            <p
              v-if="filteredOpenersList.length === 0"
              class="text-center font-italic"
            >
              {{ $t('components.input.noOpeners') }}
            </p>
            <v-btn
              v-if="gymAuthCan(gym, 'manage_opener')"
              outlined
              block
              text
              class="mt-5"
              @click="openAddOpenerModal"
            >
              <v-icon left>
                {{ mdiAccountPlus }}
              </v-icon>
              {{ $t('actions.addOpener') }}
            </v-btn>
          </div>
        </v-card-text>
        <v-sheet
          class="pa-4 mt-auto d-flex"
          style="position: sticky; bottom: 0"
        >
          <v-btn
            text
            @click.prevent="closeModal"
          >
            {{ $t('actions.close') }}
          </v-btn>
          <v-btn
            color="primary"
            elevation="0"
            class="ml-auto"
            @click.prevent="closeModal"
          >
            {{ $t('actions.ok') }}
          </v-btn>
        </v-sheet>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiAccountPlus } from '@mdi/js'
import GymOpenerApi from '~/services/oblyk-api/GymOpenerApi'
import GymOpenerForm from '~/components/gyms/forms/GymOpenerForm.vue'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import OpenerBtn from '~/components/forms/OpenerBtn.vue'

export default {
  name: 'GymOpenerInput',
  components: { OpenerBtn, GymOpenerForm },
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
    icon: {
      type: String,
      default: null
    },
    withDeactivatedOpener: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      loadingOpener: true,
      openable: true,
      openersList: [],
      openers: this.value,
      openerModal: false,
      addOpenerModal: false,
      openerQuery: null,

      mdiAccountPlus
    }
  },

  computed: {
    filteredOpenersList () {
      if (this.openerQuery === null || this.openerQuery === '') {
        return this.openersList
      }

      const openers = []
      for (const open of this.openersList) {
        if (open.text.toLowerCase().includes(this.openerQuery.toLowerCase())) {
          openers.push(open)
        }
      }
      return openers
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
    },

    addOpener (openerValue) {
      if (this.openers.includes(openerValue)) {
        const openerIndex = this.openers.indexOf(openerValue)
        this.openers.splice(openerIndex, 1)
      } else {
        this.openers.push(openerValue)
      }
      this.$emit('input', this.openers)
    },

    openModal () {
      this.openerQuery = null
      if (!this.openable) {
        return false
      }
      this.openerModal = true
    },

    openAddOpenerModal () {
      this.openable = false
      setTimeout(() => { this.openable = true }, 200)
      this.openerModal = false
      this.addOpenerModal = true
    },

    closeModal () {
      this.openable = false
      setTimeout(() => { this.openable = true }, 200)
      this.openerModal = false
      this.$refs.gymOpenerInput.focus()
    }
  }
}
</script>
