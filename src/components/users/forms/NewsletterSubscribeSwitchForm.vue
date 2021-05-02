<template>
  <div>
    <p class="grey--text" v-if="loadingNewsletterSubscribe">
      {{ $t('components.user.recoveryNewsletterSettings') }}
    </p>
    <v-switch
      v-if="!loadingNewsletterSubscribe"
      v-model="subscribeToNewsletter"
      :label="$t('components.user.receiveNewsletter')"
    />
  </div>
</template>

<script>
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import NewsletterApi from '@/services/oblyk-api/NewsletterApi'

export default {
  name: 'NewsletterSubscribeSwitchForm',
  props: {
    user: Object
  },

  data () {
    return {
      loadingNewsletterSubscribe: true,
      subscribeToNewsletter: null
    }
  },

  mounted () {
    this.getSubscribeToNewsletter()
  },

  watch: {
    subscribeToNewsletter: function () {
      if (this.loadingNewsletterSubscribe === false) {
        this.changeParameter()
      }
    }
  },

  methods: {
    getSubscribeToNewsletter: function () {
      CurrentUserApi
        .subscribeToNewsletter()
        .then(resp => {
          this.subscribeToNewsletter = resp.data
        })
        .finally(() => {
          this.loadingNewsletterSubscribe = false
        })
    },

    changeParameter: function () {
      if (this.subscribeToNewsletter === false) {
        this.unsubscribe()
      } else {
        this.subscribe()
      }
    },

    unsubscribe: function () {
      NewsletterApi
        .unsubscribe({ email: this.user.email })
        .then(() => {
          this.$root.$emit('alertSimpleSuccess', this.$t('components.user.youAreUnsubscribedToTheNewsletter'))
        })
    },

    subscribe: function () {
      NewsletterApi
        .subscribe({ email: this.user.email })
        .then(() => {
          this.$root.$emit('alertSimpleSuccess', this.$t('components.user.youAreSubscribedToTheNewsletter'))
        })
    }
  }
}
</script>
