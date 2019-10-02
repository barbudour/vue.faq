<template>
	<div class="faq">
		<div class="faq__container">
			<h1>Вопросы-Ответы</h1>
		</div>
		<div class="faq__container">
			<div class="faq__qa">
				<faqSections v-if="dataReady" :categories="info.data.categories"/>
			</div>
			<div class="faq__menu">
				<faqMenu v-if="dataReady" :categories="info.data.categories"/>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import faqSections from './faqSections.vue'
import faqMenu from './faqMenu.vue'

export default {
	name: 'faq',
	components: {
		faqSections,
		faqMenu
	},
	data() {
		return {
			info: null,
			dataReady: false
		};
	},
	mounted() {
		axios
			.get('https://gist.githubusercontent.com/barbudour/c17017f956dabf50fdbe6df6a7ad1f62/raw/3fedb87872401f9faa1e381c98975dd5548264e5/faq.json')
			.then(response => {
				this.info = response; 
				this.dataReady = true;
			});
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.faq {
	&__container {
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-width: 1200px;
		margin: auto;
	}
	&__qa {
		width: 100%;
	}
	&__menu {
		width: 100%;
		max-width: 387px;
		margin-left: 20px;
	}
}
</style>
