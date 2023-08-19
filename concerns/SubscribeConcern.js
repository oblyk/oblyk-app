export const SubscribeConcern = {
  methods: {
    iAmSubscribedToThis (type, id) {
      let IAmSubscribed = 'unsubscribe'
      const subscribes = this.$auth.loggedIn ? this.$auth.user.subscribes : []
      for (const subscribe of subscribes) {
        if (subscribe.followable_type === type && subscribe.followable_id === id) {
          IAmSubscribed = subscribe.accepted ? 'subscribe' : 'subscribeRequestMade'
        }
      }
      return IAmSubscribed
    }
  }
}
