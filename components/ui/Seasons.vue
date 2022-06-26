<template>
  <div
    class="d-inline"
    :title="title"
  >
    <!-- spring -->
    <v-icon
      v-if="seasons.includes('spring')"
      color="#8bc34a"
    >
      {{ mdiLeaf }}
    </v-icon>
    <v-icon v-if="!seasons.includes('spring')">
      {{ mdiLeafOff }}
    </v-icon>

    <!-- Summer -->
    <v-icon
      v-if="seasons.includes('summer')"
      color="#fdd835"
    >
      {{ mdiWeatherSunny }}
    </v-icon>
    <v-icon v-if="!seasons.includes('summer')">
      {{ mdiWeatherSunnyOff }}
    </v-icon>

    <!-- Autumn -->
    <v-icon
      v-if="seasons.includes('autumn')"
      color="#b71c1c"
    >
      {{ mdiLeafMaple }}
    </v-icon>
    <v-icon v-if="!seasons.includes('autumn')">
      {{ mdiLeafMapleOff }}
    </v-icon>

    <!-- Winter -->
    <v-icon
      v-if="seasons.includes('winter')"
      color="#90caf9"
    >
      {{ mdiSnowflake }}
    </v-icon>
    <v-icon v-if="!seasons.includes('winter')">
      {{ mdiSnowflakeOff }}
    </v-icon>
  </div>
</template>

<script>
import {
  mdiWeatherSunny,
  mdiWeatherSunnyOff,
  mdiLeafMaple,
  mdiLeafMapleOff,
  mdiLeaf,
  mdiLeafOff,
  mdiSnowflake,
  mdiSnowflakeOff
} from '@mdi/js'

export default {
  name: 'Seasons',

  props: {
    seasons: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      mdiWeatherSunny,
      mdiWeatherSunnyOff,

      mdiLeafMaple,
      mdiLeafMapleOff,

      mdiLeaf,
      mdiLeafOff,

      mdiSnowflake,
      mdiSnowflakeOff
    }
  },

  computed: {
    title () {
      const titles = []
      for (const season of this.seasons) {
        titles.push(this.$t(`models.crag.${season}`))
      }
      return titles.join(', ')
    }
  }
}
</script>
