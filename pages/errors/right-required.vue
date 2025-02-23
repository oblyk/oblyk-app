<template>
  <v-container class="common-page-container">
    <h3 v-if="gymName">
      {{ gymName }}
    </h3>
    <v-sheet
      class="mt-2 pa-4"
      rounded
    >
      <v-row align="center">
        <v-col class="shrink">
          <v-avatar
            color="red lighten-4"
            :size="70"
          >
            <v-icon
              x-large
              color="red darken-2"
            >
              {{ mdiCancel }}
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col class="grow">
          <p
            v-if="role"
            class="ma-0"
          >
            Vous devez avoir le droit <v-chip>{{ $t(`models.roles.${role}`) }}</v-chip> pour accéder à cette ressource.
          </p>
          <p
            v-else
            class="ma-0"
          >
            Vous n'avez pas les droits nécessaire pour accéder à cette ressource.
          </p>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
<script>
import { mdiCancel } from '@mdi/js'

export default {
  data () {
    return {
      role: null,
      gymName: null,
      mdiCancel
    }
  },

  head () {
    return {
      title: 'Droits requis',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.role = urlParams.get('role')
    this.gymName = urlParams.get('gym_name')
  }
}
</script>
