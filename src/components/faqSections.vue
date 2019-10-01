<template>
	<div class="sections">
		<div class="section" v-for="(category, index) in categories" :key="index" :id="'category_'+category.id">
      <div class="section__title">
        <h2>
          {{ category.name }}
        </h2>
      </div>
      <div class="section__items">
        <div class="section__qa" v-for="(item, index) in category.items" :key="index" :id="'qa_'+item.id">
          <div class="section__q" v-on:click="accordion">
            <h4>
              {{ item.question }}
            </h4>
          </div>
          <div class="section__a">
            <p>
              {{ item.answer }}
            </p>
          </div>
        </div>
      </div>
		</div>
	</div>
</template>

<script>

export default {
  name: 'faqSection',
  props: {
    categories: null
  },
  methods: {
    accordion: function (event) {
      var matches = document.querySelectorAll('.section__qa');
      for(var i = 0; i < matches.length; i++) {
          matches[i].classList.remove('active');
      }

      event.target.parentNode.parentNode.classList.toggle('active');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$white: #ffffff;

.sections {
  & .section {
    & .section__items {
      & .section__qa {
        background: $white;
        border-radius: 3px;
        padding: 15px 25px;
        box-shadow: 0px 1px 12px rgba(51, 51, 51, 0.08);
        cursor: pointer;

        &:not(last-child) {
          margin-bottom: 15px;
        }
      }
    }

    &__q {
      > h4 {
        margin: 0;
      }
    }

    &__a {
      display: none;
      > p {
        margin: 11px 0 0;
      }
    }
  }
}

.section__q.active + .section__a {
  display: block;
}
</style>
