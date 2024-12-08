<template>
  <v-icon
    small
    left
    :color="genderColors[gender]"
  >
    {{ genderIcons[gender] }}
  </v-icon>
</template>
<script>
import { mdiGenderFemale, mdiGenderMale, mdiGenderMaleFemale } from '@mdi/js'

export default {
  name: 'GenderIcon',

  props: {
    gender: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      genderColors: {
        unisex: '#9c27b0',
        male: '#4caf50',
        female: '#ff5722'
      },
      genderIcons: {
        unisex: mdiGenderMaleFemale,
        male: mdiGenderMale,
        female: mdiGenderFemale
      }
    }
  }
}
</script>
