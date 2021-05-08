const HomeView = () => import(/* webpackChunkName: "general-routes" */ '@/views/HomeView')
const TermsOfUseView = () => import(/* webpackChunkName: "general-routes" */ '@/views/TermsOfUseView')
const AboutView = () => import(/* webpackChunkName: "general-routes" */ '@/views/AboutView')
const HelpsView = () => import(/* webpackChunkName: "general-routes" */ '@/views/HelpsView')
const SupportUsView = () => import(/* webpackChunkName: "general-routes" */ '@/views/SupportUsView')
const ContactView = () => import(/* webpackChunkName: "general-routes" */ '@/views/ContactView')
const ReportProblemView = () => import(/* webpackChunkName: "general-routes" */ '@/views/ReportProblemView')
const OblykView = () => import(/* webpackChunkName: "general-routes" */ '@/views/OblykView')
const GradeView = () => import(/* webpackChunkName: "general-routes" */ '@/views/GradeView')
const AboutPartnerView = () => import(/* webpackChunkName: "general-routes" */ '@/views/AboutPartnerView')

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
    path: '/about/partner-search',
    component: AboutPartnerView,
    meta: {
      title: 'aboutPartner',
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
  },
  {
    path: '/grades',
    component: GradeView,
    meta: {
      title: 'grade',
      showTitle: false
    }
  }
]
