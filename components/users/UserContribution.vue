<template>
  <v-card class="user-contribution full-height">
    <v-card-title>
      <v-icon left>
        {{ mdiBookPlusMultiple }}
      </v-icon>
      {{ $t('components.user.oblykContribution') }}
    </v-card-title>
    <v-card-text>
      <p
        v-if="sumContribution() === 0"
        class="text-center text--disabled mt-5 mb-5"
      >
        {{ $t('components.user.emptyContribution', { name: user.first_name }) }}
      </p>
      <v-row v-else>
        <!-- Crags -->
        <v-col
          v-if="contribution.crags_count !== 0"
          class="col-4 col-lg-3 figures"
        >
          {{ contribution.crags_count }} <br>
          <span>
            {{ $t('components.user.contribution.crags') }}
          </span>
        </v-col>

        <!-- Gyms -->
        <v-col
          v-if="contribution.gyms_count !== 0"
          class="col-4 col-lg-3 figures"
        >
          {{ contribution.gyms_count }} <br>
          <span>
            {{ $t('components.user.contribution.gyms') }}
          </span>
        </v-col>

        <!-- Routes -->
        <v-col
          v-if="contribution.routes_count !== 0"
          class="col-4 col-lg-3 figures"
        >
          {{ contribution.routes_count }} <br>
          <span>
            {{ $t('components.user.contribution.routes') }}
          </span>
        </v-col>

        <!-- Photos -->
        <v-col
          v-if="contribution.photos_count !== 0"
          class="col-4 col-lg-3 figures"
        >
          {{ contribution.photos_count }} <br>
          <span>
            {{ $t('components.user.contribution.photos') }}
          </span>
        </v-col>

        <!-- Videos -->
        <v-col
          v-if="contribution.videos_count !== 0"
          class="col-4 col-lg-3 figures"
        >
          {{ contribution.videos_count }} <br>
          <span>
            {{ $t('components.user.contribution.videos') }}
          </span>
        </v-col>

        <!-- Guide books -->
        <v-col
          v-if="contribution.guides_count !== 0"
          class="col-4 col-lg-3 figures"
        >
          {{ contribution.guides_count }} <br>
          <span>
            {{ $t('components.user.contribution.guides') }}
          </span>
        </v-col>

        <!-- Comments -->
        <v-col
          v-if="contribution.comments_count !== 0"
          class="col-4 col-lg-3 figures"
        >
          {{ contribution.comments_count }} <br>
          <span>
            {{ $t('components.user.contribution.comments') }}
          </span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiBookPlusMultiple } from '@mdi/js'

export default {
  name: 'UserContribution',
  props: {
    user: Object,
    contribution: Object
  },

  data () {
    return {
      mdiBookPlusMultiple
    }
  },

  methods: {
    sumContribution () {
      let sum = 0
      sum += this.contribution.crags_count
      sum += this.contribution.gyms_count
      sum += this.contribution.routes_count
      sum += this.contribution.photos_count
      sum += this.contribution.videos_count
      sum += this.contribution.guides_count
      sum += this.contribution.comments_count
      return sum
    }
  }
}
</script>

<style lang="scss" scoped>
.user-contribution {
  .figures {
    text-align: center;
    font-size: 1.3em
  }
}
</style>
