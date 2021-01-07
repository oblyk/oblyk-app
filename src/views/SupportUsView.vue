<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king mt-5">
        {{ $t('common.pages.supportUs.title') }}
      </h1>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'
export default {
  name: 'SupportUsView',
  components: { AppFooter }
}
</script>
