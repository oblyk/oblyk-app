<template>
  <v-select
    v-model="roles"
    :items="rolesList"
    item-text="text"
    item-value="value"
    chips
    clearable
    :label="$t('components.input.gymRoles')"
    multiple
    outlined
    :loadin="loadingRoles"
    @change="onChange()"
  />
</template>

<script>
import GymRoleApi from '~/services/oblyk-api/GymRoleApi'

export default {
  name: 'GymRolesInput',
  props: {
    value: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
      loadingRoles: true,
      rolesList: [],
      roles: this.value
    }
  },

  mounted () {
    this.getGymRoles()
  },

  methods: {
    getGymRoles () {
      this.loadingRoles = true
      this.rolesList = []
      new GymRoleApi(this.$axios, this.$auth)
        .list()
        .then((resp) => {
          for (const role of resp.data) {
            this.rolesList.push(
              {
                text: this.$t(`models.roles.${role}`),
                value: role
              }
            )
          }
        })
        .finally(() => {
          this.loadingRoles = false
        })
    },

    onChange () {
      this.$emit('input', this.roles)
    }
  }
}
</script>
