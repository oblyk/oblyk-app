<template>
  <div>
    <spinner v-if="loadingMeUser" />

    <div v-if="!loadingMeUser">
      <user-tabs :user="meUser" />
      <v-container>
        <v-row>
          <v-col>
            ...
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import { MeUserConcern } from '@/concerns/MeUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserTabs from '@/components/users/layouts/UserTabs'

export default {
  name: 'MyAscentsView',
  components: { UserTabs, Spinner },
  mixins: [MeUserConcern]
}
</script>
