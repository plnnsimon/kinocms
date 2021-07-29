<template>
  <div class="movie">
      <div class="picture" >
          <img :src="require('../../assets/films/' +  movie.img)" alt="movie">
      </div>
      <div class="title">
          {{ movie.title }}
      </div>
  </div>
</template>

<script>
export default {
    name: "Movie",
    props: ['movie', 'index']
}
</script>

<style scoped>
.movie {
    max-width: 250px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.picture {
    cursor: pointer;
}
.picture img {
    max-width: 100%;
}
.title {
    margin: 10px auto;
}
</style>