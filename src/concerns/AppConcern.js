export const AppConcern = {
  data () {
    return {
      baseUrl: `${process.env.VUE_APP_OBLYK_API_URL}/api/v1`,
      apiAccessToken: process.env.VUE_APP_OBLYK_API_ACCESS_TOKEN
    }
  }
}
