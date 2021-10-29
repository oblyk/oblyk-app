const HomeView = () => import(/* webpackChunkName: "GeneralRouter-HomeView" */ '@/views/HomeView')
const TermsOfUseView = () => import(/* webpackChunkName: "GeneralRouter-TermsOfUseView" */ '@/views/TermsOfUseView')
const AboutView = () => import(/* webpackChunkName: "GeneralRouter-AboutView" */ '@/views/AboutView')
const HelpsView = () => import(/* webpackChunkName: "GeneralRouter-HelpsView" */ '@/views/HelpsView')
const SupportUsView = () => import(/* webpackChunkName: "GeneralRouter-SupportUsView" */ '@/views/SupportUsView')
const ContactView = () => import(/* webpackChunkName: "GeneralRouter-ContactView" */ '@/views/ContactView')
const ReportProblemView = () => import(/* webpackChunkName: "GeneralRouter-ReportProblemView" */ '@/views/ReportProblemView')
const OblykView = () => import(/* webpackChunkName: "GeneralRouter-OblykView" */ '@/views/OblykView')
const GradeView = () => import(/* webpackChunkName: "GeneralRouter-GradeView" */ '@/views/GradeView')
const AboutPartnerView = () => import(/* webpackChunkName: "GeneralRouter-AboutPartnerView" */ '@/views/AboutPartnerView')
const GoFlyAKiteView = () => import(/* webpackChunkName: "GeneralRouter-GoFlyAKiteView" */ '@/views/GoFlyAKiteView')
const SuccessAccountDeletingView = () => import(/* webpackChunkName: "GeneralRouter-SuccessAccountDeletingView" */ '@/views/SuccessAccountDeletingView')

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
