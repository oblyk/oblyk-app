import HomeView from '@/views/HomeView'
import TermsOfUseView from '@/views/TermsOfUseView'

export default [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: {
      noPaddingTop: true,
      title: 'home',
      showTitle: false
    }
  },
  {
    path: '/terms-of-use',
    component: TermsOfUseView,
    meta: {
      title: 'termsOfUse',
      showTitle: false
    }
  }
]
