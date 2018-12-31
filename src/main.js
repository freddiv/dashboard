import '../node_modules/ag-grid-community/dist/styles/ag-grid.css'
import '../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css'
import '../node_modules/material-design-icons/iconfont/material-icons.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'
import Notify from 'mdbvue/src/components/pro/Notify'
import Vue from 'vue'
import vuenotify from './helpers/pnotify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Notify)
Vue.config.productionTip = false

new Vue({
	router,
	store,
	vuenotify,
	render: h => h(App),
}).$mount('#app')