<template>
  <div>
    <v-img
      dark
      height="500px"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :src="gym.bannerUrl()"
    >
      <div class="gym-header-title">
        <v-avatar
          size="80"
          class="float-left mr-3"
        >
          <img
            :src="gym.logoUrl()"
            :alt="`logo ${gym.name}`"
          >
        </v-avatar>
        <h1 class="font-weight-medium">
          {{ gym.name }}
        </h1>
        <span>
          {{ gym.country }}, {{ gym.city }}
        </span>
      </div>
    </v-img>
  </div>
</template>
<script>
export default {
  name: 'GymHead',
  props: {
    gym: Object
  }
}
</script>
<style lang="scss" scoped>
.gym-header-title {
  position: absolute;
  width: 100%;
  padding: 0.5em 0.5em 1em 1em;
  bottom: 0;
  h1 {
    margin-bottom: -5px;
    .v-avatar {
      vertical-align: middle;
    }
  }
}
</style>
