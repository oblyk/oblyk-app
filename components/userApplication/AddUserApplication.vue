<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        elevation="0"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>
          {{ mdiPuzzlePlus }}
        </v-icon>
        Ajouter une application
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-icon left>
          {{ mdiPuzzlePlus }}
        </v-icon>
        Connecter une application
      </v-card-title>
      <v-card-text>
        <v-sheet class="rounded border" style="width: 180px">
          <div class="pa-2">
            <v-img
              width="180"
              height="100"
              contain
              src="/images/my-compet.png"
              alt="Logo my compet"
            />
          </div>
          <div class="pa-2 border-top">
            <p class="text-center font-weight-bold mb-1">
              FFME My Compet
            </p>
            <p class="mb-0 text--disabled">
              Connectez-vous avec votre licence FFME et participer à la Ligue 2 !
            </p>
          </div>
          <v-btn
            color="primary"
            elevation="0"
            small
            block
            to="/home/settings/applications/new/ffme-my-compet"
          >
            {{ $t('actions.associate') }}
          </v-btn>
        </v-sheet>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPuzzlePlus } from '@mdi/js'

export default {
  name: 'AddUserApplication',

  data () {
    return {
      dialog: false,

      mdiPuzzlePlus
    }
  }
}
</script>
