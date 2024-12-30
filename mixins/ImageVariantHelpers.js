export const ImageVariantHelpers = {
  methods: {
    /**
     * @desc Create the path to an image variant for given options
     * @param {object} attachment
     * @param {{fit: string, width: number, height: number, quality: number}} options
     * @return string
     */
    imageVariant (attachment, options) {
      // if we don't have an attachment, we'll replace it with a default image, depending on the type of attachement
      if (attachment.attached === false) {
        const defaultImage = {
          GymChain_banner: '/images/gym-default-banner.jpg',
          GymChain_logo: '/svg/gym-default-logo.svg',
          Article_cover: '/images/default-crag-banner.jpg',
          Author_cover: '/images/default-crag-banner.jpg',
          User_banner: '/images/user-default-banner.jpg',
          User_avatar: '/svg/user-default-avatar.svg',
          Area_banner: '/images/default-crag-banner.jpg',
          Championship_banner: '/images/gym-default-banner.jpg',
          Contest_banner: '/images/gym-default-banner.jpg',
          GuideBookPaper_cover: '/svg/paper-guide-book-default.svg',
          Gym_logo: '/svg/gym-default-logo.svg',
          Gym_banner: '/images/gym-default-banner.jpg'
        }
        return defaultImage[attachment.attachment_type]
      }

      // create path for image variant with variant options
      const variants = ['onerror=redirect']
      for (const option in options) {
        variants.push([option, options[option]].join('='))
      }
      return attachment.variant_path.replace(':variant', variants.join(','))
    }
  }
}
