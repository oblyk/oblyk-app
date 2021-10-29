<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king mt-5 text-center">
        {{ $t('common.pages.successAccountDeleting.title') }}
      </h1>

      <p class="text-center mt-10">
        {{ $t('common.pages.successAccountDeleting.description') }}<br>
        <strong>
          {{ $t('common.pages.successAccountDeleting.goodContinuation') }}
        </strong>
      </p>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'SuccessAccountDeletingView',
  components: { AppFooter },

  metaInfo () {
    return {
      title: this.$t('meta.successAccountDeleting.title')
    }
  }
}
</script>
