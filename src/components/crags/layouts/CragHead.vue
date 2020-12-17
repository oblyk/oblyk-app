<template>
  <div>
    <v-img
      dark
      height="500px"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :src="photoUrl()"
    >
      <div class="crag-header-title">
        <h1 class="font-weight-medium loved-by-king">
          {{ crag.name }}
        </h1>
        <div>
          <span>
            {{ crag.localization.country }}, {{ crag.localization.region }}, {{ crag.localization.city }}
          </span>
        </div>
      </div>
    </v-img>
  </div>
</template>
<script>
export default {
  name: 'CragHead',
  props: {
    crag: Object
  },

  methods: {
    photoUrl: function () {
      if (this.crag.photo.id !== null) {
        return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag.photo.url}`
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.crag-header-title {
  position: absolute;
  width: 100%;
  padding: 0.5em 0.5em 1em 1em;
  bottom: 0;
  h1 {
    font-size: 3rem;
    margin-bottom: -15px;
  }
}
</style>
