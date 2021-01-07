<template>
  <div>
    <spinner v-if="loadingMeUser" />

    <v-container v-if="!loadingMeUser">
      <v-row>
        <v-col>
          ...
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { MeUserConcern } from '@/concerns/MeUserConcern'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'MyGuideBooksView',
  components: { Spinner },
  mixins: [MeUserConcern]
}
</script>
