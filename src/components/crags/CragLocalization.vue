<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        mdi-compass
      </v-icon>
      {{ $t('components.crag.localization') }}
    </v-card-title>
    <v-card-text>
      <v-list dense>

        <!-- City, region, etc. -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-map</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ crag.city }}, {{ crag.region }}, {{ crag.country }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Latitude / Longitude -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-map-marker</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ crag.latitude }}, {{ crag.longitude }}
              <qr-code-btn :value="`${crag.latitude}, ${crag.longitude}`" />
              <v-btn
                icon
                small
              >
                <v-icon small>mdi-content-copy</v-icon>
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Latitude / Longitude -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-compass</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ crag.orientations().map((climb) => { return $t(`models.crag.${climb}`) }).join(', ') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
import QrCodeBtn from '@/components/forms/QrCodeBtn'
export default {
  name: 'CragLocalization',
  components: { QrCodeBtn },
  props: {
    crag: Object
  }
}
</script>
