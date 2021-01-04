<template>
  <v-list-item link>
    <v-list-item-action>
      <v-checkbox
        v-model="dark"
      ></v-checkbox>
    </v-list-item-action>

    <v-list-item-content @click="dark = !dark">
      <v-list-item-title>
        {{ $t('components.layout.appBar.darkTheme') }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  name: 'DarkThemeSelector',

  data () {
    return {
      dark: false
    }
  },

  watch: {
    dark: function () {
      this.$vuetify.theme.dark = this.dark
      localStorage.setItem('darkThem', this.dark)
    }
  },

  created () {
    this.dark = (localStorage.getItem('darkThem') === 'true')
  }
}
</script>
