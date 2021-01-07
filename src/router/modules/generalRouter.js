import HomeView from '@/views/HomeView'
import TermsOfUseView from '@/views/TermsOfUseView'
import AboutView from '@/views/AboutView'
import NewsView from '@/views/NewsView'
import HelpsView from '@/views/HelpsView'
import SupportUsView from '@/views/SupportUsView'
import ContactView from '@/views/ContactView'
import ReportProblemView from '@/views/ReportProblemView'
import OblykView from '@/views/OblykView'

export default [
  {
    path: '/',
    component: HomeView,
    meta: {
      noPaddingTop: true,
      title: 'home',
      showTitle: false
    }
  },
  {
    path: '/oblyk',
    component: OblykView,
    meta: {
      noPaddingTop: true,
      title: 'oblyk',
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
  },
  {
    path: '/about',
    component: AboutView,
    meta: {
      title: 'about',
      showTitle: false
    }
  },
  {
    path: '/news',
    component: NewsView,
    meta: {
      title: 'news',
      showTitle: false
    }
  },
  {
    path: '/helps',
    component: HelpsView,
    meta: {
      title: 'helps',
      showTitle: false
    }
  },
  {
    path: '/support-us',
    component: SupportUsView,
    meta: {
      title: 'supportUs',
      showTitle: false
    }
  },
  {
    path: '/contact',
    component: ContactView,
    meta: {
      title: 'contact',
      showTitle: false
    }
  },
  {
    path: '/report-problem',
    component: ReportProblemView,
    meta: {
      title: 'reportProblem',
      showTitle: false
    }
  }
]
