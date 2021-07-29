<template>
  <header
    class="main-header navbar navbar-static-top navbar-expand navbar-dark"
  >
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Navbar Search -->
      <i class="fas fa-user user"></i>
      <p>Administrator</p>
      <li class="nav-item">
        <a
          @click="onSignOut"
          class="nav-link"
          data-widget="navbar-search"
          href="#"
          role="button"
        >
          <i class="fas fa-power-off"></i>
        </a>
      </li>
    </ul>
  </header>
</template>

<script>
// import {mapGetters} from 'vuex'
export default {
  name: "NavBar",
  // computed: mapGetters(['loading']),
  methods: {
    onSignOut() {
      this.$store.dispatch("signOut")
    }
  }
};
</script>

<style scoped>
.user {
  font-size: 28px;
  color: rgba(255, 255, 255, 0.75);
  margin-right: 20px;
}
p {
  display: inline-block;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.75);
}
.navbar-nav {
  align-items: center;
}
</style>