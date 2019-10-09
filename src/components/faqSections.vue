<template>
	<div class="sections">
		<div class="section" v-for="(category, index) in categories" v-bind:key="index" v-bind:id="'category_'+category.id" v-show="category.items.length">
      <div class="section__title">
        <h2>
          {{ category.name }}
        </h2>
      </div>
      <div class="section__items">
        <div class="section__qa" @click="accordion" v-for="(item, index) in category.items" :key="index" :id="'qa_'+item.id">
          <div class="section__q">
            <h4>
              {{ item.question }}
            </h4>
            <div class="section__qa-arrow">
              <img src="../assets/img/chevron-down.svg" alt="">
            </div>
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
    categories: {}
  },
  methods: {
    accordion: function (event) {
      
      var active = event.target.classList.contains('active');
      if (active) {
        event.target.classList.remove('active');
        event.target.childNodes.item(1).style.height = '0px';
      } else {
        var matches = document.querySelectorAll('.section__qa');
        for(var i = 0; i < matches.length; i++) {
          matches[i].classList.remove('active');
          matches[i].childNodes.item(1).style.height = '0px';
        }
        event.target.classList.toggle('active');
        event.target.childNodes.item(1).style.height = event.target.childNodes.item(1).scrollHeight + 'px';
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$white: #ffffff;

.sections {
  & .section {
    margin-bottom: 35px;
    
    & .section__items {
      & .section__qa {
        background: $white;
        border-radius: 3px;
        padding: 15px 25px;
        box-shadow: 0px 1px 12px rgba(51, 51, 51, 0.08);
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:not(:last-child) {
          margin-bottom: 15px;
        }
      }
    }

    &__title {
      margin-bottom: 15px;
      > h2 {
        margin: 0;
      }
    }

    &__qa {
      position: relative;
      &-arrow {
        position: absolute;
        top: 16px;
        right: 25px;

        > img {
          transform: rotate(-180deg);
          transition: all 0.3s ease;
          transform-origin: 50% 50%;
        }
      }

      &.active {
        .section__a {
          opacity: 1;
        }

        .section__qa-arrow {
          > img {
            transform: rotate(0deg);
          }
        }
      }
    }

    &__q {
      pointer-events: none;
      > h4 {
        margin: 0;
      }
    }

    &__a {
      pointer-events: none;
      transition: all 0.3s ease-in-out;
      height: 0;
      opacity: 0;
      overflow: hidden;
      > p {
        margin: 11px 0 0;
      }
    }
  }
}
</style>
