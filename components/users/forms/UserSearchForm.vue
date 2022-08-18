<template>
  <div>
    <v-text-field
      ref="UserSearchForm"
      v-model="query"
      :label="$t('components.user.searchUser')"
      outlined
      :loading="searching"
      clearable
      hide-details
      @keyup="search()"
      @click:clear="onSearch = false"
      @focus="scrollToElement"
    />
    <slot />
    <div
      v-for="user in searchResults"
      :key="user.id"
    >
      <div @click="callback ? callback(user) : null">
        <user-small-card
          :small="true"
          :subscribable="false"
          :user="user"
          :linkable="linkableResult"
          class="mt-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UserApi from '~/services/oblyk-api/UserApi'
import User from '@/models/User'
import UserSmallCard from '@/components/users/UserSmallCard'

export default {
  name: 'UserSearchForm',
  components: { UserSmallCard },
  props: {
    value: {
      type: String,
      default: null
    },
    linkableResult: {
      type: Boolean,
      required: false,
      default: true
    },
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      searchResults: [],
      previousQuery: null,
      userApi: null
    }
  },

  watch: {
    value () {
      this.query = this.value
    }
  },

  methods: {
    search () {
      if (this.previousQuery === this.query) {
        this.searching = false
        return
      }

      this.onSearch = true
      this.searching = true

      if (this.searchTimeOut) {
        clearTimeout(this.searchTimeOut)
        this.searchTimeOut = null
      }
      this.searchTimeOut = setTimeout(() => {
        this.apiSearch()
      }, 500)
    },

    apiSearch () {
      this.userApi = this.userApi || new UserApi(this.$axios, this.$auth)

      this.userApi.cancelSearch()
      this.userApi
        .search(this.query)
        .then((resp) => {
          this.searchResults = []
          for (const user of resp.data) {
            this.searchResults.push(new User({ attributes: user }))
          }
          this.previousQuery = this.query
        })
        .catch((err) => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'user')
          }
        })
        .finally(() => {
          this.searching = false
        })
    },

    scrollToElement () {
      if (window.innerWidth < 600) {
        const element = this.$refs.UserSearchForm.$el
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>
