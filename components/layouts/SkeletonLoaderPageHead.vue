<template>
  <div>
    <v-sheet class="page-header-sheet">
      <div class="page-header-sheet-back-btn">
        <v-btn
          exact-path
          icon
          large
          @click="back"
        >
          <v-icon>
            {{ mdiArrowLeft }}
          </v-icon>
        </v-btn>
      </div>
      <div class="page-header-sheet-content mb-4">
        <div class="page-header-sheet-title pt-4">
          <v-skeleton-loader type="heading" width="150" />
        </div>
      </div>
    </v-sheet>
    <v-container>
      <v-skeleton-loader type="article" />
    </v-container>
  </div>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'
export default {
  name: 'SkeletonLoaderPageHead',

  data () {
    return {
      mdiArrowLeft
    }
  },

  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
