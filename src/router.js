import Vue from 'vue'
import Router from 'vue-router'
import contact from './components/contact.vue'
import faq from './components/faq.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'contact',
			component: contact
		},
		{
			path: '/faq',
			name: 'faq',
			component: faq
		}
	]
})