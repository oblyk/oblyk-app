<template>
  <div>
    <spinner v-if="loadingMeUser" />

    <v-container v-if="!loadingMeUser">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.mySettings') }}
          </h2>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { MeUserConcern } from '@/concerns/MeUserConcern'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'MyEditView',
  components: { Spinner },
  mixins: [MeUserConcern]
}
</script>
