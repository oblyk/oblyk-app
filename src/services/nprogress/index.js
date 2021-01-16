import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false
})

store.watch(
  (state) => state.loader.loading,
  (newVal, oldVal) => {
    if (newVal === 0) return NProgress.done()
    if (oldVal === 0) return NProgress.start()
    NProgress.set(1.8 / Math.max(oldVal, newVal))
  }
)
