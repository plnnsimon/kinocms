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
          @click="signOut"
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
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "NavBar",
  props: ["isLoggedIn"],
  // created() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     // this.isLoggedIn = !!user
  //     if (user) {
  //       this.isLoggedIn = true
  //       this.$router.replace({name: "Stats"})
  //     } else {
  //       this.isLoggedIn = false
  //       // this.$router.replace({name: "Login"})
  //     }
  //   })
  // },
  methods: {
    async signOut() {
        try{
          const data = await firebase.auth().signOut()
          console.log(data);
          let isLogged = !this.isLoggedIn
          this.$emit('signetOut', isLogged)
          this.$router.replace({name: "Login"})
          console.log("signet out");
        } catch(err) {
          console.log(err);
        }
      
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