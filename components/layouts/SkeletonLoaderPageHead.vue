<template>
  <div>
    <v-sheet class="page-header-sheet border-bottom">
      <div class="page-header-container">
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
        <div class="page-header-sheet-content flex-grow-1">
          <div class="page-header-sheet-title">
            <v-skeleton-loader type="heading" width="150" />
          </div>
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
