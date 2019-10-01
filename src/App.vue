<template>
  <div id="app">
    <faq/>
  </div>
</template>

<script>
import faq from './components/faq.vue'

export default {
  name: 'app',
  components: {
    faq
  }
}
</script>

<style lang="scss">
$bg-main: #F7F7FA;
$dark-blue: #465069;

#app {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  background: $bg-main;
}

h1 {
	font-size: 48px;
	line-height: 110%;
	color: $dark-blue;
}

h2 {
	font-size: 30px;
	line-height: 110%;
	color: $dark-blue;
}

h4 {
	font-size: 16px;
  line-height: 19px;
	color: $dark-blue;
}

p {
  font-size: 14px;
  line-height: 150%;
	color: $dark-blue;
}
</style>