<template>
  <v-sheet class="rounded">
    <v-list-item>
      <v-list-item-avatar>
        <v-img
          contain
          src="/images/my-compet.png"
          alt="Logo my compet"
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          FFME MyCompet
        </v-list-item-title>
        <v-list-item-subtitle class="d-block text-wrap">
          <p class="mb-0">
            {{ $t('models.userApplication.ffmeMyCompet.ffme_licence_number') }} : {{ application.ffme_licence_number }}
          </p>
          <p
            v-if="application.status"
            class="mb-0"
          >
            <v-icon
              small
              class="vertical-align-text-bottom"
              :color="statusIcon[application.status].color"
            >
              {{ statusIcon[application.status].icon }}
            </v-icon>
            {{ $t('models.userApplication.status') }} :
            {{ $t(`models.userApplication.ffmeMyCompet.status.${application.status}`) }}
          </p>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-menu>
          <template #activator="{ on, attrs }">
            <v-btn
              class="vertical-align-sub"
              left
              small
              icon
              :loading="loading"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                {{ mdiDotsVertical }}
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="deleteApplication()">
              <v-list-item-icon>
                <v-icon>
                  {{ mdiTrashCan }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="red--text">
                  Supprimer l'association
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item-action>
    </v-list-item>
  </v-sheet>
</template>

<script>
import {
  mdiDotsVertical,
  mdiTrashCan,
  mdiCheckCircleOutline,
  mdiTimerSand,
  mdiAlertOctagon
} from '@mdi/js'
import UserApplicationApi from '~/services/oblyk-api/UserApplicationApi'
export default {
  name: 'ApplicationMyCompet',
  props: {
    application: {
      type: Object,
      required: true
    },
    getApplicationCallback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      loading: false,
      statusIcon: {
        OK: { icon: mdiCheckCircleOutline, color: 'green' },
        ATTENTE_LICENCE: { icon: mdiTimerSand, color: 'amber' },
        ATTENTE_LICENCE2: { icon: mdiTimerSand, color: 'amber' },
        ATTENTE_CONFIRMATION: { icon: mdiTimerSand, color: 'amber' },
        CONFLIT: { icon: mdiAlertOctagon, color: 'red' },
        BLACKLIST: { icon: mdiAlertOctagon, color: 'red' }
      },

      mdiDotsVertical,
      mdiTrashCan
    }
  },

  methods: {
    deleteApplication () {
      if (confirm('Êtes-vous sûr de supprimer cette association ?')) {
        this.loading = false
        new UserApplicationApi(this.$axios, this.$auth)
          .delete(this.application.id)
          .then(() => {
            this.getApplicationCallback()
          })
      }
    }
  }
}
</script>
