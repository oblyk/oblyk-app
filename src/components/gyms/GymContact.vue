<template>
  <v-card>
    <v-card-title>
      Contact & Localisation
    </v-card-title>
    <v-card-text>
      <v-list dense>
        <v-list-item-group>
          <v-list-item to="/maps/gyms">
            <v-list-item-icon>
              <v-icon>mdi-map</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ gym.country }}, {{ gym.city }}
                <v-btn small class="ml-2">
                  Voir sur la carte
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ gym.phone_number || 'non renseigne'  }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-web</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ gym.web_site || 'non renseigne'  }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-email</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ gym.email || 'non renseigne'  }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'GymContact',
  props: {
    gym: Object
  }
}
</script>
