import HomeView from '@/views/HomeView'
import TermsOfUseView from '@/views/TermsOfUseView'

export default [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: {
      title: 'Oblyk'
    }
  },
  {
    path: '/terms-of-use',
    component: TermsOfUseView
  }
]
