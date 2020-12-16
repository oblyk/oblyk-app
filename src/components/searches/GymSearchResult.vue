<template>
  <div>
    <v-card
      link
      flat
      :to="gymUrl()"
    >
      <v-list-item three-line>
        <v-list-item-avatar
          size="70"
        >
          <v-avatar
            color="grey"
            size="70"
            tile
          >

          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">
            {{ gym.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-alert
              dense
              text
              class="d-inline-block mr-1 mb-0"
            >
              SALLE
            </v-alert>
            {{ gym.localization.country }}, {{ gym.localization.city }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'GymSearchResult',
  props: {
    gym: null
  },

  methods: {
    gymUrl: function () {
      return `/gym/${this.gym.id}/${this.gym.slug_name}/infos`
    },

    gymPhoto: function () {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.gym.logo.url}`
    }
  }
}
</script>
