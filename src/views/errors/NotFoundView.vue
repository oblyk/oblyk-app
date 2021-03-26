<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king text-center mt-16 pt-16 mb-16 pb-16">
        {{ $t('components.layout.errors.404.title') }}
      </h1>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'

export default {
  name: 'NotFoundView',
  components: { AppFooter }
}
</script>
