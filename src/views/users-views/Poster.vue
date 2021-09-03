<template>
  <div class="poster">
    <Movies :data="false" />
  </div>
</template>

<script>
import Movies from '../../components/users-main-page/movies/Movies.vue';
export default {
  components: {  Movies },
};
</script>

<style scoped>
.poster {
  background: white;
  padding: 100px 0 180px 250px;
}
</style>