import Vue from 'vue'
import PNotify from '../../node_modules/pnotify/dist/es/PNotify.js'
import PNotifyButtons from '../../node_modules/pnotify/dist/es/PNotifyButtons.js'
import PNotifyStyleMaterial from '../../node_modules/pnotify/dist/es/PNotifyStyleMaterial.js'
PNotify.defaults.styling = 'material'
PNotify.defaults.icons = 'material'

const VueNotify = {
	install() {
		Vue.pnotify = PNotify
		Vue.prototype.$pnotify = PNotify
	}
}

Vue.use(VueNotify)
export default VueNotify