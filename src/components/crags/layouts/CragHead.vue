<template>
  <div>
    <v-img
      dark
      height="500px"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :src="crag.coverUrl()"
    >
      <div class="crag-header-title">
        <h1 class="font-weight-medium loved-by-king">
          {{ crag.name }}
          <subscribe-btn :subscribe-id="crag.id" subscribe-type="Crag" :incrementable="true" />
        </h1>
        <div>
          <span>
            {{ crag.country }}, {{ crag.region }}, {{ crag.city }}
          </span>
        </div>
      </div>
    </v-img>
  </div>
</template>
<script>
import SubscribeBtn from '@/components/forms/SubscribeBtn'
export default {
  name: 'CragHead',
  components: { SubscribeBtn },
  props: {
    crag: Object
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
