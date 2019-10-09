<template>
	<div class="contact">
		<div class="container contact__container">
			<h1>Контакты</h1>
		</div>
		<div class="container contact__container">
			<contactCards v-if="dataReady" :contacts="info.data"/>
		</div>
		<div class="section section--white">
			<div class="container contact__container">
				<h1>Уполномоченные лица</h1>
			</div>
			<div class="container contact__container">
				<table-component
					v-if="dataReady"
					@changePage="getCameraData($event.limit, $event.offset, $event.sort)"
					:showCheckbox="false"
					:showSearch="false"
					:tableData="info.data.table.items"
					:columns="info.data.table.columns"
					:paginatorInputData="tablePaginator"/>

			</div>
			<div class="container contact__container">
				<a href="#" class="singup">Как стать уполномоченным лицом?</a>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import contactCards from '@/components/contactCards';
import table from '@/components/common/table';

export default {
	name: 'contact',
	components: {
		contactCards,
		'table-component': table
	},
	data() {
		return {
			info: null,
			dataReady: false,
			tableDataFormated: [{id: 1, name: 'test', cam_type: 'type', district: 'district'}],
			columnsReesterTable: [
				{name: '№', code: '-id'},
				{name: 'Наименование', code: '-name'},
				{name: 'Тип', code: '-camera_type__name'},
				{name: 'Адрес', code: '-address__full_address'},
				{name: 'Район', code: '-address__district'}
			],
			tablePaginator: {
				count: 2,
				next: 'url',
				previous: 'url_2'
			}
		};
	},
	mounted() {
		axios
			.get('https://gist.githubusercontent.com/barbudour/5b173906328caf0e9c305e051f3ac711/raw/3819e9f0591b3580550549a8940ac5661c09b676/contact.json')
			.then(response => {
				this.info = response; 
				this.dataReady = true;
			});
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.paginator {
	display: none!important;
}

.singup {
	font-size: 18px;
	line-height: 150%;
	color: #DA5554;
	margin: 30px auto 0;
}
</style>
