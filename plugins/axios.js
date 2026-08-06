export default function ({ $axios, redirect, $auth }) {
  $axios.onError(async (error) => {
    const code = parseInt(error.response && error.response.status)
    const originalRequest = error.config

    if (code === 401) {
      // If this query has already been run, we stop there
      if (originalRequest._retriedAfterRefresh) {
        await $auth.logout('local')
        window.location.href = '/errors/session-expired'
        return
      }

      if ($auth.loggedIn) {
        originalRequest._retriedAfterRefresh = true

        // Get new token and new refresh token
        await $auth.refreshTokens()

        const newToken = $auth.$storage.getUniversal('_token.local')
        if (newToken) {
          originalRequest.headers.Authorization = newToken
          return $axios.request(originalRequest)
        } else {
          await $auth.logout('local')
          window.location.href = '/errors/session-expired'
          return
        }
      }
      redirect('/sign-in')
    } else if (code === 403 && error.response.data.error === 'broken_refresh_token') {
      await $auth.logout('local')
      window.location.href = '/errors/session-expired'
    } else if (code === 403) {
      if (error.response.data.need) {
        const need = error.response.data.need
        const params = []
        if (need.gym_name) {
          params.push(`gym_name=${need.gym_name}`)
        }
        if (need.role) {
          params.push(`role=${need.role}`)
        }
        window.location.href = `/errors/right-required?${params.join('&')}`
      } else {
        window.location.href = '/errors/right-required'
      }
    } else {
      return Promise.reject(error)
    }
  })
}
