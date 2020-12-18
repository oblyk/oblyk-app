<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon>mdi-translate</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        <v-select
          v-model="lang"
          :items="languages"
          item-text="text"
          item-value="value"
          dense
          :hide-details="true"
          @change="changeLocale()"
        ></v-select>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  name: 'LocalSelector',

  data () {
    return {
      lang: this.$vuetify.lang.current,
      languages: [
        {
          value: 'fr',
          text: 'Français'
        },
        {
          value: 'en',
          text: 'English'
        }
      ]
    }
  },

  methods: {
    changeLocale () {
      this.$vuetify.lang.current = this.lang
      this.$i18n.locale = this.lang
      localStorage.setItem('lang', this.lang)
    }
  }
}
</script>
