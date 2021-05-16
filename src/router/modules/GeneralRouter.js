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
const GoFlyAKiteView = () => import(/* webpackChunkName: "general-routes" */ '@/views/GoFlyAKiteView')
const SuccessAccountDeletingView = () => import(/* webpackChunkName: "general-routes" */ '@/views/SuccessAccountDeletingView')

export default [
  {
    path: '/',
    component: HomeView,
    meta: {
      noPaddingTop: true
    }
  },
  {
    path: '/oblyk',
    component: OblykView,
    meta: {
      noPaddingTop: true
    }
  },
  {
    path: '/terms-of-use',
    component: TermsOfUseView
  },
  {
    path: '/about',
    component: AboutView
  },
  {
    path: '/about/partner-search',
    component: AboutPartnerView
  },
  {
    path: '/helps',
    component: HelpsView
  },
  {
    path: '/support-us',
    component: SupportUsView
  },
  {
    path: '/contact',
    component: ContactView
  },
  {
    path: '/report-problem',
    component: ReportProblemView
  },
  {
    path: '/grades',
    component: GradeView
  },
  {
    path: '/go-fly-a-kite',
    component: GoFlyAKiteView
  },
  {
    path: '/success-account-deleting',
    component: SuccessAccountDeletingView
  }
]
