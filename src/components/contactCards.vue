<template>
	<div class="cards">
		<div class="card cards__big">
			<h2 v-html="contacts.safe_city.title"></h2>
			<div class="cards__data">
				<div class="cards__data-item" v-for="(card, index) in contacts.safe_city" :key="index" v-if="card.content">
					<h4 v-html="card.title"></h4>
					<span v-html="card.content"></span>
				</div>
			</div>
		</div>
		<div class="card cards__small">
			<h2 v-html="contacts.monitoring.title"></h2>
			<div class="cards__data">
				<div class="cards__data-item" v-for="(card, index) in contacts.monitoring" :key="index" v-if="card.content">
					<h4 v-html="card.title"></h4>
					<span v-html="card.content"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'cards',
	props: {
		contacts: null
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.card {
	width: 100%;
	background: #FFFFFF;
	box-shadow: 0px 1px 20px rgba(51, 51, 51, 0.09);
	border-radius: 3px;

	&:nth-child(odd) {
		.cards__data-item:nth-child(1) > h4::before {
			content: url('../assets/map-marked-alt.svg');
		}

		.cards__data-item:nth-child(2) > h4::before {
			content: url('../assets/envelope.svg');
		}

		.cards__data-item:nth-child(3) > h4::before {
			content: url('../assets/clock.svg');
		}

		.cards__data-item:nth-child(4) > h4::before {
			content: url('../assets/phone.svg');
		}
	}

	&:nth-child(even) {
		margin-left: 20px;
		max-width: 515px;

		.cards__data-item:nth-child(1) > h4::before {
			content: url('../assets/map-marked-alt.svg');
		}

		.cards__data-item:nth-child(2) > h4::before {
			content: url('../assets/phone.svg');
		}

		.cards__data-item:nth-child(3) > h4::before {
			content: url('../assets/clock.svg');
		}

		.cards__data-item:nth-child(4) > h4::before {
			content: url('../assets/user-tie.svg');
		}
	}

	> h2 {
		padding: 22px 40px;
		margin: 0;
		border-bottom: 2px solid #F7F7FA;
	}
}

.cards {
	width: 100%;
	display: flex;
	justify-content: space-between;

	&__data {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 25px 40px 33px;

		&-item {
			width: calc(62% - 44px);
			padding-left: 24px;

			&:nth-child(odd) {
				padding-right: 20px;
			}

			&:nth-child(even) {
				width: calc(38% - 24px);
			}

			&:not(:nth-of-type(-n+2)) {
				margin-top: 25px;
			}

			> h4 {
				position: relative;
				margin: 0 0 5px;

				&::before {
					position: absolute;
					display: block;
					top: 0;
					left: -23px;
					width: 23px;
					height: 23px;
					// background: #333333;
				}
			}

			> p {
				line-height: 160%;
			}
		}
	}
}
</style>
