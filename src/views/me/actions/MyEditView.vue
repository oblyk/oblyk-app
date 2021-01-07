<template>
  <div>
    <spinner v-if="loadingUserCurrent" />

    <v-container v-if="!loadingUserCurrent">
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
import { UserCurrentConcern } from '@/concerns/UserCurrentConcern'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'MyEditView',
  components: { Spinner },
  mixins: [UserCurrentConcern]
}
</script>
