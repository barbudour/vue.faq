<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="scss">
$bg-main: #F7F7FA;
$dark-blue: #465069;

body {
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

.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: auto;
}

.section {
  margin: 40px 0;
  padding: 40px 0;

  &--white {
    background: #ffffff;
  }

  h1:first-child {
    margin-top: 0;
    margin-bottom: 25px;
  }
}
</style>