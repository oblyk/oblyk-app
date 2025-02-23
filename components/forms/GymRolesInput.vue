<template>
  <v-input>
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-1 px-1">
      <legend class="v-label custom-fieldset-label">
        {{ $t('models.gymAdministrator.roles') }} ?
      </legend>
      <div>
        <div v-if="loadingRoles" class="py-2 px-3">
          <v-progress-linear indeterminate />
        </div>
        <div
          v-else
          class="px-2 pb-2"
        >
          <v-checkbox
            v-for="(role, roleIndex) in rolesList"
            :key="`role-index-${roleIndex}`"
            v-model="roles"
            :label="$t(`models.roles.${role}`)"
            :hint="$t(`models.rolesExplain.${role}`)"
            :value="role"
            persistent-hint
            @change="onChange()"
          />
        </div>
      </div>
    </fieldset>
  </v-input>
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
            this.rolesList.push(role)
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
