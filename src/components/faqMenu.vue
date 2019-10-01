<template>
	<div class="menu">
		<div class="menu__title">
			<h3>Категории</h3>
		</div>
		<div class="menu__content">
			<ul class="menu__links">
				<li class="menu__link" v-for="(category, index) in categories" :key="index">
					<a :href="'#category_'+category.id">
						{{ category.name }}
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
  name: 'faqMenu',
  props: {
    categories: null
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$white: #ffffff;
$light-gray: #EFEFF4;
$dark-blue: #465069;

.menu {
	background: $white;
	border-radius: 3px;
	box-shadow: 0px 1px 12px rgba(51, 51, 51, 0.08);

	&__title {
		padding: 17px 40px 12px;
		border-bottom: 1px solid $light-gray;

		> h3 {
			margin: 0;
		}
	}

	&__content {
		padding: 22px 40px 28px;
	}

	&__links {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	&__link {
		font-size: 17px;
		line-height: 20px;
		text-decoration: underline;
		color: $dark-blue;

		&:not(last-child) {
			margin-bottom: 13px;
		}
	}
}
</style>
