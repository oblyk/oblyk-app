<template>
  <div>
    <p v-if="loadingNewsletterSubscribe" class="grey--text">
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
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import NewsletterApi from '~/services/oblyk-api/NewsletterApi'

export default {
  name: 'NewsletterSubscribeSwitchForm',
  props: {
    user: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      loadingNewsletterSubscribe: true,
      subscribeToNewsletter: null
    }
  },

  watch: {
    subscribeToNewsletter () {
      if (this.loadingNewsletterSubscribe === false) {
        this.changeParameter()
      }
    }
  },

  mounted () {
    this.getSubscribeToNewsletter()
  },

  methods: {
    getSubscribeToNewsletter () {
      new CurrentUserApi(this.$axios, this.$auth)
        .subscribeToNewsletter()
        .then((resp) => {
          this.subscribeToNewsletter = resp.data
        })
        .finally(() => {
          this.loadingNewsletterSubscribe = false
        })
    },

    changeParameter () {
      if (this.subscribeToNewsletter === false) {
        this.unsubscribe()
      } else {
        this.subscribe()
      }
    },

    unsubscribe () {
      new NewsletterApi(this.$axios, this.$auth)
        .unsubscribe({ email: this.user.email })
        .then(() => {
          this.$root.$emit('alertSimpleSuccess', this.$t('components.user.youAreUnsubscribedToTheNewsletter'))
        })
    },

    subscribe () {
      new NewsletterApi(this.$axios, this.$auth)
        .subscribe({ email: this.user.email })
        .then(() => {
          this.$root.$emit('alertSimpleSuccess', this.$t('components.user.youAreSubscribedToTheNewsletter'))
        })
    }
  }
}
</script>
