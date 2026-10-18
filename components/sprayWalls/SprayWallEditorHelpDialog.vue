<template>
  <v-dialog
    v-model="helpDialog"
    max-width="500"
  >
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon color="primary" left>
          {{ oblykSprayWall }}
        </v-icon>
        Spray Wall Studio
        <v-btn class="ml-auto" icon @click="helpDialog = false">
          <v-icon color="primary">
            {{ mdiClose }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <div class="px-6">
        <p>
          Le <strong>Spray Wall Studio</strong> vous permet de détourer les prises de votre mur pour que vos grimpeurs et grimpeuses n'aient pas à le faire !
        </p>
        <p class="font-weight-medium mb-1 border-bottom">
          <v-icon color="primary" left>
            {{ mdiKeyboardVariant }}
          </v-icon>
          Raccourcis clavier
        </p>
        <v-simple-table dense class="mb-6">
          <tbody>
            <tr>
              <td class="smallest-table-column px-0">
                <v-chip small class="rounded-sm">
                  p
                </v-chip>
              </td>
              <td class="pl-2">
                Ajouter une prise
                <cite>(rappuyer sur "p" pour enregistrer et commencer une nouvelle prise)</cite>
              </td>
            </tr>
            <tr>
              <td class="smallest-table-column px-0">
                <v-chip small class="rounded-sm">
                  e
                </v-chip>
              </td>
              <td class="pl-2">
                Éditer la prise sélectionnée
              </td>
            </tr>
            <tr>
              <td class="smallest-table-column px-0">
                <v-chip small class="rounded-sm">
                  supr
                </v-chip>
              </td>
              <td class="pl-2">
                Supprimer la prise sélectionnée
              </td>
            </tr>
            <tr>
              <td class="smallest-table-column px-0">
                <v-chip small class="rounded-sm">
                  esc
                </v-chip>
              </td>
              <td class="pl-2">
                Annuler l'ajout ou l'édition
              </td>
            </tr>
            <tr>
              <td class="smallest-table-column px-0">
                <v-chip small class="rounded-sm">
                  Entrer
                </v-chip>
              </td>
              <td class="pl-2">
                Enregister la nouvelle prise, ou sauvegarder la prise en cours d'édition
              </td>
            </tr>
          </tbody>
        </v-simple-table>

        <div class="mb-6">
          <p class="font-weight-medium mb-1 border-bottom">
            <v-icon size="20" left color="primary">
              {{ mdiOrderNumericAscending }}
            </v-icon>
            Dans quel ordre procéder ?
          </p>
          <ol class="mb-3">
            <li>Lancez la détéction des prises <v-icon>{{ mdiCreation }}</v-icon></li>
            <li>Corrigez ou supprimez les prises mal détectées</li>
            <li>Ajoutez les prises vissées sur le mur et les volumes (ou vissées sur d'autres prises)</li>
            <li>Vérifiez que vous n'en avait pas oublié avec le bouton <v-icon>{{ mdiCircleOpacity }}</v-icon></li>
            <li>Finissez pas les volumes</li>
          </ol>
        </div>

        <div class="mb-6">
          <p class="font-weight-medium mb-1 border-bottom">
            <v-icon size="20" left color="primary">
              {{ mdiVectorSquare }}
            </v-icon>
            Combien de point pour une prise ?
          </p>
          <p>
            Restez simple ! Quelques points autour d'une prise suffisent.
          </p>
          <v-row>
            <v-col cols="6" class="text-center">
              <v-img
                src="/images/spray_wall_too_many_points.png"
                class="rounded-sm"
                contain
              />
              <p class="red--text font-weight-medium mb-0 mt-2">
                <v-icon size="20" color="red" left>
                  {{ mdiThumbDown }}
                </v-icon>
                Trop points
              </p>
            </v-col>
            <v-col cols="6" class="text-center">
              <v-img
                src="/images/spray_wall_enough_points.png"
                class="rounded-sm"
                contain
              />
              <p class="green--text font-weight-medium mb-0 mt-2">
                <v-icon size="20" color="green" left>
                  {{ mdiThumbUp }}
                </v-icon>
                Suffisamment de points
              </p>
            </v-col>
          </v-row>
        </div>

        <div class="mb-6">
          <p class="font-weight-medium mb-1 border-bottom">
            <v-icon size="20" left color="primary">
              {{ mdiAccountGroup }}
            </v-icon>
            Détourer votre mur à plusieurs
          </p>
          <p>
            Sur le <strong>Spray Wall Studio</strong> : les ajouts, suppressions et éditions sont synchronisées en temps réel !
          </p>
        </div>
      </div>
      <v-card-actions class="justify-center">
        <v-btn
          text
          outlined
          color="deep-purple accent-4"
          @click="helpDialog = false"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mdiClose,
  mdiKeyboardVariant,
  mdiThumbUp,
  mdiThumbDown,
  mdiAccountGroup,
  mdiCircleOpacity,
  mdiVectorSquare,
  mdiOrderNumericAscending,
  mdiCreation
} from '@mdi/js'
import { oblykSprayWall } from '~/assets/oblyk-icons'

export default {
  name: 'SprayWallEditorHelpDialog',
  props: {
    sprayWall: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      helpDialog: false,

      mdiClose,
      oblykSprayWall,
      mdiKeyboardVariant,
      mdiThumbUp,
      mdiAccountGroup,
      mdiThumbDown,
      mdiCircleOpacity,
      mdiVectorSquare,
      mdiOrderNumericAscending,
      mdiCreation
    }
  },

  methods: {
    toggleHelpDialog (force = null) {
      this.helpDialog = force || !this.helpDialog
    }
  }
}
</script>
