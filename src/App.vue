<template>
  <div>
    <NavBar v-if="isLoggedIn" />
    <SideBar v-if="isLoggedIn" />
    <router-view class="content-wrapper" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  components: {
    NavBar,
    SideBar,
  },
  mounted() {
    this.setupFirebase();
  },
  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          console.log("signed in");
          this.isLoggedIn = true;
        } else {
          // No user is signed in.
          this.isLoggedIn = false;
          console.log("signed out", this.isLoggedIn);
          this.$router.replace({name: "Login"})
        }
      });
    },
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
};
</script>

<style scoped>
.content {
  padding: 10px;
}
</style>