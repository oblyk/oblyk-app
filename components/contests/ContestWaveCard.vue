<template>
  <v-card class="full-height">
    <v-card-title>
      {{ contestWave.name }}
      <v-spacer />
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
          <v-list-item @click="deleteWave()">
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
    </v-card-title>
    <div class="px-4 pb-4">
      <span v-if="contestWave.capacity">
        {{ contestWave.contest_participants_count }} / {{ contestWave.capacity }} compétiteurs·ices inscrit
      </span>
      <span v-else>
        {{ contestWave.contest_participants_count }} compétiteurs·ices inscrit
      </span>
    </div>
    <v-dialog
      v-model="editModal"
      width="600"
    >
      <v-card>
        <v-card-title>
          {{ $t('actions.edit') }} {{ contestWave.name }}
        </v-card-title>
        <div class="pa-4">
          <contest-wave-form
            :key="`contest-wave-id-${contestWave.id}`"
            :gym="contest.Gym"
            :contest="contest"
            :contest-wave="contestWave"
            submit-methode="put"
            :callback="editCallback"
          />
        </div>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mdiDotsVertical, mdiPencil, mdiTrashCan } from '@mdi/js'
import ContestWaveForm from '~/components/contests/forms/ContestWaveForm'
import ContestWaveApi from '~/services/oblyk-api/ContestWaveApi'

export default {
  name: 'ContestWaveCard',
  components: { ContestWaveForm },
  props: {
    contest: {
      type: Object,
      required: true
    },
    contestWave: {
      type: Object,
      required: true
    },
    getWaves: {
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

  methods: {
    deleteWave () {
      if (confirm('Ếtes vous sûr de supprimer cette vague ?')) {
        this.loadingAction = true
        new ContestWaveApi(this.$axios, this.$auth)
          .delete(this.contest.gym_id, this.contest.id, this.contestWave.id)
          .then(() => {
            this.getWaves()
          })
          .finally(() => {
            this.loadingAction = false
          })
      }
    },

    editCallback () {
      this.editModal = false
      this.getWaves()
    }
  }
}
</script>
