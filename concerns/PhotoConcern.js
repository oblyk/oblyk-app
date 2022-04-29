import Photo from '@/models/Photo'

export const PhotoConcern = {
  data () {
    return {
      photo: null
    }
  },

  async fetch () {
    this.photo = await new Photo({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.photoId
    )
  }
}
