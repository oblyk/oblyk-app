<template>
  <v-card class="user-contribution full-height">
    <v-card-title>
      <v-icon left>
        mdi-book-plus-multiple
      </v-icon>
      {{ $t('components.user.oblykContribution') }}
    </v-card-title>
    <v-card-text>
      <p
        class="text-center text--disabled mt-5 mb-5"
        v-if="sumContribution() === 0"
      >
        {{ $t('components.user.emptyContribution', { name: user.first_name }) }}
      </p>
      <v-row v-else>
        <!-- Crags -->
        <v-col
          class="col-4 col-lg-3 figures"
          v-if="contribution.crags_count !== 0"
        >
          {{ contribution.crags_count }} <br>
          <span class="loved-by-king">
            {{ $t('components.user.contribution.crags') }}
          </span>
        </v-col>

        <!-- Gyms -->
        <v-col
          class="col-4 col-lg-3 figures"
          v-if="contribution.gyms_count !== 0"
        >
          {{ contribution.gyms_count }} <br>
          <span class="loved-by-king">
            {{ $t('components.user.contribution.gyms') }}
          </span>
        </v-col>

        <!-- Routes -->
        <v-col
          class="col-4 col-lg-3 figures"
          v-if="contribution.routes_count !== 0"
        >
          {{ contribution.routes_count }} <br>
          <span class="loved-by-king">
            {{ $t('components.user.contribution.routes') }}
          </span>
        </v-col>

        <!-- Photos -->
        <v-col
          class="col-4 col-lg-3 figures"
          v-if="contribution.photos_count !== 0"
        >
          {{ contribution.photos_count }} <br>
          <span class="loved-by-king">
            {{ $t('components.user.contribution.photos') }}
          </span>
        </v-col>

        <!-- Videos -->
        <v-col
          class="col-4 col-lg-3 figures"
          v-if="contribution.videos_count !== 0"
        >
          {{ contribution.videos_count }} <br>
          <span class="loved-by-king">
            {{ $t('components.user.contribution.videos') }}
          </span>
        </v-col>

        <!-- Guide books -->
        <v-col
          class="col-4 col-lg-3 figures"
          v-if="contribution.guides_count !== 0"
        >
          {{ contribution.guides_count }} <br>
          <span class="loved-by-king">
            {{ $t('components.user.contribution.guides') }}
          </span>
        </v-col>

        <!-- Comments -->
        <v-col
          class="col-4 col-lg-3 figures"
          v-if="contribution.comments_count !== 0"
        >
          {{ contribution.comments_count }} <br>
          <span class="loved-by-king">
            {{ $t('components.user.contribution.comments') }}
          </span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'UserContribution',
  props: {
    user: Object,
    contribution: Object
  },

  methods: {
    sumContribution: function () {
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
