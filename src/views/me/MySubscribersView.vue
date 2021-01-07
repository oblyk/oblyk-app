<template>
  <div>
    <spinner v-if="loadingUserCurrent" />

    <v-container v-if="!loadingUserCurrent">
      <v-row>
        <v-col>
          ...
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { UserCurrentConcern } from '@/concerns/UserCurrentConcern'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'MySubscribersView',
  components: { Spinner },
  mixins: [UserCurrentConcern]
}
</script>
