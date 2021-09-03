<template>
  <div class="main__top">
      <div class="logo">
          <router-link :to="{path: '/'}">
        <i class="fas fa-film"></i>

          </router-link>
      </div>
      <div class="search__bar">
        <input class="form-control" type="text" placeholder="Поиск" />
      </div>
      <div class="socials">
        <i class="fab fa-facebook"></i>
        <i class="fab fa-vk"></i>
        <i class="fab fa-instagram"></i>
        <i class="fab fa-twitter"></i>
      </div>
      <div class="contacts">
        <p v-if="pages.length > 0">+ {{ pages[0].phone1 }}</p>
        <p v-if="pages.length > 0">+ {{ pages[0].phone2 }}</p>
      </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
computed: {
    ...mapGetters(['pages'])
}
}
</script>

<style scoped>

.main__top {
  background: #ffffff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  float: right;
  padding: 10px 10px 0 0;
  position: relative;
}
.socials {
  width: 300px;
  display: flex;
  justify-content: space-around;
}
.socials i {
  font-size: 40px;
  cursor: pointer;
  color: black;
}
.socials i:hover {
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 4px rgb(0, 0, 0);
}
.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.contacts p {
  font-weight: 700;
  padding: 0;
  margin: 0;
}
.logo {
  position: absolute;
  left: 20px;
  top: 20px;
}
.logo a {
  text-decoration: none;
  color: black;
}
.logo a i {
  font-size: 60px;
  text-shadow: 2px 3px 8px rgb(0 0 0);
  transition: all ease-out .5s;
}
.logo a i:hover {
    transition: all ease-out .5s;
  text-shadow: 5px 7px 8px rgb(0 0 0);
}
</style>