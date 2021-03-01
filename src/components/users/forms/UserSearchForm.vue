<template>
  <div>
    <v-text-field
      :label="$t('components.user.searchUser')"
      outlined
      :loading="searching"
      clearable
      hide-details
      @keyup="search()"
      @click:clear="onSearch = false"
      v-model="query"
    />
    <slot></slot>
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
import UserApi from '@/services/oblyk-api/UserApi'
import User from '@/models/User'
import UserSmallCard from '@/components/users/UserSmallCard'

export default {
  name: 'UserSearchForm',
  components: { UserSmallCard },
  props: {
    value: String,
    linkableResult: {
      type: Boolean,
      required: false,
      default: true
    },

    callback: {
      type: Function,
      required: false
    }
  },

  data () {
    return {
      query: null,
      searching: false,
      onSearch: false,
      searchResults: [],
      previousQuery: null
    }
  },

  watch: {
    value: function () {
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
      // Cancel old search
      UserApi.cancelSearch()

      UserApi
        .search(this.query)
        .then(resp => {
          this.searchResults = []
          for (const user of resp.data) {
            this.searchResults.push(new User(user))
          }
          this.previousQuery = this.query
        })
        .catch(err => {
          if (err.response !== undefined) {
            this.$root.$emit('alertFromApiError', err, 'user')
          }
        })
        .finally(() => {
          this.searching = false
        })
    }
  }
}
</script>
