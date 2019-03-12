// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import lodash from 'lodash'
import VTooltip from 'v-tooltip'
import fr from 'vee-validate/dist/locale/fr'
import VeeValidate, { Validator } from 'vee-validate'
import CardInfo from '@/components/cards/CardInfo'
import CardTitle from '@/components/cards/CardTitle'
import CardColor from '@/components/cards/CardColor'
import CardSocial from '@/components/cards/CardSocial'
import CardShare from '@/components/cards/CardShare'
import ModalValidation from '@/components/modals/ModalValidation'
import Statut from '@/components/statut/Statut'
import Notification from '@/components/notification/Notification'
import {slugify} from './services/utils'

import '@/css/six-plus.css'
import '@/css/styles.css'

Object.defineProperty(Vue.prototype, '$lodash', { value: lodash })

const tooltipOption = {
  defaultDelay: 0,
  defaultOffset: 10,
  defaultContainer: 'body'
}
Vue.use(VTooltip, tooltipOption)

Validator.localize('fr', fr)
const veeValidateConfig = {
  local: 'fr',
  inject: false
}
Vue.use(VeeValidate, veeValidateConfig)

Vue.component('card-info', CardInfo)
Vue.component('card-title', CardTitle)
Vue.component('card-color', CardColor)
Vue.component('card-social', CardSocial)
Vue.component('card-share', CardShare)
Vue.component('modal-validation', ModalValidation)
Vue.component('statut-tag', Statut)
Vue.component('notification', Notification)

Vue.filter('capitalize', value => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('slugify', value => {
  if (!value) return ''
  return slugify(value)
})

Vue.filter('statut', value => {
  if (value === 'created') return 'Crée'
  else if (value === 'saved') return 'Enregistré'
  else if (value === 'published') return 'Publié'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
