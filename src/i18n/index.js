// import Vue from 'vue'
// import VueI18n from 'vue-i18n'

// Vue.use(VueI18n)

// function loadLocaleMessages () {
//   const locales = require.context('.', true, /[A-Za-z0-9-_,\s]+\.json$/i)
//   const messages = {}
//   locales.keys().forEach(key => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key)
//     }
//   })
//   return messages
// }

// export default new VueI18n({
//   locale: process.env.VUE_APP_I18N_LOCALE || 'en',
//   fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
//   messages: loadLocaleMessages()
// })

/*=========================================================================================
  File Name: i18n.js
  Description: i18n configuration file. Imports i18n data.
==========================================================================================*/


import Vue from 'vue'
import VueI18n from 'vue-i18n'
import envs from '@/envs'
// import i18nData from './i18nData'

Vue.use(VueI18n)

let messages = {}
// messages['en'] = require('./' + 'en').default
// messages['ko'] = require('./' + 'ko').default
envs.framework.supportLocales.forEach(targetLocale => {
  messages[targetLocale.id] = require('./' + targetLocale.id).default
})

const i18n = new VueI18n({
  locale: 'ko', // set default locale
  messages,
  silentTranslationWarn: true
})

export default i18n