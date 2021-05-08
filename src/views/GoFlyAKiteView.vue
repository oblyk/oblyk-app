<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king mt-5">
        {{ $t('common.pages.goFlyAKite.title') }}
      </h1>

      <p>
        {{ $t('common.pages.goFlyAKite.strangeBehavior') }}
      </p>
      <p>
        {{ $t('common.pages.goFlyAKite.actHuman') }}
      </p>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'
export default {
  name: 'GoFlyAKiteView',
  components: { AppFooter }
}
</script>
